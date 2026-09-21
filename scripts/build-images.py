"""
Build every image asset the Gogo site ships, from the two things the client
supplied: a logo mockup photographed on a wall, and eleven phone photos of the
cars taken outside the office.

Run from the project root.
"""
import os
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

SRC = 'source-images'
OUT = 'public/images'
os.makedirs(f'{OUT}/fleet', exist_ok=True)
os.makedirs(f'{OUT}/brand', exist_ok=True)

# ---------------------------------------------------------------- brand ----
# Sampled off the wordmark: #8ba937. The dark theme needs it a stop brighter,
# because the logo green sits at only ~4.2:1 on the ink floor.
LIME_DARK_BG = (163, 201, 63)   # #a3c93f - on ink
LIME_LIGHT_BG = (139, 169, 55)  # #8ba937 - the logo green, on white
INK = (8, 10, 6)


# The green wordmark, measured off the source. Everything inside this box is
# exempt from hole-filling: the speed-line slashes cut clean through the GO GO
# letterforms, and they are the one piece of the mark with any motion in it.
GREEN_BOX = (390, 640, 995, 765)  # x0, y0, x1, y1


def extract_logo():
    """
    Key the wall out of the mockup and return (rgb, lum, green, alpha).

    The mockup is glossy black acrylic lettering on a pale tiled wall, lit from
    the front, so it carries three things that must not survive the key: the
    tile seams, the soft cast shadow under each letter, and the ceiling
    reflected in the face of the car silhouette.

    Luminance separates the first two. The wall and its seams sit above 200 and
    the cast shadows between 170 and 200, so a cut at 165 drops both.

    The reflection is the hard one: it is *brighter* than the cut, so it keys
    out as a hole in the middle of a shape that is solid in reality. Filling
    every region of background not reachable from the image border recovers it,
    which is why the cut is binary here rather than a ramp - a ramp would leave
    the reflection semi-transparent and there would be nothing to fill.
    """
    from scipy import ndimage

    im = Image.open(f'{SRC}/logo.jpg').convert('RGB')
    a = np.asarray(im).astype(np.float32)
    lum = a.max(2)

    green = (a[:, :, 1] > a[:, :, 0] + 18) & (a[:, :, 1] > a[:, :, 2] + 30)
    mask = (lum < 165) | green

    x0, y0, x1, y1 = GREEN_BOX
    wordmark = mask[y0:y1, x0:x1].copy()
    mask = ndimage.binary_fill_holes(mask)
    mask[y0:y1, x0:x1] = wordmark  # put the speed lines back

    # Tile seams and the vignette in the corners survive as scattered crumbs.
    # Nothing in this mark is small, so dropping every component under 400px
    # costs no real artwork.
    labels, n = ndimage.label(mask)
    if n:
        keep = np.zeros(n + 1, bool)
        sizes = ndimage.sum_labels(mask, labels, range(1, n + 1))
        keep[1:] = sizes >= 400
        mask = keep[labels]

    # One pixel of blur is the anti-aliasing; without it the diagonals stair-step.
    alpha = np.asarray(
        Image.fromarray((mask * 255).astype(np.uint8))
        .filter(ImageFilter.GaussianBlur(0.8))
    ).astype(np.float32) / 255.0

    return a, lum, green, alpha


def recolour(a, lum, green, alpha, ink_lo, ink_hi, lime):
    """
    Repaint the keyed artwork for one background.

    `darkness` keeps a trace of the acrylic's sheen so the letterforms are not
    a dead flat slab, but the range between ink_lo and ink_hi is deliberately
    narrow. Widen it and the ceiling reflected in the car's face stops reading
    as a highlight and starts reading as a photograph pasted inside the shape.
    """
    darkness = np.clip((165.0 - lum) / 120.0, 0.0, 1.0)[..., None]
    out = np.array(ink_lo, np.float32) + \
        (np.array(ink_hi, np.float32) - np.array(ink_lo, np.float32)) * darkness
    out[green] = lime
    # Colour is undefined where the fill pass invented coverage, so carry the
    # solid tone there rather than whatever the wall happened to be.
    invented = (alpha > 0.5) & (lum >= 165) & ~green
    out[invented] = ink_hi
    return np.concatenate([out, (alpha * 255)[..., None]], 2).astype(np.uint8)


def crop_alpha(img, pad=6, thresh=40):
    """Tight crop on real coverage - getbbox() alone trips on stray soft pixels."""
    al = np.asarray(img.split()[3])
    ys, xs = np.nonzero(al > thresh)
    x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    return img.crop((max(0, x0 - pad), max(0, y0 - pad),
                     min(img.width, x1 + pad), min(img.height, y1 + pad)))


def build_brand():
    a, lum, green, alpha = extract_logo()

    # On the ink floor: near-white lettering, brightened green.
    on_dark = Image.fromarray(
        recolour(a, lum, green, alpha, (244, 247, 238), (244, 247, 238), LIME_DARK_BG),
        'RGBA')
    # On white: graphite lettering, the literal logo green.
    on_light = Image.fromarray(
        recolour(a, lum, green, alpha, (44, 50, 38), (12, 15, 8), LIME_LIGHT_BG),
        'RGBA')

    for name, img in (('lockup-dark', on_dark), ('lockup-light', on_light)):
        c = crop_alpha(img)
        c.thumbnail((1400, 1400), Image.LANCZOS)
        c.save(f'{OUT}/brand/{name}.webp', 'WEBP', quality=92, method=6)
        print(f'  brand/{name}.webp {c.size}')

    # --- favicon -----------------------------------------------------------
    # The car silhouette alone, in lime on ink. The wordmark is far too wide to
    # survive a 32px square, but the silhouette still reads as a car at that
    # size, and the colour carries the brand on its own.
    car = on_dark.crop((94, 337, 1293, 620))
    ca = np.asarray(car).astype(np.float32)
    ca[..., :3] = LIME_DARK_BG                      # flatten sheen to flat lime
    car = Image.fromarray(ca.astype(np.uint8), 'RGBA')
    car = crop_alpha(car, pad=0)

    for size in (512, 180, 32):
        icon = Image.new('RGBA', (size, size), INK + (255,))
        w = int(size * 0.82)
        h = max(1, round(w * car.height / car.width))
        icon.alpha_composite(car.resize((w, h), Image.LANCZOS),
                             ((size - w) // 2, (size - h) // 2))
        if size == 512:
            icon.convert('RGB').save(f'{OUT}/../favicon-512.png')
        elif size == 180:
            icon.convert('RGB').save(f'{OUT}/../apple-touch-icon.png')
        else:
            icon.convert('RGB').save(f'{OUT}/../favicon-32.png')
    Image.open(f'{OUT}/../favicon-512.png').resize((48, 48), Image.LANCZOS)\
        .save(f'{OUT}/../favicon.ico', sizes=[(48, 48), (32, 32), (16, 16)])
    print('  favicons')
    return on_dark


# ---------------------------------------------------------------- fleet ----
# (file stem, vertical bias) - 0.0 keeps the top of the frame, 1.0 the bottom.
# Every source is 4:3 from a phone held at eye level, so the top third is shop
# signage and sky. Biasing down puts the car on the horizontal third instead of
# stranding it at the bottom edge.
FLEET = [
    ('skoda-octavia-mk4-limousine-siva', 0.62),
    ('skoda-octavia-mk3-facelift-combi-bijela', 0.60),
    ('toyota-proace-verso-kombi-bijeli', 0.55),
    ('volkswagen-golf-8-gti-crni', 0.60),
    ('skoda-rapid-spaceback-crni', 0.60),
    ('opel-frontera-suv-bijeli-crni-krov', 0.58),
    ('opel-vivaro-zafira-life-kombi-sivi', 0.55),
    ('skoda-rapid-spaceback-crveni', 0.60),
    ('opel-corsa-e-plava', 0.60),
    ('seat-leon-mk3-st-karavan-bijeli', 0.58),
    ('skoda-kamiq-suv-tamnosiva', 0.56),
]

RATIO = 1.6  # 16:10, one frame for every card so rows cannot go ragged


def build_fleet():
    for stem, bias in FLEET:
        im = Image.open(f'{SRC}/{stem}.jpg').convert('RGB')
        w, h = im.size
        if w / h > RATIO:
            nw, nh = round(h * RATIO), h
        else:
            nw, nh = w, round(w / RATIO)
        x = (w - nw) // 2
        y = round((h - nh) * bias)
        im = im.crop((x, y, x + nw, y + nh))

        for width, suffix in ((1440, ''), (720, '-sm')):
            r = im.resize((width, round(width / RATIO)), Image.LANCZOS)
            r.save(f'{OUT}/fleet/{stem}{suffix}.webp', 'WEBP',
                   quality=80, method=6)
        kb = os.path.getsize(f'{OUT}/fleet/{stem}.webp') // 1024
        print(f'  fleet/{stem}.webp {kb}KB')


# ------------------------------------------------------------------ hero ----
def build_hero():
    """
    Hero backdrop, wide and portrait.

    The source is the AI-generated frame in source-images/hero-ai.png: the
    Kamiq on the road above the Una, shot into a low sun, cliffs right, valley
    left. It is used as-is rather than upscaled - at 1919px the wide crop is
    already past the point where a hero backdrop behind a scrim shows softness,
    and upscaling would only cost bytes.

    The portrait crop is 4:5 rather than 3:4. The source is 2.34:1, so anything
    taller than 4:5 has to be cut so narrow that the valley disappears and the
    frame stops being the photograph that earned its place.
    """
    os.makedirs(f'{OUT}/hero', exist_ok=True)
    src = Image.open(f'{SRC}/hero-ai.png').convert('RGB')
    w, h = src.size

    # Wide: the full frame, plus a half-width step for phones in landscape.
    for out_w, name in ((1920, 'hero'), (1280, 'hero-sm')):
        src.resize((out_w, round(out_w * h / w)), Image.LANCZOS)\
           .save(f'{OUT}/hero/{name}.webp', 'WEBP', quality=80, method=6)
        print(f'  hero/{name}.webp')

    # Portrait: centred on the car, which sits just right of centre.
    pw = round(h * 0.8)
    x = round((w - pw) * 0.72)
    src.crop((x, 0, x + pw, h)).resize((820, 1025), Image.LANCZOS)\
       .save(f'{OUT}/hero/hero-portrait.webp', 'WEBP', quality=80, method=6)
    print('  hero/hero-portrait.webp')


# ------------------------------------------------------------------- og ----
FONTS = os.environ.get('GOGO_FONTS', '.')


def build_og(lockup):
    """
    1200x630 share card.

    Split rather than overlaid: the lockup is white-on-transparent, so laying
    it over a bright photograph buries it exactly where the thumbnail is
    smallest. An ink panel on the left gives the mark a ground of its own and
    leaves room for the two things worth carrying into a feed - the offer and
    the phone number.
    """
    from PIL import ImageFont

    W, H = 1200, 630
    PANEL = 660  # where the ink panel ends and the photograph takes over

    card = Image.new('RGBA', (W, H), INK + (255,))

    photo = Image.open(f'{SRC}/hero-ai.png').convert('RGB')
    band = W - PANEL + 260
    ph = round(H * photo.width / photo.height)
    photo = photo.resize((ph, H), Image.LANCZOS)
    # Keep the car, which sits right of centre in the source.
    photo = photo.crop((round((ph - band) * 0.78), 0,
                        round((ph - band) * 0.78) + band, H))
    card.alpha_composite(photo.convert('RGBA'), (PANEL - 260, 0))

    # Feather the photograph into the panel instead of butting it against a
    # hard edge, which at thumbnail size looks like a rendering fault.
    fade = Image.new('RGBA', (320, H))
    fd = ImageDraw.Draw(fade)
    for x in range(320):
        fd.line([(x, 0), (x, H)], fill=INK + (int(255 * (1 - x / 320) ** 0.75),))
    card.alpha_composite(fade, (PANEL - 260, 0))

    lw = 372
    lg = lockup.resize((lw, round(lw * lockup.height / lockup.width)), Image.LANCZOS)
    card.alpha_composite(lg, (72, 74))

    d = ImageDraw.Draw(card)
    X, SAFE = 78, PANEL - 78 - 24  # the panel, less both margins

    def fit(text, path, start):
        """Largest size at which the line still clears the ink panel."""
        for size in range(start, 20, -2):
            f = ImageFont.truetype(path, size)
            if d.textlength(text, font=f) <= SAFE:
                return f
        return ImageFont.truetype(path, 20)

    # The lockup already reads RENT A CAR, so the headline spends its width on
    # the differentiator instead of repeating the category.
    l1 = 'Iznajmi auto u Bihaću'
    l2 = 'bez kreditne kartice'
    l3 = '061 798 203  ·  dostava na adresu'
    d.text((X, 300), l1, font=fit(l1, f'{FONTS}/outfit-600.ttf', 54),
           fill=(250, 252, 246))
    d.text((X, 372), l2, font=fit(l2, f'{FONTS}/outfit-600.ttf', 54),
           fill=LIME_DARK_BG)
    d.text((X, 476), l3, font=fit(l3, f'{FONTS}/instrument-500.ttf', 29),
           fill=(184, 192, 174))

    card.alpha_composite(Image.new('RGBA', (W, 9), LIME_DARK_BG + (255,)), (0, H - 9))
    card.convert('RGB').save(f'{OUT}/og-image.jpg', quality=88, optimize=True)
    print('  og-image.jpg')


if __name__ == '__main__':
    print('hero:')
    build_hero()
    print('brand:')
    lockup = build_brand()
    print('fleet:')
    build_fleet()
    print('og:')
    build_og(lockup)

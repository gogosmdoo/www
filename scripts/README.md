# scripts/

## build-images.py

Rebuilds every image asset in `public/` from the two things the client
supplied: `public/images/logo.jpg` (the logo photographed on an office wall)
and the eleven vehicle photographs beside it.

```bash
python -m venv .venv && .venv/bin/pip install numpy pillow scipy "fonttools[woff]"
GOGO_FONTS=scripts .venv/bin/python scripts/build-images.py
```

It produces:

| Output | What it is |
| --- | --- |
| `public/images/brand/lockup-dark.webp` | the mark keyed off the wall, redrawn near-white for the ink page |
| `public/images/brand/lockup-light.webp` | the same artwork in its original graphite, for light surfaces |
| `public/favicon*.png`, `favicon.ico`, `apple-touch-icon.png` | the car silhouette in lime on ink |
| `public/images/fleet/*.webp` | all eleven cars, cropped to one 16:10 frame, at 1440w and 720w |
| `public/images/hero/hero{,-portrait}.webp` | hero backdrop, wide and portrait |
| `public/images/og-image.jpg` | 1200x630 share card |

The two `.ttf` files beside this README are Outfit and Instrument Sans
instantiated at a single weight, used only to set the text in the share card.
They are build-time inputs and are never served.

### Replacing the hero

`build_hero()` currently crops the Octavia photograph. To drop in real hero
photography, write the two files directly and skip the function:

- `public/images/hero/hero.webp` — 2400x1100, subject right, copy space left
- `public/images/hero/hero-portrait.webp` — 900x1200, subject low, copy space top

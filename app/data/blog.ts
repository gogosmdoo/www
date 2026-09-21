/*
 * Two SEO guides, Bosnian only.
 *
 * Bosnian only is deliberate: these target local-intent queries ("dokumenti za
 * najam auta", "iz Bihaća na Plitvice") where the searcher is overwhelmingly
 * typing Bosnian. Translating them would split link equity across
 * near-duplicate pages for no gain. The rest of the site stays in four
 * languages.
 *
 * `keywords` records the query cluster each post targets so the intent stays
 * auditable later.
 *
 * Claims policy, and it matters more here than anywhere else on the site,
 * because a guide is read as advice rather than as marketing:
 *
 *   - The deposit (400 KM / 200 €), the no-credit-card policy and payment at
 *     collection are the client's own statements and are safe to repeat.
 *   - The minimum age, the licence-held-for period, the mileage allowance, the
 *     fuel policy and the insurance excess are NOT known. The first guide is
 *     about documents and conditions, so the temptation to fill those in is
 *     strongest exactly here. It says instead that they are agreed per booking,
 *     which is true, and it tells the reader to ask — which is also the
 *     conversion action.
 *   - Distances are real driving routes from the office. Border formalities are
 *     described generically ("green card and written permission") because that
 *     is how taking a rented car out of BiH works generally, not because the
 *     client has confirmed their own procedure. Flagged in
 *     PITANJA-ZA-KLIJENTA.md.
 *   - Nothing states a price, because no price is known.
 */

export interface BlogPost {
  slug: string
  title: string
  /* <title> tag; kept near 60 chars so it does not truncate in results. */
  metaTitle: string
  description: string
  excerpt: string
  published: string
  updated: string
  readingMinutes: number
  image: string
  imageAlt: string
  keywords: string[]
  sections: { heading: string, paragraphs?: string[], bullets?: string[] }[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'dokumenti-i-uslovi-za-najam-auta-u-bihacu',
    title: 'Šta vam treba za najam auta u Bihaću',
    metaTitle: 'Dokumenti i uslovi za najam auta u Bihaću | Gogo',
    description:
      'Koji dokumenti su potrebni za najam vozila u Bihaću, koliki je depozit, '
      + 'zašto ne treba kreditna kartica i šta provjeriti pri preuzimanju.',
    excerpt:
      'Dokumenti, depozit, plaćanje i ono što se provjerava pri preuzimanju — '
      + 'sve što treba znati prije nego što dođete po ključeve.',
    published: '2026-09-02',
    updated: '2026-09-17',
    readingMinutes: 5,
    image: '/images/fleet/skoda-octavia-mk4-limousine-siva.webp',
    imageAlt: 'Škoda Octavia ispred kancelarije Rent a Car Gogo u Bihaću',
    keywords: [
      'najam auta bihać',
      'rent a car bihać dokumenti',
      'iznajmljivanje vozila bihać uslovi',
      'depozit za rent a car',
      'rent a car bez kreditne kartice',
    ],
    sections: [
      {
        heading: 'Dokumenti koje ponesete',
        paragraphs: [
          'Lista je kratka i ista je u svakoj agenciji u zemlji. Ono što se '
          + 'razlikuje su uslovi oko njih — o tome niže.',
        ],
        bullets: [
          'Vozačka dozvola. Ako dolazite iz zemlje izvan EU, ponesite i '
          + 'međunarodnu vozačku dozvolu uz nacionalnu.',
          'Lična karta ili pasoš — isti dokument kojim ste se predstavili pri '
          + 'rezervaciji.',
          'Sredstvo plaćanja za najam i depozit: gotovina ili bankovna kartica.',
        ],
      },
      {
        heading: 'Kreditna kartica nije uslov',
        paragraphs: [
          'Ovo je najveća praktična razlika između lokalne agencije i šaltera u '
          + 'terminalu velikog aerodroma. Velike kuće traže kreditnu karticu na '
          + 'ime vozača i na njoj blokiraju iznos koji zna biti četverocifren, i '
          + 'to ostaje blokirano danima nakon što vratite auto.',
          'Kod nas se rezervacija potvrđuje pozivom ili porukom. Ne tražimo broj '
          + 'kartice unaprijed i ništa se ne naplaćuje prije preuzimanja. Najam '
          + 'plaćate kada dođete po vozilo — gotovinom ili bankovnom karticom.',
        ],
      },
      {
        heading: 'Depozit: 400 KM, i vraća se',
        paragraphs: [
          'Depozit je 400 KM, odnosno 200 €. Ostavlja se pri preuzimanju vozila '
          + 'i vraća se u cijelosti kada vozilo vratite neoštećeno i u stanju u '
          + 'kojem ste ga preuzeli.',
          'Vrijedi razumjeti šta depozit jeste, a šta nije. On nije '
          + 'predujam za najam i ne oduzima se od cijene — to su dva odvojena '
          + 'iznosa. I nije naknada: ako je auto u redu, dobijete ga nazad cijelog, '
          + 'odmah pri vraćanju, bez „obrade“.',
        ],
      },
      {
        heading: 'Pregled vozila pri preuzimanju',
        paragraphs: [
          'Ovo je pet minuta koje vrijede više nego bilo koji dio ugovora. '
          + 'Zajedno obiđemo auto i upišemo stanje prije nego što krenete.',
          'Ono što se provjerava:',
        ],
        bullets: [
          'Postojeća oštećenja na karoseriji — svaka ogrebotina ide u zapisnik.',
          'Stanje guma i rezervni točak ili set za krpljenje.',
          'Nivo goriva pri preuzimanju, da znate s čim vraćate.',
          'Da su u vozilu saobraćajna dozvola i polisa osiguranja.',
          'Slikajte auto telefonom sa sve četiri strane. Traje minutu i rješava '
          + 'svaku moguću raspravu unaprijed.',
        ],
      },
      {
        heading: 'Ako planirate izlazak iz zemlje',
        paragraphs: [
          'Bihać je trinaest kilometara od graničnog prelaza Izačić, pa je ovo '
          + 'pitanje češće nego drugdje u Bosni. Odgovor je: moguće je, ali se '
          + 'dogovara unaprijed.',
          'Za vozilo koje prelazi granicu potrebna je zelena karta i pisana '
          + 'saglasnost vlasnika vozila. To se priprema prije nego što dođete po '
          + 'auto, ne na dan preuzimanja. Recite nam odredište pri rezervaciji i '
          + 'papiri će biti u vozilu.',
        ],
      },
      {
        heading: 'Ono što se dogovara po rezervaciji',
        paragraphs: [
          'Nekoliko stavki nema jedan odgovor za sve najmove — zavise od vozila, '
          + 'termina i dužine najma. To su starosna granica vozača, staž vozačke '
          + 'dozvole, ograničenje kilometraže, politika goriva i uslovi '
          + 'osiguranja.',
          'Nemojte ih pretpostavljati ni kod nas ni bilo gdje drugdje. Pitajte '
          + 'pri upitu i dobit ćete konkretan odgovor prije nego što bilo šta '
          + 'potvrdite. Kako se ništa ne plaća unaprijed, to vas ne košta ništa '
          + 'osim jedne poruke.',
        ],
      },
    ],
  },

  {
    slug: 'iz-bihaca-na-plitvicka-jezera-autom',
    title: 'Iz Bihaća na Plitvička jezera autom',
    metaTitle: 'Iz Bihaća na Plitvička jezera autom — vodič | Gogo',
    description:
      'Plitvička jezera su 35 km od Bihaća. Koliko traje put, šta treba za '
      + 'prelazak granice, kada krenuti i koje vozilo uzeti.',
    excerpt:
      'Trideset pet kilometara, jedan granični prelaz i oko sat vremena vožnje '
      + '— zašto se Plitvice isplati gledati iz Bihaća, a ne iz Zagreba.',
    published: '2026-09-09',
    updated: '2026-09-17',
    readingMinutes: 6,
    image: '/images/fleet/skoda-kamiq-suv-tamnosiva.webp',
    imageAlt: 'Škoda Kamiq iz flote Rent a Car Gogo, Bihać',
    keywords: [
      'iz bihaća na plitvice',
      'plitvička jezera autom',
      'bihać plitvice udaljenost',
      'najam auta za plitvice',
      'prelazak granice rent a car',
    ],
    sections: [
      {
        heading: 'Koliko je zaista daleko',
        paragraphs: [
          'Od Bihaća do ulaza u nacionalni park ima oko 35 kilometara, što je '
          + 'nešto manje od sat vremena vožnje bez zadržavanja. Za poređenje, iz '
          + 'Zagreba je 140 kilometara i oko dva sata, a iz Zadra slično.',
          'To je cijeli argument za bazu u Bihaću: spavate četrdesetak minuta od '
          + 'jezera umjesto dva sata, i na ulaz stižete prije autobusa koji tek '
          + 'kreću iz Zagreba.',
        ],
      },
      {
        heading: 'Granica',
        paragraphs: [
          'Najbliži prelaz je Izačić, trinaest kilometara od grada, oko '
          + 'dvadeset pet minuta. Ljeti, i posebno vikendom, računajte na '
          + 'zadržavanje — u špici zna potrajati.',
          'Za vozilo iz najma potrebna je zelena karta i pisana saglasnost za '
          + 'izlazak vozila iz Bosne i Hercegovine. To nije komplikovano, ali se '
          + 'priprema unaprijed: javite pri rezervaciji da idete na Plitvice i '
          + 'papiri će biti u autu kada ga preuzmete.',
          'Od putnika se traži pasoš ili lična karta. Provjerite rok važenja '
          + 'prije nego krenete — to je najčešći razlog zbog kojeg se neko vraća '
          + 's granice.',
        ],
      },
      {
        heading: 'Kada krenuti',
        paragraphs: [
          'Park je najgušći između deset i tri. Autobusne ture iz Zagreba i '
          + 'Zadra stižu upravo u tom prozoru, a kako se isti dan i vraćaju, '
          + 'kasno poslijepodne jezera se osjetno isprazne.',
          'Iz Bihaća imate luksuz da birate. Polazak oko sedam znači da ste na '
          + 'ulazu prije gužve; polazak oko dva znači da šetate dok se ostali '
          + 'vraćaju. Oba su bolja od dolaska u podne.',
        ],
      },
      {
        heading: 'Ulaznice',
        paragraphs: [
          'Ulaznice se kupuju online, na službenoj stranici parka, i u sezoni se '
          + 'termini rasprodaju danima unaprijed. Ulazak je vezan za tačan sat, '
          + 'pa uskladite polazak s tim, a ne obrnuto.',
          'Cijene i raspored ulaza se mijenjaju po sezoni, pa ih provjerite '
          + 'direktno kod parka umjesto da se oslanjate na tuđi tekst — '
          + 'uključujući ovaj.',
        ],
      },
      {
        heading: 'Koje vozilo uzeti',
        paragraphs: [
          'Put je asfaltiran cijelim tokom i prohodan tokom cijele godine, pa '
          + 'nema potrebe za terenskim vozilom. Bilo koji auto iz naše ponude '
          + 'izvodi ovaj put bez problema.',
          'Ono što zaista odlučuje je koliko vas ide i šta nosite. Za dvoje je '
          + 'gradski auto sasvim dovoljan i najjeftiniji je za parkiranje kod '
          + 'ulaza. Za porodicu s prtljagom uzmite karavan, a za grupu od sedam '
          + 'ili više — kombi, jer dva auta na graničnom prelazu znače dvostruko '
          + 'čekanje.',
          'Zimi je ovo planinski teren. Vozila se izdaju pripremljena za sezonu, '
          + 'ali krenite ranije i računajte na sporiju vožnju na dionici prema '
          + 'jezerima.',
        ],
      },
      {
        heading: 'Šta usput vrijedi vidjeti',
        paragraphs: [
          'Kako se vraćate istim putem, vrijedi produžiti dan. Na bosanskoj '
          + 'strani je Nacionalni park Una — Štrbački buk je četrdesetak '
          + 'kilometara od grada i u potpuno drugom pravcu od Plitvica, pa je '
          + 'to zaseban izlet, ne usputna stanica.',
          'Ako imate samo jedan dan, izaberite jedno. Ako imate dva, uzmite auto '
          + 'na dva dana — po danu izlazi jeftinije nego dva odvojena najma.',
        ],
      },
    ],
  },
]

export function findPost(slug: string) {
  return BLOG_POSTS.find(post => post.slug === slug)
}

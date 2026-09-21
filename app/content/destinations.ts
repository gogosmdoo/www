import { BUSINESS } from '~/data/business'
import type { Locale } from '~/i18n/types'

/*
 * Copy for the three pages the geography earns.
 *
 * These replace the nine Sarajevo neighbourhood and route pages this codebase
 * was inherited with. Bihać is a town of about 56,000 — neighbourhood-level
 * pages for it would be nine thin variations of the same query, competing with
 * each other for a search volume that does not exist. What does exist here is
 * three genuinely distinct intents:
 *
 *   /dostava-vozila-aerodrom  — "Bihać has no airport, so how do I get a car?"
 *                               The single most valuable page on the site after
 *                               the home page, and the one the German-speaking
 *                               diaspora lands on. Published bs/en/de.
 *   /plitvicka-jezera-autom   — Plitvice is 35 km away and is the reason a large
 *                               share of foreign visitors are in this valley at
 *                               all. Published bs/en.
 *   /nacionalni-park-una-autom— The local park, and the reason the domestic and
 *                               diaspora traffic is here. Published bs/en.
 *
 * Every distance and duration below comes from BUSINESS.distances, which holds
 * real driving routes measured from the office coordinates. They are not
 * repeated as literals anywhere in the prose, so they cannot drift.
 *
 * Claims policy: no page here promises free delivery, a price, a mileage
 * allowance or a border-crossing fee, because none of those is confirmed. What
 * each page promises is what the client actually stated — the deposit, no
 * credit card, delivery by arrangement — and the rest is geography, which is
 * checkable.
 */

export const DESTINATION_SLUGS = [
  'dostava-vozila-aerodrom',
  'plitvicka-jezera-autom',
  'nacionalni-park-una-autom',
] as const

export type DestinationSlug = typeof DESTINATION_SLUGS[number]

export interface DestinationCopy {
  metaTitle: string
  metaDescription: string
  breadcrumb: string
  h1: string
  intro: string
  image: string
  imageAlt: string
  /* The numbers strip under the intro. */
  facts: { label: string, value: string }[]
  sections: { title: string, body: string[] }[]
  faq: { q: string, a: string }[]
  cta: { title: string, body: string }
}

const d = BUSINESS.distances

/* "2 h 45 min" from a minute count, in the local shorthand. */
function hm(min: number, hLabel: string, mLabel: string) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return h ? `${h} ${hLabel}${m ? ` ${m} ${mLabel}` : ''}` : `${m} ${mLabel}`
}

export const DESTINATION_COPY: Record<Locale, Partial<Record<DestinationSlug, DestinationCopy>>> = {
  bs: {
    'dostava-vozila-aerodrom': {
      metaTitle: 'Dostava vozila na aerodrom — Zagreb i Zadar | Rent a Car Gogo Bihać',
      metaDescription:
        'Bihać nema aerodrom. Dovozimo vozilo na aerodrom u Zagrebu ili Zadru, '
        + 'ili na vašu adresu. Depozit 400 KM, bez kreditne kartice.',
      breadcrumb: 'Dostava na aerodrom',
      h1: 'Slijećete u Zagreb ili Zadar, a idete u Bihać',
      intro:
        'Bihać nema komercijalni aerodrom i nijedna agencija u gradu nema šalter '
        + 'u terminalu. To znači da pitanje nije „gdje je vaš pult“, nego „kako '
        + 'auto dolazi do mene“. Odgovor je jednostavan: dovezemo ga.',
      image: '/images/fleet/skoda-octavia-mk4-limousine-siva.webp',
      imageAlt: 'Škoda Octavia Rent a Car Gogo spremna za dostavu, Bihać',
      facts: [
        { label: 'Aerodrom Zagreb', value: `${d.zagrebAirport.km} km · ${hm(d.zagrebAirport.min, 'h', 'min')}` },
        { label: 'Aerodrom Zadar', value: `${d.zadarAirport.km} km · ${hm(d.zadarAirport.min, 'h', 'min')}` },
        { label: 'Granica Izačić', value: `${d.border.km} km · ${d.border.min} min` },
        { label: 'Depozit', value: '400 KM' },
      ],
      sections: [
        {
          title: 'Dva aerodroma koja dolaze u obzir',
          body: [
            `Zagreb je najčešći izbor: oko ${d.zagrebAirport.km} kilometara i `
            + `${hm(d.zagrebAirport.min, 'sata', 'minuta')} vožnje, s najviše `
            + 'letova iz Njemačke, Austrije i Švicarske. Zadar je nešto bliži, '
            + `oko ${d.zadarAirport.km} kilometara i `
            + `${hm(d.zadarAirport.min, 'sata', 'minuta')}, i obično jeftiniji `
            + 'ako dolazite niskotarifnim letom.',
            'Oba su preko granice, u Hrvatskoj. To nije problem — to je samo '
            + 'nešto što treba najaviti prije rezervacije, kako bismo '
            + 'pripremili papire za vozilo koje prelazi granicu.',
          ],
        },
        {
          title: 'Kako to praktično izgleda',
          body: [
            'Javite nam broj leta i vrijeme slijetanja. Pratimo let, pa ako '
            + 'kasni — a ljeti kasni — čekamo, bez dodatnog dogovaranja u zadnji '
            + 'čas.',
            'Vozilo preuzimate na aerodromu, potpišete ugovor i ostavite depozit '
            + 'od 400 KM. Kreditna kartica nije potrebna ni u jednom koraku. '
            + 'Plaćanje je gotovinom.',
            'Uslove i cijenu dostave izvan Bihaća dogovaramo prije rezervacije, '
            + 'a ne na dan preuzimanja. Recite odredište i termin i dobit ćete '
            + 'ukupan iznos.',
          ],
        },
        {
          title: 'Ili jednostavno — do vas u Bihaću',
          body: [
            'Ako do Bihaća stižete autobusom, vlastitim autom ili vas neko '
            + 'doveze, vozilo dovozimo na vašu adresu ili pred hotel u '
            + 'dogovoreno vrijeme. Isto vrijedi i za vraćanje.',
            'Kancelarija nam je u Ulici dr. Irfana Ljubijankića 139, na glavnoj '
            + 'cesti kroz grad, s parkingom ispred — ako vam je lakše doći do '
            + 'nas, i to je opcija.',
          ],
        },
      ],
      faq: [
        {
          q: 'Naplaćujete li dostavu na aerodrom?',
          a:
            'Uslove dostave izvan Bihaća dogovaramo prije rezervacije i kažemo '
            + 'vam ukupan iznos prije nego što išta potvrdite. Nema naknada koje '
            + 'se pojave na dan preuzimanja.',
        },
        {
          q: 'Šta ako mi let kasni?',
          a:
            'Javite nam broj leta pri rezervaciji. Pratimo ga i prilagođavamo se '
            + 'stvarnom vremenu slijetanja.',
        },
        {
          q: 'Treba li mi kreditna kartica?',
          a:
            'Ne. Depozit je 400 KM i ostavlja se pri preuzimanju vozila. '
            + 'Plaćanje je gotovinom.',
        },
      ],
      cta: {
        title: 'Pošaljite broj leta i termin',
        body:
          'Odgovaramo s cijenom, vozilom i mjestom preuzimanja — u jednoj poruci.',
      },
    },

    'plitvicka-jezera-autom': {
      metaTitle: 'Iz Bihaća na Plitvička jezera autom | Rent a Car Gogo',
      metaDescription:
        'Plitvička jezera su 35 km od Bihaća, oko sat vožnje. Iznajmite auto u '
        + 'Bihaću bez kreditne kartice i idite svojim tempom.',
      breadcrumb: 'Plitvička jezera',
      h1: 'Plitvička jezera su bliže nego što mislite',
      intro:
        'Iz Bihaća do ulaza u nacionalni park ima manje od četrdeset kilometara. '
        + 'To je najbliži grad s druge strane granice, i to je razlog zašto se '
        + 'Plitvice isplati gledati iz Bihaća, a ne iz Zagreba.',
      image: '/images/fleet/skoda-kamiq-suv-tamnosiva.webp',
      imageAlt: 'Škoda Kamiq Rent a Car Gogo, vozilo za put na Plitvice',
      facts: [
        { label: 'Do Plitvica', value: `${d.plitvice.km} km · ${d.plitvice.min} min` },
        { label: 'Do granice', value: `${d.border.km} km · ${d.border.min} min` },
        { label: 'Vozila', value: '11' },
        { label: 'Depozit', value: '400 KM' },
      ],
      sections: [
        {
          title: 'Put',
          body: [
            `Od naše kancelarije do prelaza Izačić ima ${d.border.km} kilometara, `
            + `oko ${d.border.min} minuta. Nakon granice ostaje još tridesetak `
            + 'kilometara do ulaza u park — ukupno oko sat vremena vožnje, bez '
            + 'gužve.',
            'Cesta je asfaltirana cijelim putem i prohodna tokom cijele godine, '
            + 'ali zimi je to planinski teren i vrijedi krenuti ranije.',
          ],
        },
        {
          title: 'Zašto autom, a ne organizovano',
          body: [
            'Autobusne ture kreću iz Zagreba ili Zadra i vraćaju se isti dan, '
            + 'što znači da na jezera stižete u najgužvanije doba i odlazite '
            + 'prije nego što se isprazne.',
            'Svojim autom birate sat. Ulaz u park ranom jutru ili poslije tri '
            + 'popodne je druga fotografija i druga šetnja. I možete stati gdje '
            + 'god poželite na povratku — a između Plitvica i Bihaća ima gdje '
            + 'stati.',
          ],
        },
        {
          title: 'Prije nego krenete',
          body: [
            'Recite nam pri rezervaciji da idete preko granice. Za izlazak '
            + 'vozila iz Bosne i Hercegovine pripremamo zelenu kartu i pisanu '
            + 'saglasnost — to se rješava unaprijed, ne na dan preuzimanja.',
            'Ponesite pasoš ili ličnu kartu i vozačku dozvolu. Ulaznice za park '
            + 'se kupuju online i u sezoni se rasprodaju za popularne termine, '
            + 'pa ih riješite prije nego sjednete u auto.',
          ],
        },
      ],
      faq: [
        {
          q: 'Mogu li vašim vozilom preći u Hrvatsku?',
          a:
            'Da, uz prethodnu najavu. Pripremamo zelenu kartu i pisanu '
            + 'saglasnost za izlazak vozila. Javite odredište prije rezervacije.',
        },
        {
          q: 'Koliko traje put?',
          a:
            `Oko sat vremena od Bihaća do ulaza u park, odnosno ${d.plitvice.km} `
            + 'kilometara. Računajte i na zadržavanje na granici u sezoni.',
        },
        {
          q: 'Koje vozilo je najbolje za taj put?',
          a:
            'Bilo koje iz naše ponude. Ako vas je više i nosite prtljag, '
            + 'predložit ćemo karavan ili kombi; za dvoje je dovoljan gradski '
            + 'auto.',
        },
      ],
      cta: {
        title: 'Uzmite auto i idite svojim tempom',
        body: 'Javite termin i broj putnika — predlažemo vozilo i cijenu isti dan.',
      },
    },

    'nacionalni-park-una-autom': {
      metaTitle: 'Nacionalni park Una autom iz Bihaća | Rent a Car Gogo',
      metaDescription:
        'Štrbački buk, Martin Brod i Una — sve na četrdesetak kilometara od '
        + 'Bihaća. Najam auta bez kreditne kartice, depozit 400 KM.',
      breadcrumb: 'Nacionalni park Una',
      h1: 'Nacionalni park Una počinje odmah iza grada',
      intro:
        'Bihać je jedini grad koji leži na Uni i jedini iz kojeg se park obilazi '
        + 'bez planiranja cijelog dana putovanja. Štrbački buk je četrdesetak '
        + 'kilometara, Martin Brod nešto dalje — i do oba se ide autom.',
      image: '/images/fleet/opel-frontera-suv-bijeli-crni-krov.webp',
      imageAlt: 'Opel Frontera Rent a Car Gogo, vozilo za obilazak Nacionalnog parka Una',
      facts: [
        { label: 'Do Štrbačkog buka', value: `${d.unaFalls.km} km · ${d.unaFalls.min} min` },
        { label: 'Do Plitvica', value: `${d.plitvice.km} km` },
        { label: 'Radno vrijeme', value: '08 – 18' },
        { label: 'Depozit', value: '400 KM' },
      ],
      sections: [
        {
          title: 'Šta se obilazi',
          body: [
            'Štrbački buk je ono zbog čega većina dolazi — vodopad na Uni, '
            + `oko ${d.unaFalls.km} kilometara od grada, s pristupnim putem koji `
            + 'zadnjih nekoliko kilometara ide makadamom.',
            'Martin Brod je drugi kraj parka, s kaskadama i starim mlinovima, i '
            + 'do njega se vozi duže. Između to dvoje ima cijeli niz mjesta na '
            + 'rijeci do kojih se javnim prijevozom ne stiže uopšte.',
          ],
        },
        {
          title: 'Kakav auto uzeti',
          body: [
            'Za asfaltirani dio parka dovoljan je bilo koji auto iz naše ponude. '
            + 'Za prilaze koji zadnjih par kilometara idu makadamom ugodnije je '
            + 'nešto s višom pozicijom — Frontera ili Kamiq.',
            'Ako idete u grupi ili nosite opremu za rafting, uzmite kombi ili '
            + 'karavan. Javite koliko vas je i šta nosite i predložit ćemo.',
          ],
        },
        {
          title: 'Kad krenuti',
          body: [
            'Ljeti je rijeka najposjećenija između deset i četiri. Rano jutro je '
            + 'mirnije i bolje za fotografije, a i put je prazniji.',
            'Kancelarija radi od 08:00 do 18:00, pa se vozilo može preuzeti prije '
            + 'nego što krene dan. Za raniji termin javite se dan ranije i '
            + 'dogovorit ćemo.',
          ],
        },
      ],
      faq: [
        {
          q: 'Treba li mi terensko vozilo?',
          a:
            'Ne. Prilazni putevi su prohodni običnim automobilom, ali zadnjih '
            + 'nekoliko kilometara do nekih lokacija je makadam, gdje je vozilo s '
            + 'višom pozicijom ugodnije.',
        },
        {
          q: 'Mogu li preuzeti vozilo prije 08:00?',
          a:
            'Uz prethodni dogovor da. Javite se dan ranije i organizovat ćemo '
            + 'preuzimanje izvan radnog vremena.',
        },
        {
          q: 'Dovozite li vozilo na adresu u Bihaću?',
          a:
            'Da, na adresu ili pred hotel, u dogovoreno vrijeme. Isto vrijedi i '
            + 'za vraćanje.',
        },
      ],
      cta: {
        title: 'Rijeka je petnaest minuta odavde',
        body: 'Javite termin i broj putnika — vozilo i cijenu predlažemo isti dan.',
      },
    },
  },

  en: {
    'dostava-vozila-aerodrom': {
      metaTitle: 'Airport car delivery — Zagreb and Zadar | Rent a Car Gogo Bihać',
      metaDescription:
        'Bihać has no airport. We deliver the car to Zagreb or Zadar airport, or '
        + 'to your address. 400 KM deposit, no credit card required.',
      breadcrumb: 'Airport delivery',
      h1: 'You land in Zagreb or Zadar, and you are going to Bihać',
      intro:
        'Bihać has no commercial airport, and no agency in this town has a desk '
        + 'in a terminal. So the question is not "where is your counter" but '
        + '"how does the car reach me". The answer is simple: we drive it to you.',
      image: '/images/fleet/skoda-octavia-mk4-limousine-siva.webp',
      imageAlt: 'A Škoda Octavia from Rent a Car Gogo ready for delivery, Bihać',
      facts: [
        { label: 'Zagreb airport', value: `${d.zagrebAirport.km} km · ${hm(d.zagrebAirport.min, 'h', 'min')}` },
        { label: 'Zadar airport', value: `${d.zadarAirport.km} km · ${hm(d.zadarAirport.min, 'h', 'min')}` },
        { label: 'Izačić border', value: `${d.border.km} km · ${d.border.min} min` },
        { label: 'Deposit', value: '400 KM' },
      ],
      sections: [
        {
          title: 'The two airports worth considering',
          body: [
            `Zagreb is the usual choice: about ${d.zagrebAirport.km} kilometres `
            + `and ${hm(d.zagrebAirport.min, 'hours', 'minutes')} of driving, `
            + 'with the most flights from Germany, Austria and Switzerland. '
            + `Zadar is a little closer at around ${d.zadarAirport.km} `
            + `kilometres and ${hm(d.zadarAirport.min, 'hours', 'minutes')}, and `
            + 'usually cheaper if you are flying low-cost.',
            'Both are across the border, in Croatia. That is not a problem — it '
            + 'is simply something to declare before booking, so the paperwork '
            + 'for a vehicle crossing a border is ready in advance.',
          ],
        },
        {
          title: 'How it works in practice',
          body: [
            'Send us your flight number and landing time. We track the flight, so '
            + 'if it is late — and in summer it is late — we wait, without a '
            + 'last-minute renegotiation.',
            'You take the car at the airport, sign the contract and leave the 400 '
            + 'KM deposit. No credit card is needed at any step. Payment is in '
            + 'cash.',
            'Terms and the cost of delivery outside Bihać are agreed before you '
            + 'book, not on the day. Tell us the destination and the dates and '
            + 'you get a total.',
          ],
        },
        {
          title: 'Or simply — to you, in Bihać',
          body: [
            'If you are reaching Bihać by bus, in your own car or with someone '
            + 'driving you, we bring the car to your address or your hotel at an '
            + 'agreed time. The same goes for the return.',
            'Our office is at Dr. Irfana Ljubijankića 139, on the main road '
            + 'through town, with parking outside — if it is easier to come to '
            + 'us, that works too.',
          ],
        },
      ],
      faq: [
        {
          q: 'Do you charge for airport delivery?',
          a:
            'Delivery outside Bihać is agreed before booking and we give you the '
            + 'total before you confirm anything. Nothing appears on the day of '
            + 'collection.',
        },
        {
          q: 'What if my flight is delayed?',
          a:
            'Give us the flight number when you book. We track it and adjust to '
            + 'the actual landing time.',
        },
        {
          q: 'Do I need a credit card?',
          a:
            'No. The deposit is 400 KM, left when you collect the car. Payment is '
            + 'in cash.',
        },
      ],
      cta: {
        title: 'Send your flight number and dates',
        body: 'We reply with a price, a car and a pick-up point — in one message.',
      },
    },

    'plitvicka-jezera-autom': {
      metaTitle: 'Plitvice Lakes from Bihać by car | Rent a Car Gogo',
      metaDescription:
        'The Plitvice Lakes are 35 km from Bihać, about an hour away. Hire a car '
        + 'in Bihać with no credit card and go at your own pace.',
      breadcrumb: 'Plitvice Lakes',
      h1: 'The Plitvice Lakes are closer than you think',
      intro:
        'It is under forty kilometres from Bihać to the park entrance. This is '
        + 'the nearest town on the other side of the border, and it is why '
        + 'Plitvice is worth planning from Bihać rather than from Zagreb.',
      image: '/images/fleet/skoda-kamiq-suv-tamnosiva.webp',
      imageAlt: 'A Škoda Kamiq from Rent a Car Gogo, a car for the Plitvice drive',
      facts: [
        { label: 'To Plitvice', value: `${d.plitvice.km} km · ${d.plitvice.min} min` },
        { label: 'To the border', value: `${d.border.km} km · ${d.border.min} min` },
        { label: 'Cars', value: '11' },
        { label: 'Deposit', value: '400 KM' },
      ],
      sections: [
        {
          title: 'The drive',
          body: [
            `It is ${d.border.km} kilometres from our office to the Izačić `
            + `crossing, about ${d.border.min} minutes. After the border there `
            + 'are another thirty or so to the park entrance — around an hour in '
            + 'total, without queues.',
            'The road is surfaced the whole way and open year round, but this is '
            + 'mountain country in winter and it is worth setting off early.',
          ],
        },
        {
          title: 'Why drive rather than take a tour',
          body: [
            'Coach tours leave from Zagreb or Zadar and return the same day, '
            + 'which means you arrive at the lakes at the busiest hour and leave '
            + 'before they empty out.',
            'With your own car you choose the hour. Entering the park early in '
            + 'the morning or after three in the afternoon is a different '
            + 'photograph and a different walk. And you can stop wherever you '
            + 'like on the way back — there is plenty worth stopping for between '
            + 'Plitvice and Bihać.',
          ],
        },
        {
          title: 'Before you set off',
          body: [
            'Tell us when you book that you are crossing the border. For a '
            + 'vehicle leaving Bosnia and Herzegovina we prepare a green card and '
            + 'written permission — arranged in advance, not on the day.',
            'Bring a passport or ID card and your driving licence. Park tickets '
            + 'are bought online and popular slots sell out in season, so settle '
            + 'those before you get in the car.',
          ],
        },
      ],
      faq: [
        {
          q: 'Can I take your car into Croatia?',
          a:
            'Yes, with advance notice. We prepare a green card and written '
            + 'permission for the vehicle to leave the country. Tell us the '
            + 'destination before booking.',
        },
        {
          q: 'How long does the drive take?',
          a:
            `About an hour from Bihać to the park entrance, some ${d.plitvice.km} `
            + 'kilometres. Allow for a wait at the border in high season.',
        },
        {
          q: 'Which car suits that drive?',
          a:
            'Any of ours. If there are several of you with luggage we will '
            + 'suggest an estate or a minibus; for two people a city car is '
            + 'plenty.',
        },
      ],
      cta: {
        title: 'Take a car and go at your own pace',
        body: 'Send your dates and passenger count — we suggest a car and a price the same day.',
      },
    },

    'nacionalni-park-una-autom': {
      metaTitle: 'Una National Park from Bihać by car | Rent a Car Gogo',
      metaDescription:
        'Štrbački buk, Martin Brod and the Una — all within forty kilometres of '
        + 'Bihać. Car hire with no credit card, 400 KM deposit.',
      breadcrumb: 'Una National Park',
      h1: 'Una National Park starts just outside town',
      intro:
        'Bihać is the only city on the Una and the only one from which the park '
        + 'can be seen without planning a whole day of travel around it. '
        + 'Štrbački buk is about forty kilometres away, Martin Brod a little '
        + 'further — and both are reached by car.',
      image: '/images/fleet/opel-frontera-suv-bijeli-crni-krov.webp',
      imageAlt: 'An Opel Frontera from Rent a Car Gogo, a car for Una National Park',
      facts: [
        { label: 'To Štrbački buk', value: `${d.unaFalls.km} km · ${d.unaFalls.min} min` },
        { label: 'To Plitvice', value: `${d.plitvice.km} km` },
        { label: 'Opening hours', value: '08 – 18' },
        { label: 'Deposit', value: '400 KM' },
      ],
      sections: [
        {
          title: 'What there is to see',
          body: [
            'Štrbački buk is what most people come for — a waterfall on the Una '
            + `about ${d.unaFalls.km} kilometres from town, on an approach road `
            + 'whose last few kilometres are gravel.',
            'Martin Brod is the other end of the park, with cascades and old '
            + 'mills, and a longer drive. Between the two is a string of places '
            + 'on the river that public transport does not reach at all.',
          ],
        },
        {
          title: 'Which car to take',
          body: [
            'For the surfaced part of the park any of our cars will do. For the '
            + 'approaches whose last few kilometres are gravel, something with a '
            + 'higher stance is more comfortable — the Frontera or the Kamiq.',
            'If you are travelling as a group or carrying rafting kit, take the '
            + 'minibus or an estate. Tell us how many of you there are and what '
            + 'you are carrying and we will suggest one.',
          ],
        },
        {
          title: 'When to go',
          body: [
            'In summer the river is busiest between ten and four. Early morning '
            + 'is quieter, better for photographs, and the road is emptier too.',
            'The office is open 08:00 to 18:00, so the car can be collected '
            + 'before the day starts. For an earlier handover, let us know the '
            + 'day before and we will arrange it.',
          ],
        },
      ],
      faq: [
        {
          q: 'Do I need an off-road vehicle?',
          a:
            'No. The approach roads are passable in an ordinary car, though the '
            + 'last few kilometres to some spots are gravel, where a higher '
            + 'stance is more comfortable.',
        },
        {
          q: 'Can I collect the car before 08:00?',
          a:
            'By prior arrangement, yes. Let us know the day before and we will '
            + 'organise a handover outside opening hours.',
        },
        {
          q: 'Do you deliver to an address in Bihać?',
          a:
            'Yes, to an address or a hotel, at an agreed time. The same applies '
            + 'to the return.',
        },
      ],
      cta: {
        title: 'The river is fifteen minutes from here',
        body: 'Send your dates and passenger count — we suggest a car and a price the same day.',
      },
    },
  },

  de: {
    'dostava-vozila-aerodrom': {
      metaTitle: 'Mietwagen-Lieferung zum Flughafen Zagreb und Zadar | Rent a Car Gogo Bihać',
      metaDescription:
        'Bihać hat keinen Flughafen. Wir liefern das Fahrzeug an die Flughäfen '
        + 'Zagreb und Zadar oder an Ihre Adresse. Kaution 400 KM, ohne Kreditkarte.',
      breadcrumb: 'Lieferung zum Flughafen',
      h1: 'Sie landen in Zagreb oder Zadar und wollen nach Bihać',
      intro:
        'Bihać hat keinen Verkehrsflughafen, und keine Vermietung in dieser Stadt '
        + 'hat einen Schalter im Terminal. Die Frage lautet also nicht „wo ist '
        + 'Ihr Schalter", sondern „wie kommt das Auto zu mir". Die Antwort ist '
        + 'einfach: Wir bringen es.',
      image: '/images/fleet/skoda-octavia-mk4-limousine-siva.webp',
      imageAlt: 'Škoda Octavia von Rent a Car Gogo, bereit zur Lieferung, Bihać',
      facts: [
        { label: 'Flughafen Zagreb', value: `${d.zagrebAirport.km} km · ${hm(d.zagrebAirport.min, 'Std.', 'Min.')}` },
        { label: 'Flughafen Zadar', value: `${d.zadarAirport.km} km · ${hm(d.zadarAirport.min, 'Std.', 'Min.')}` },
        { label: 'Grenze Izačić', value: `${d.border.km} km · ${d.border.min} Min.` },
        { label: 'Kaution', value: '400 KM' },
      ],
      sections: [
        {
          title: 'Die zwei Flughäfen, die infrage kommen',
          body: [
            `Zagreb ist die übliche Wahl: rund ${d.zagrebAirport.km} Kilometer `
            + `und ${hm(d.zagrebAirport.min, 'Stunden', 'Minuten')} Fahrt, mit `
            + 'den meisten Verbindungen aus Deutschland, Österreich und der '
            + `Schweiz. Zadar liegt mit etwa ${d.zadarAirport.km} Kilometern und `
            + `${hm(d.zadarAirport.min, 'Stunden', 'Minuten')} etwas näher und `
            + 'ist meist günstiger, wenn Sie mit einem Billigflug kommen.',
            'Beide liegen jenseits der Grenze, in Kroatien. Das ist kein Problem '
            + '— es muss nur vor der Reservierung angemeldet werden, damit die '
            + 'Papiere für ein Fahrzeug im grenzüberschreitenden Verkehr '
            + 'vorbereitet sind.',
          ],
        },
        {
          title: 'Wie das praktisch abläuft',
          body: [
            'Senden Sie uns Flugnummer und Landezeit. Wir verfolgen den Flug — '
            + 'wenn er Verspätung hat, und im Sommer hat er Verspätung, warten '
            + 'wir, ohne dass in letzter Minute neu verhandelt wird.',
            'Sie übernehmen das Fahrzeug am Flughafen, unterschreiben den Vertrag '
            + 'und hinterlegen die Kaution von 400 KM. Eine Kreditkarte ist in '
            + 'keinem Schritt nötig. Bezahlt wird bar.',
            'Bedingungen und Kosten einer Lieferung außerhalb von Bihać werden '
            + 'vor der Reservierung vereinbart, nicht am Tag der Übernahme. '
            + 'Nennen Sie Ziel und Zeitraum, und Sie bekommen einen Gesamtbetrag.',
          ],
        },
        {
          title: 'Oder einfach — zu Ihnen nach Bihać',
          body: [
            'Wenn Sie mit dem Bus, im eigenen Auto oder gefahren nach Bihać '
            + 'kommen, bringen wir das Fahrzeug zur vereinbarten Zeit an Ihre '
            + 'Adresse oder vors Hotel. Dasselbe gilt für die Rückgabe.',
            'Unser Büro liegt in der Dr. Irfana Ljubijankića 139 an der '
            + 'Hauptstraße, mit Parkplatz davor — wenn es Ihnen leichter fällt, '
            + 'zu uns zu kommen, geht auch das.',
          ],
        },
      ],
      faq: [
        {
          q: 'Berechnen Sie die Lieferung zum Flughafen?',
          a:
            'Eine Lieferung außerhalb von Bihać wird vor der Reservierung '
            + 'vereinbart, und Sie erhalten den Gesamtbetrag, bevor Sie etwas '
            + 'zusagen. Am Tag der Übernahme kommt nichts hinzu.',
        },
        {
          q: 'Was ist, wenn mein Flug Verspätung hat?',
          a:
            'Geben Sie uns bei der Reservierung die Flugnummer. Wir verfolgen sie '
            + 'und richten uns nach der tatsächlichen Landezeit.',
        },
        {
          q: 'Brauche ich eine Kreditkarte?',
          a:
            'Nein. Die Kaution beträgt 400 KM und wird bei der Übernahme '
            + 'hinterlegt. Bezahlt wird bar.',
        },
      ],
      cta: {
        title: 'Senden Sie Flugnummer und Zeitraum',
        body:
          'Wir antworten mit Preis, Fahrzeug und Übernahmeort — in einer Nachricht.',
      },
    },
  },

  ar: {},
}

export function destinationCopy(slug: DestinationSlug, locale: Locale) {
  return DESTINATION_COPY[locale]?.[slug] ?? DESTINATION_COPY.bs[slug]!
}

import type { LocaleMessages } from '../types'

/*
 * Bosnian — the master copy. The other three locales are translations of this
 * file and should be re-read against it whenever it changes.
 *
 * The argument the page makes, in order:
 *
 *   1. You do not need a credit card, and the deposit is 400 KM.
 *   2. The car comes to you, because Bihać has no airport to meet you at.
 *   3. Other people have already done this and rated it 5.0.
 *
 * Point 2 is the one that took research. Every rent-a-car site in the country
 * leads with an airport desk; Bihać has no commercial airport, so this one
 * cannot, and pretending otherwise would be caught by the first visitor who
 * checked. Turning that into the offer — we drive to Zagreb, to Zadar, to your
 * door — is both true and stronger than the desk would have been.
 *
 * Numbers rule: every figure in this file is real and checkable. The distances
 * are driving routes from the office coordinates, rounded down. The deposit is
 * the client's. The rating is the live Google score. Nothing is rounded up in
 * the agency's favour, because a visitor with a phone will check the ones that
 * matter.
 */
export const bs: LocaleMessages = {
  meta: {
    title: 'Rent a Car Gogo Bihać — najam auta bez kreditne kartice',
    description:
      'Najam auta u Bihaću bez kreditne kartice. Depozit 400 KM i vraća se u '
      + 'cijelosti. Dostava na adresu, hotel ili aerodrom. Ocjena 5,0 na Googleu.',
    ogImageAlt: 'Vozilo Rent a Car Gogo na cesti uz rijeku Unu kod Bihaća',
  },

  nav: {
    fleet: 'Automobili',
    about: 'O nama',
    terms: 'Uslovi',
    blog: 'Blog',
    contact: 'Kontakt',
    prices: 'Cijene',
    services: 'Najam sa vozačem',
    airport: 'Dostava na aerodrom',
    plitvice: 'Plitvička jezera',
    una: 'Nacionalni park Una',
    book: 'Rezerviši',
    openMenu: 'Otvori meni',
    closeMenu: 'Zatvori meni',
    mainNav: 'Glavna navigacija',
    mobileNav: 'Mobilna navigacija',
    langLabel: 'Jezik',
  },

  hero: {
    eyebrow: 'Bihać · Nacionalni park Una · Plitvička jezera',
    titleLead: 'Iznajmite auto u Bihaću',
    titleAccent: 'bez kreditne kartice.',
    titleTail: '',
    subtitle:
      'Depozit je 400 KM (200 €) i vraća se u cijelosti. Rezervaciju potvrđujete '
      + 'pozivom ili porukom, a plaćate tek kada preuzmete ključeve — gotovinom.',
    imageAlt:
      'Sivo vozilo Rent a Car Gogo na cesti iznad rijeke Une u okolini Bihaća, '
      + 'u jutarnjem svjetlu',
    proof: [
      'Vozilo dovozimo na vašu adresu, hotel ili aerodrom',
      'Bez skrivenih troškova — cijenu znate prije potvrde',
    ],
  },

  enquiry: {
    title: 'Provjerite dostupnost',
    note: 'Odgovaramo u toku radnog vremena, obično u par minuta.',
    dates: 'Termin najma',
    datesPlaceholder: 'npr. 12.7. – 19.7.',
    people: 'Broj putnika',
    peoplePlaceholder: 'npr. 4',
    pickup: 'Mjesto preuzimanja',
    pickupPlaceholder: 'Bihać, hotel, aerodrom…',
    car: 'Vozilo',
    carAny: 'Svejedno — predložite mi',
    submit: 'Pošalji upit na WhatsApp',
    intro: 'Zdravo! Zanima me najam vozila.',
    reassure: 'Upit ne obavezuje. Cijenu dobijate prije nego išta potvrdite.',
  },

  /*
   * Four facts, and the fourth is the one nobody else in this city can print.
   * The order runs proof, choice, risk, geography.
   */
  facts: [
    { value: '5,0', label: 'prosječna ocjena na Googleu' },
    { value: '11', label: 'vozila — od gradskog auta do kombija' },
    { value: '400 KM', label: 'depozit, vraćen u cijelosti' },
    { value: '35 km', label: 'od nas do Plitvičkih jezera' },
  ],

  benefits: {
    title: 'Tri stvari koje obično zakompliciraju najam — kod nas ne',
    intro:
      'Ovo su pitanja zbog kojih ljudi odustanu od rezervacije. Zato na njih '
      + 'odgovaramo ovdje, a ne sitnim slovima na dnu ugovora.',
    items: [
      {
        title: 'Bez kreditne kartice',
        body:
          'Rezervaciju potvrđujete pozivom ili porukom — ne treba nam broj '
          + 'kartice unaprijed. Plaćate gotovinom pri preuzimanju vozila. '
          + 'Ništa se ne blokira i ništa se ne naplaćuje '
          + 'prije nego što sjednete u auto.',
      },
      {
        title: 'Depozit 400 KM i ni marke više',
        body:
          'Depozit je 400 KM, odnosno 200 €. Vraća se u cijelosti kada vratite '
          + 'vozilo neoštećeno i u stanju u kojem ste ga preuzeli. Bez naknada '
          + 'za obradu i bez odbitaka koje niste vidjeli unaprijed.',
      },
      {
        title: 'Vozilo dolazi do vas',
        body:
          'Bihać nema aerodrom, pa ne glumimo šalter u terminalu. Radimo '
          + 'obrnuto: vozilo dovozimo na vašu adresu, pred hotel, ili vas '
          + 'sačekamo na aerodromu na koji slijećete. Dogovorite mjesto i '
          + 'vrijeme, mi ćemo biti tamo.',
      },
    ],
  },

  reviews: {
    title: 'Ocjena 5,0 — i to od ljudi koji su zaista vozili',
    intro:
      'Recenzije ispod su javne i nepromijenjene. Svaka vodi na svoj original '
      + 'na Google Mapama, pa ih možete provjeriti bez našeg posredovanja.',
    ratingLabel: 'Ocjena na Googleu',
    ratingCount: 'na osnovu {n} recenzija',
    onGoogle: 'na Googleu',
    translatedNote: 'Prevedeno s Googlea',
    readOnGoogle: 'Pročitaj na Googleu',
    allReviews: 'Sve recenzije na Google Mapama',
  },

  fleet: {
    eyebrow: 'Vozni park',
    title: 'Jedanaest vozila. Sva slikana ispred naše kancelarije.',
    intro:
      'Bez kataloga i bez tuđih fotografija: ovo su naši automobili, onakvi '
      + 'kakve ćete ih preuzeti, uz bihaćke tablice i našu firmu u pozadini. '
      + 'Ako niste sigurni šta vam treba, javite nam broj putnika i koliko '
      + 'prtljaga nosite — predložit ćemo.',
    book: 'Provjeri dostupnost',
    bookMessage: 'Zdravo! Zanima me najam vozila {car}.',
    seats: '{n} sjedišta',
    seatsUnknown: 'Broj sjedišta na upit',
    transmissionUnknown: 'Mjenjač na upit',
    all: 'Sva vozila',
    railHint: 'Prevucite za više vozila',
    categories: {
      all: 'Sva vozila',
      city: 'Gradski',
      estate: 'Karavan',
      suv: 'SUV',
      van: 'Kombi',
      sport: 'Sportski',
      business: 'Poslovni',
    },
    specs: {
      comfort: 'Udobno na duže',
      longTrips: 'Za duži put',
      business: 'Poslovni nastup',
      luggage: 'Veliki prtljažnik',
      family: 'Porodično',
      group: 'Za grupu',
      transfer: 'Transferi',
      sport: 'Živahno za volanom',
      economy: 'Niska potrošnja',
      cityDrive: 'Lako kroz grad',
      easyParking: 'Lako parkiranje',
      highSeat: 'Viša pozicija sjedenja',
    },
    imageAlt: '{name} ({colour}) ispred kancelarije Rent a Car Gogo u Bihaću',
  },

  steps: {
    eyebrow: 'Naš servis',
    title: 'Kako to izgleda, od prvog poziva do vraćanja ključeva',
    intro:
      'Pet koraka, bez iznenađenja između njih. Otvorite onaj koji vas zanima.',
    items: [
      {
        label: 'Prije najma',
        body:
          'Javite nam termin, broj putnika i gdje želite preuzeti vozilo. Na '
          + 'osnovu toga predlažemo auto i kažemo vam ukupnu cijenu — ne dnevnu '
          + 'cijenu na koju se kasnije nešto dodaje. Ako planirate izlazak iz '
          + 'Bosne i Hercegovine, recite nam to odmah, jer za to pripremamo '
          + 'dodatne papire.',
      },
      {
        label: 'Rezervacija',
        body:
          'Rezervacija se potvrđuje pozivom, porukom ili preko WhatsAppa. Ne '
          + 'tražimo broj kreditne kartice i ne naplaćujemo ništa unaprijed. '
          + 'Dovoljno je ime, kontakt telefon i termin.',
      },
      {
        label: 'Preuzimanje',
        body:
          'Vozilo možete preuzeti kod nas u Ulici dr. Irfana Ljubijankića 139 u '
          + 'Bihaću, ili ga dovozimo na adresu koju dogovorimo. Zajedno '
          + 'pregledamo vozilo i upišemo stanje, vi potpišete ugovor, ostavite '
          + 'depozit od 400 KM i platite najam — gotovinom.',
      },
      {
        label: 'Tokom najma',
        body:
          'Broj koji zovete je isti broj koji je predao ključeve. Ako se bilo '
          + 'šta desi — kvar, guma, nezgoda — nazovite nas prije nego bilo koga '
          + 'drugog i dogovorit ćemo se šta dalje. Za produženje najma javite se '
          + 'dan ranije ako možete.',
      },
      {
        label: 'Vraćanje',
        body:
          'Vozilo vraćate tamo gdje ste ga preuzeli ili na dogovoreno mjesto. '
          + 'Zajedno ga pregledamo i, ako je neoštećeno i u stanju u kojem ste '
          + 'ga preuzeli, depozit od 400 KM vraćamo u cijelosti, odmah.',
      },
    ],
  },

  locations: {
    title: 'Gdje god da počinje vaš put',
    intro:
      'Naša kancelarija je na glavnoj cesti kroz Bihać, u blizini City centra, s '
      + 'parkingom ispred. Ali ne morate doći do nas — najčešće mi dolazimo do vas.',
    items: [
      {
        title: 'Kod nas u Bihaću',
        body:
          'Dr. Irfana Ljubijankića 139, u nizu lokala s trgovinama i mesnicom. '
          + 'Na glavnoj cesti, u blizini City centra, lako se nađe i ima gdje se parkirati.',
        meta: 'City centar',
      },
      {
        title: 'Na vašu adresu ili pred hotel',
        body:
          'Dovozimo vozilo na adresu u Bihaću i okolini, u dogovoreno vrijeme. '
          + 'Isto važi i za vraćanje — ne morate planirati put do kancelarije.',
        meta: 'Bihać i okolina',
      },
      {
        title: 'Na aerodrom na koji slijećete',
        body:
          'Bihać nema aerodrom. Najbliži su Zadar, oko 150 km i dva sata i po '
          + 'vožnje, i Zagreb, oko 165 km i nešto manje od tri sata. Možemo vas '
          + 'sačekati na jednom od njih — javite broj leta.',
        meta: 'Zagreb · Zadar',
      },
      {
        title: 'Prema granici i dalje',
        body:
          'Do prelaza Izačić ima 13 kilometara, oko 25 minuta. Ako planirate '
          + 'prijeći u Hrvatsku, recite nam prije rezervacije kako bismo '
          + 'pripremili zelenu kartu i saglasnost za izlazak vozila.',
        meta: '13 km do granice',
      },
    ],
    mapsLink: 'Otvori na Google Mapama',
    addressNote: 'Radno vrijeme: ponedjeljak – subota, 08:00 – 18:00',
  },

  why: {
    eyebrow: 'Zašto baš mi',
    title: 'Mala agencija, i to je namjerno',
    intro:
      'Nemamo pozivni centar, nemamo šalter s redom i nemamo ugovor na šest '
      + 'strana. Imamo jedanaest auta i ljude koji ih poznaju.',
    items: [
      {
        title: 'Jedna osoba, od poziva do ključeva',
        body:
          'Onaj ko vam se javi na telefon je isti onaj ko vam predaje vozilo i '
          + 'ko ga prima nazad. Ne prepričavate svoj slučaj trećem operateru.',
      },
      {
        title: 'Cijena koju čujete je cijena koju platite',
        body:
          'Ukupan iznos dogovaramo prije rezervacije. Bez naknade za rezervaciju, '
          + 'bez „obrade ugovora“ i bez stavki koje se pojave tek na kraju.',
      },
      {
        title: 'Poznajemo teren za koji iznajmljujete',
        body:
          'Una, Plitvice, Štrbački buk, put prema moru i put prema Zagrebu — '
          + 'ovo su ceste kojima i sami vozimo. Pitajte za savjet prije puta.',
      },
      {
        title: 'Vozila spremna za put',
        body:
          'Servisirana i očišćena prije svakog izdavanja. Stanje vozila '
          + 'upisujemo zajedno s vama pri preuzimanju, pa nema spora pri vraćanju.',
      },
    ],
  },

  driver: {
    title: 'Sami za volanom ili s našim vozačem',
    intro:
      'Oba su moguća. Izbor obično zavisi od toga je li put posao ili odmor.',
    withDriver: {
      title: 'S vozačem',
      body:
        'Za transfere s aerodroma, poslovne dolaske i grupe koje ne žele brinuti '
        + 'o parkingu, granici i putu koji ne poznaju.',
      points: [
        'Transferi s aerodroma Zagreb i Zadar',
        'Poslovni sastanci i cjelodnevni angažman',
        'Grupe i porodična putovanja kombijem',
        'Vozač poznaje lokalne ceste i granične prelaze',
      ],
    },
    selfDrive: {
      title: 'Bez vozača',
      body:
        'Klasičan najam: preuzmete ključeve i vozite sami, svojim tempom i svojim '
        + 'planom.',
      points: [
        'Depozit 400 KM, vraća se u cijelosti',
        'Bez kreditne kartice',
        'Dostava vozila na dogovoreno mjesto',
        'Mogućnost izlaska iz zemlje uz najavu',
      ],
    },
    cta: 'Dogovorite vozača',
  },

  faq: {
    title: 'Pitanja koja dobijamo prije svake rezervacije',
    intro:
      'Ako ovdje nema vašeg pitanja, nazovite — brže je nego što mislite.',
    items: [
      {
        q: 'Treba li mi kreditna kartica za rezervaciju?',
        a:
          'Ne. Rezervaciju potvrđujete pozivom ili porukom, bez broja kartice. '
          + 'Najam plaćate gotovinom pri preuzimanju vozila.',
      },
      {
        q: 'Koliki je depozit i kada ga dobijam nazad?',
        a:
          'Depozit je 400 KM, odnosno 200 €. Vraća se u cijelosti odmah pri '
          + 'vraćanju vozila, pod uslovom da je vozilo neoštećeno i u stanju u '
          + 'kojem ste ga preuzeli.',
      },
      {
        q: 'Možete li dovesti vozilo na moju adresu?',
        a:
          'Da. Dovozimo vozilo na adresu u Bihaću i okolini, pred hotel, ili vas '
          + 'čekamo na aerodromu u Zagrebu ili Zadru. Javite mjesto i vrijeme, a '
          + 'za dostavu izvan Bihaća dogovaramo uslove prije rezervacije.',
      },
      {
        q: 'Kako plaćam najam?',
        a:
          'Gotovinom, pri preuzimanju vozila. Ukupan '
          + 'iznos znate prije nego što potvrdite rezervaciju.',
      },
      {
        q: 'Mogu li vozilom preći u Hrvatsku?',
        a:
          'Izlazak vozila iz Bosne i Hercegovine je moguć, ali se dogovara '
          + 'unaprijed — za to pripremamo zelenu kartu i pisanu saglasnost. '
          + 'Recite nam destinaciju prije rezervacije, ne na dan preuzimanja. '
          + 'Granični prelaz Izačić je 13 kilometara od nas.',
      },
      {
        q: 'Koje je vaše radno vrijeme?',
        a:
          'Kancelarija radi od 08:00 do 18:00. Preuzimanje i vraćanje izvan tog '
          + 'vremena je moguće uz prethodni dogovor — javite se ranije i '
          + 'organizovat ćemo.',
      },
      {
        q: 'Šta ako se pokvari ili probušim gumu?',
        a:
          'Nazovite nas prije bilo koga drugog, na isti broj na koji ste '
          + 'rezervisali. Dogovorit ćemo zamjensko vozilo ili pomoć na putu, '
          + 'zavisno od toga gdje ste i šta se desilo.',
      },
      {
        q: 'Gdje se tačno nalazite?',
        a:
          'Dr. Irfana Ljubijankića 139 u Bihaću, u blizini City centra, na glavnoj '
          + 'cesti u nizu lokala s trgovinama. Ispred je parking.',
      },
    ],
  },

  blog: {
    eyebrow: 'Vodiči',
    title: 'Prije nego što krenete',
    intro:
      'Kratki tekstovi o onome što nas najčešće pitaju: šta ponijeti na '
      + 'preuzimanje i kuda se isplati otići iz Bihaća.',
    readMore: 'Pročitaj vodič',
    backToBlog: 'Nazad na blog',
    published: 'Objavljeno',
    readingTime: '{n} min čitanja',
    allPosts: 'Svi vodiči',
    ctaTitle: 'Spremni za put?',
    ctaBody:
      'Javite nam termin i broj putnika. Vozilo i cijenu predlažemo isti dan.',
  },

  contact: {
    title: 'Javite se',
    intro:
      'Najbrže je telefonom ili na WhatsApp. Ako vam je lakše pisati, '
      + 'popunite formu i mi vas nazovemo.',
    callTitle: 'Nazovite',
    callBody: 'Radnim danom od 08:00 do 18:00',
    whatsappTitle: 'WhatsApp',
    whatsappBody: 'Pošaljite termin i broj putnika — odgovaramo porukom',
    addressTitle: 'Adresa',
    hoursTitle: 'Radno vrijeme',
    hoursNote:
      'Preuzimanje izvan radnog vremena je moguće uz prethodni dogovor.',
    formTitle: 'Pošaljite upit',
    formNote:
      'Odgovaramo u toku radnog vremena. Upit ne obavezuje ni na šta.',
    name: 'Ime i prezime',
    namePlaceholder: 'Vaše ime',
    phone: 'Telefon',
    phonePlaceholder: '061 000 000',
    pickup: 'Mjesto preuzimanja',
    pickupPlaceholder: 'Bihać, hotel, aerodrom…',
    message: 'Poruka',
    messagePlaceholder:
      'Termin najma, broj putnika, koliko prtljaga i planirate li izlazak iz zemlje.',
    submit: 'Pošalji upit',
    sending: 'Šaljem…',
    sent: 'Hvala — javljamo se uskoro.',
    errorRequired: 'Molimo unesite ime i broj telefona.',
    errorSend: 'Slanje nije uspjelo. Nazovite nas ili pišite na WhatsApp.',
    whatsappAlt: 'Radije na WhatsApp',
  },

  footer: {
    tagline:
      'Najam vozila u Bihaću — bez kreditne kartice, s depozitom koji se vraća.',
    navigation: 'Stranice',
    contact: 'Kontakt',
    followUs: 'Pratite nas',
    rights: 'Sva prava zadržana.',
    footerNav: 'Navigacija u podnožju',
    note:
      'Bihać nema aerodrom — vozilo dovozimo na vašu adresu, pred hotel ili na '
      + 'aerodrom u Zagrebu i Zadru.',
  },

  whatsappFab: 'WhatsApp',
  callFab: 'Nazovi',
  hours: 'Ponedjeljak – subota, 08:00 – 18:00',
  hoursShort: '08:00 – 18:00',
  skipToContent: 'Preskoči na sadržaj',
  breadcrumbHome: 'Početna',
}

import type { FleetCar, Locale } from '~/i18n/types'

/*
 * Copy for /vozila and /vozila/[slug].
 *
 * `audience` is the only genuinely per-car prose, and it is the reason these
 * eleven pages are not eleven clones of a template: it says who the car suits
 * and, where it matters, who it does not. Everything else on the page is
 * specification, and that comes from ~/data/business and ~/data/pricing.
 *
 * Titles and descriptions are composed rather than hand-written per car. In
 * four languages that would be forty-four metas to keep in sync with the fleet;
 * a composed pattern carrying the model, the colour and the category stays
 * accurate on its own.
 *
 * Note the two Rapid Spacebacks. They are the same model in two colours, so
 * their pages would otherwise be duplicates competing with each other. The
 * copy pulls them apart by the job rather than by the paint: one is written for
 * a longer, cheaper rental and the other for short city hires. Both statements
 * are true of the car; which one leads is an editorial choice, not a claim.
 *
 * Claims policy: no model year appears anywhere, and the prose below never
 * states a seat count — that comes from ~/data/business instead.
 */

export interface VehicleLabels {
  indexMetaTitle: string
  indexMetaDescription: string
  indexH1: string
  indexIntro: string
  breadcrumbAll: string
  metaTitle: (car: FleetCar) => string
  metaDescription: (car: FleetCar) => string
  audienceTitle: string
  specsTitle: string
  equipmentTitle: string
  priceTitle: string
  priceIntro: string
  priceCta: string
  similarTitle: string
  viewCar: string
  spec: {
    generation: string
    colour: string
    transmission: string
    seats: string
    category: string
    automatic: string
    manual: string
    unknown: string
  }
  cta: { title: string, body: string }
  /* Keyed by FleetCar.id */
  audience: Record<string, string>
}

export const VEHICLE_COPY: Record<Locale, VehicleLabels> = {
  bs: {
    indexMetaTitle: 'Vozila | Rent a Car Gogo Bihać',
    indexMetaDescription:
      'Jedanaest vozila za najam u Bihaću — gradski auti, karavani, SUV-ovi i '
      + 'kombiji. Depozit 400 KM, bez kreditne kartice, dostava na adresu.',
    indexH1: 'Naša vozila',
    indexIntro:
      'Svaki auto je slikan ispred naše kancelarije u Bihaću. Odaberite po '
      + 'namjeni ili nam javite broj putnika i količinu prtljaga — predložit ćemo.',
    breadcrumbAll: 'Vozila',
    metaTitle: car => `${car.name} (${car.colour}) — najam u Bihaću | Rent a Car Gogo`,
    metaDescription: car =>
      `Najam vozila ${car.name} u Bihaću. Depozit 400 KM i vraća se u cijelosti, `
      + 'bez kreditne kartice. Dostava na adresu, hotel ili aerodrom.',
    audienceTitle: 'Kome odgovara',
    specsTitle: 'Podaci o vozilu',
    equipmentTitle: 'Za šta je dobro',
    priceTitle: 'Cijena',
    priceIntro:
      'Cijenu računamo prema terminu i dužini najma, pa je dobijete kao ukupan '
      + 'iznos, a ne kao dnevnu cijenu na koju se kasnije nešto dodaje.',
    priceCta: 'Zatraži cijenu',
    similarTitle: 'Slična vozila',
    viewCar: 'Pogledaj vozilo',
    spec: {
      generation: 'Generacija',
      colour: 'Boja',
      transmission: 'Mjenjač',
      seats: 'Sjedišta',
      category: 'Kategorija',
      automatic: 'Automatik',
      manual: 'Manuelni',
      unknown: 'Na upit',
    },
    cta: {
      title: 'Provjerite da li je slobodan',
      body:
        'Javite termin i broj putnika. Odgovaramo u toku radnog vremena, s '
        + 'cijenom i potvrdom dostupnosti.',
    },
    audience: {
      'octavia-limuzina':
        'Naš najprostraniji sedan i ono što najčešće damo kada je put duži od '
        + 'sat vremena. Mirna je na autocesti prema Zagrebu, prtljažnik guta '
        + 'kofere za četvero, a unutrašnjost je dovoljno ozbiljna da se s njom '
        + 'dođe na poslovni sastanak.',
      'octavia-combi':
        'Ista logika kao limuzina, ali s krovom koji ide do kraja. Uzmite je '
        + 'kada prtljag ne staje u obični prtljažnik — oprema za rafting, '
        + 'bicikla, selidba u malom ili porodica koja putuje na dvije sedmice, '
        + 'a ne na vikend.',
      'proace-verso':
        'Za grupu koja bi inače morala uzeti dva auta. Visok je, ulazi se '
        + 'uspravno, i putnici u trećem redu ne sjede u kazni. Najčešće ide na '
        + 'transfere s aerodroma i na porodična putovanja gdje se pored ljudi '
        + 'vozi i sav njihov prtljag.',
      'golf-gti':
        'Jedini auto u floti koji se ne uzima zbog prostora. Ako vam je put '
        + 'zadovoljstvo, a ne obaveza — vikend na Uni, izlazak, ili '
        + 'jednostavno želite da vas vožnja zabavi — ovo je taj. Za pet ljudi s '
        + 'koferima uzmite nešto drugo.',
      'rapid-crni':
        'Najjeftiniji način da imate auto duže vrijeme. Troši malo, '
        + 'prtljažnik je iznenađujuće dubok za ovu klasu, i ništa na njemu nije '
        + 'suvišno. Uzimaju ga ljudi kojima auto treba sedmicu ili mjesec, ne '
        + 'jedan dan.',
      frontera:
        'Viša pozicija sjedenja bez veličine pravog SUV-a. Dobra kombinacija '
        + 'ako vozite po gradu i okolnim putevima, a ne volite da sjedite '
        + 'nisko — ulazi se lako, a parkira se kao gradski auto.',
      vivaro:
        'Kombi za grupe i prtljag, i naš izbor za duže transfere. Prostor iza '
        + 'zadnjeg reda je ono što ga razlikuje od putničkog auta: možete '
        + 'natovariti i ljude i sve što nose, bez slaganja tetrisa.',
      'rapid-crveni':
        'Isti auto kao crni Rapid, ali ovaj najčešće ide na kratke najmove — '
        + 'dan-dva, po gradu i okolini. Uzak je taman koliko treba za bihaćke '
        + 'ulice i parkira se svugdje, a potrošnja je takva da tank traje '
        + 'duže nego što očekujete.',
      corsa:
        'Najmanji auto koji imamo i najlakši za nekoga ko ne poznaje grad. '
        + 'Pregledan je, kratak, i parkiranje u centru s njim nije tema. Za '
        + 'jednu ili dvije osobe s ručnim prtljagom — savršeno; za četvero s '
        + 'koferima — uzmite karavan.',
      'leon-st':
        'Karavan koji vozi kao obični auto. Dobar kompromis kada vam treba '
        + 'prostor Octavije Combi, a želite nešto živahnije pod nogom. Često ga '
        + 'uzimaju za put na more, jer prtljažnik primi i kofere i opremu.',
      kamiq:
        'Gradski crossover — viši od hatchbacka, manji od SUV-a. Najlakši '
        + 'izbor ako vozite i po gradu i po makadamu prema Uni, a ne želite '
        + 'veliki auto. Preglednost s više pozicije primijetite već na prvom '
        + 'kružnom toku.',
    },
  },

  de: {
    indexMetaTitle: 'Fahrzeuge | Rent a Car Gogo Bihać',
    indexMetaDescription:
      'Elf Mietfahrzeuge in Bihać — Stadtautos, Kombis, SUVs und Kleinbusse. '
      + 'Kaution 400 KM, ohne Kreditkarte, Lieferung an Ihre Adresse.',
    indexH1: 'Unsere Fahrzeuge',
    indexIntro:
      'Jedes Auto wurde vor unserem Büro in Bihać fotografiert. Wählen Sie nach '
      + 'Einsatzzweck, oder nennen Sie uns Personenzahl und Gepäck — wir '
      + 'schlagen etwas vor.',
    breadcrumbAll: 'Fahrzeuge',
    metaTitle: car => `${car.name} (${car.colour}) mieten in Bihać | Rent a Car Gogo`,
    metaDescription: car =>
      `${car.name} mieten in Bihać. Kaution 400 KM, vollständig erstattet, ohne `
      + 'Kreditkarte. Lieferung an Adresse, Hotel oder Flughafen.',
    audienceTitle: 'Für wen geeignet',
    specsTitle: 'Fahrzeugdaten',
    equipmentTitle: 'Wofür es taugt',
    priceTitle: 'Preis',
    priceIntro:
      'Den Preis berechnen wir nach Zeitraum und Mietdauer, und Sie bekommen '
      + 'ihn als Gesamtbetrag — nicht als Tagespreis, zu dem später etwas '
      + 'hinzukommt.',
    priceCta: 'Preis anfragen',
    similarTitle: 'Ähnliche Fahrzeuge',
    viewCar: 'Fahrzeug ansehen',
    spec: {
      generation: 'Generation',
      colour: 'Farbe',
      transmission: 'Getriebe',
      seats: 'Sitze',
      category: 'Kategorie',
      automatic: 'Automatik',
      manual: 'Schaltgetriebe',
      unknown: 'Auf Anfrage',
    },
    cta: {
      title: 'Verfügbarkeit prüfen',
      body:
        'Nennen Sie Zeitraum und Personenzahl. Wir antworten während der '
        + 'Öffnungszeiten mit Preis und Verfügbarkeit.',
    },
    audience: {
      'octavia-limuzina':
        'Unsere geräumigste Limousine und das, was wir am häufigsten '
        + 'herausgeben, wenn die Fahrt länger als eine Stunde dauert. Ruhig auf '
        + 'der Autobahn Richtung Zagreb, der Kofferraum schluckt Gepäck für '
        + 'vier, und innen ist sie seriös genug für einen Geschäftstermin.',
      'octavia-combi':
        'Dieselbe Idee wie die Limousine, nur mit Dach bis hinten. Nehmen Sie '
        + 'ihn, wenn das Gepäck in einen normalen Kofferraum nicht passt — '
        + 'Raftingausrüstung, Fahrräder, ein kleiner Umzug, oder eine Familie, '
        + 'die zwei Wochen und nicht ein Wochenende verreist.',
      'proace-verso':
        'Für Gruppen, die sonst zwei Autos nehmen müssten. Hoch gebaut, man '
        + 'steigt aufrecht ein, und in der dritten Reihe sitzt niemand zur '
        + 'Strafe. Meistens im Einsatz für Flughafentransfers und '
        + 'Familienreisen, bei denen neben den Leuten auch alles Gepäck mitfährt.',
      'golf-gti':
        'Das einzige Auto im Fuhrpark, das man nicht wegen des Platzes nimmt. '
        + 'Wenn die Fahrt Vergnügen ist und nicht Pflicht — ein Wochenende an '
        + 'der Una, ein Abend in der Stadt — dann dieses. Für fünf Personen mit '
        + 'Koffern nehmen Sie etwas anderes.',
      'rapid-crni':
        'Der günstigste Weg, längere Zeit ein Auto zu haben. Sparsam, ein für '
        + 'die Klasse überraschend tiefer Kofferraum, und nichts Überflüssiges '
        + 'daran. Ihn nehmen Leute, die ein Auto für eine Woche oder einen Monat '
        + 'brauchen, nicht für einen Tag.',
      frontera:
        'Erhöhte Sitzposition ohne die Größe eines echten SUV. Eine gute '
        + 'Kombination, wenn Sie in der Stadt und auf den Straßen drumherum '
        + 'unterwegs sind und nicht tief sitzen möchten — leichter Einstieg, '
        + 'parkt wie ein Stadtauto.',
      vivaro:
        'Kleinbus für Gruppen und Gepäck, und unsere Wahl für längere '
        + 'Transfers. Der Raum hinter der letzten Reihe unterscheidet ihn vom '
        + 'Pkw: Sie laden Menschen und alles, was sie dabeihaben, ohne Tetris '
        + 'zu spielen.',
      'rapid-crveni':
        'Dasselbe Auto wie der schwarze Rapid, aber dieser geht meist in kurze '
        + 'Mieten — ein, zwei Tage, Stadt und Umgebung. Schmal genug für die '
        + 'Straßen von Bihać, überall zu parken, und der Verbrauch ist so, dass '
        + 'eine Tankfüllung länger hält als erwartet.',
      corsa:
        'Das kleinste Auto, das wir haben, und das einfachste für jemanden, '
        + 'der die Stadt nicht kennt. Übersichtlich, kurz, Parken im Zentrum ist '
        + 'kein Thema. Für ein bis zwei Personen mit Handgepäck perfekt; für '
        + 'vier mit Koffern nehmen Sie den Kombi.',
      'leon-st':
        'Ein Kombi, der sich wie ein normales Auto fährt. Ein guter Kompromiss, '
        + 'wenn Sie den Platz des Octavia Combi brauchen, aber etwas '
        + 'Spritzigeres wollen. Wird oft für die Fahrt ans Meer genommen, weil '
        + 'der Kofferraum Koffer und Ausrüstung zugleich fasst.',
      kamiq:
        'Stadt-Crossover — höher als ein Kompakter, kleiner als ein SUV. Die '
        + 'einfachste Wahl, wenn Sie in der Stadt und auf Schotterwegen Richtung '
        + 'Una fahren und kein großes Auto wollen. Die bessere Übersicht merken '
        + 'Sie schon im ersten Kreisverkehr.',
    },
  },

  en: {
    indexMetaTitle: 'Cars | Rent a Car Gogo Bihać',
    indexMetaDescription:
      'Eleven cars for hire in Bihać — city cars, estates, SUVs and minibuses. '
      + '400 KM deposit, no credit card, delivery to your address.',
    indexH1: 'Our cars',
    indexIntro:
      'Every car here was photographed outside our office in Bihać. Pick by what '
      + 'you need it for, or tell us how many people and how much luggage and we '
      + 'will suggest one.',
    breadcrumbAll: 'Cars',
    metaTitle: car => `${car.name} (${car.colour}) hire in Bihać | Rent a Car Gogo`,
    metaDescription: car =>
      `Hire a ${car.name} in Bihać. 400 KM deposit refunded in full, no credit `
      + 'card needed. Delivery to your address, hotel or airport.',
    audienceTitle: 'Who it suits',
    specsTitle: 'Vehicle details',
    equipmentTitle: 'What it is good for',
    priceTitle: 'Price',
    priceIntro:
      'We work the price out from your dates and how long you need it, and you '
      + 'get it as a total — not a daily rate that grows later.',
    priceCta: 'Ask for a price',
    similarTitle: 'Similar cars',
    viewCar: 'View car',
    spec: {
      generation: 'Generation',
      colour: 'Colour',
      transmission: 'Transmission',
      seats: 'Seats',
      category: 'Category',
      automatic: 'Automatic',
      manual: 'Manual',
      unknown: 'On request',
    },
    cta: {
      title: 'Check whether it is free',
      body:
        'Send your dates and passenger count. We reply during opening hours with '
        + 'a price and confirmation.',
    },
    audience: {
      'octavia-limuzina':
        'Our roomiest saloon and the one we hand over most when the drive is '
        + 'longer than an hour. Settled on the motorway towards Zagreb, a boot '
        + 'that swallows luggage for four, and an interior serious enough to '
        + 'arrive at a meeting in.',
      'octavia-combi':
        'The same idea as the saloon, with the roof carried all the way back. '
        + 'Take it when the luggage will not go in an ordinary boot — rafting '
        + 'kit, bikes, a small move, or a family travelling for a fortnight '
        + 'rather than a weekend.',
      'proace-verso':
        'For the group that would otherwise need two cars. Tall enough to step '
        + 'into rather than drop into, and nobody in the third row is being '
        + 'punished. Mostly out on airport transfers and family trips where the '
        + 'luggage travels with the people.',
      'golf-gti':
        'The only car in the fleet nobody takes for the space. If the drive is '
        + 'the point rather than the chore — a weekend on the Una, a night out, '
        + 'or you simply want the road to be fun — this is the one. For five '
        + 'people with suitcases, take something else.',
      'rapid-crni':
        'The cheapest way to have a car for a while. Light on fuel, a boot '
        + 'surprisingly deep for the class, and nothing on it you are paying for '
        + 'twice. Taken by people who need a car for a week or a month, not for '
        + 'a day.',
      frontera:
        'A raised seating position without the bulk of a real SUV. A good '
        + 'combination if you are driving in town and on the roads around it and '
        + 'would rather not sit low — easy to get into, parks like a city car.',
      vivaro:
        'A minibus for groups and luggage, and our choice for longer transfers. '
        + 'The space behind the last row is what separates it from a car: you '
        + 'can load the people and everything they brought without playing '
        + 'Tetris.',
      'rapid-crveni':
        'The same car as the black Rapid, but this one mostly goes out on short '
        + 'hires — a day or two, around town and nearby. Narrow enough for the '
        + 'streets of Bihać, parks anywhere, and it uses so little that a tank '
        + 'lasts longer than you expect.',
      corsa:
        'The smallest car we have and the easiest for someone who does not know '
        + 'the town. Short, easy to see out of, and parking in the centre stops '
        + 'being a subject. Ideal for one or two people with hand luggage; for '
        + 'four with suitcases, take the estate.',
      'leon-st':
        'An estate that drives like an ordinary car. A good compromise when you '
        + 'want the space of the Octavia Combi but something livelier underfoot. '
        + 'Often taken for the drive to the coast, because the boot takes the '
        + 'cases and the kit at once.',
      kamiq:
        'A city crossover — taller than a hatchback, smaller than an SUV. The '
        + 'easiest choice if you are driving both in town and on the gravel '
        + 'towards the Una and do not want a big car. You notice the visibility '
        + 'from the higher seat at the first roundabout.',
    },
  },

  ar: {
    indexMetaTitle: 'السيارات | Rent a Car Gogo بيهاتش',
    indexMetaDescription:
      'إحدى عشرة سيارة للإيجار في بيهاتش — سيارات مدينة وستيشن ودفع رباعي '
      + 'وميني باص. تأمين 400 مارك، بدون بطاقة ائتمان، وتوصيل إلى عنوانك.',
    indexH1: 'سياراتنا',
    indexIntro:
      'كل سيارة هنا صُوِّرت أمام مكتبنا في بيهاتش. اختر حسب حاجتك، أو أخبرنا '
      + 'بعدد الركاب وحجم الأمتعة وسنقترح عليك.',
    breadcrumbAll: 'السيارات',
    metaTitle: car => `تأجير ${car.name} في بيهاتش | Rent a Car Gogo`,
    metaDescription: car =>
      `تأجير ${car.name} في بيهاتش. تأمين 400 مارك يُعاد بالكامل، وبدون بطاقة `
      + 'ائتمان. توصيل إلى عنوانك أو فندقك أو المطار.',
    audienceTitle: 'لمن تناسب',
    specsTitle: 'بيانات السيارة',
    equipmentTitle: 'فيمَ تصلح',
    priceTitle: 'السعر',
    priceIntro:
      'نحسب السعر حسب التواريخ ومدة الإيجار، وتحصل عليه كمبلغ إجمالي — لا كسعر '
      + 'يومي يُضاف إليه شيء لاحقاً.',
    priceCta: 'اطلب السعر',
    similarTitle: 'سيارات مشابهة',
    viewCar: 'عرض السيارة',
    spec: {
      generation: 'الجيل',
      colour: 'اللون',
      transmission: 'ناقل الحركة',
      seats: 'المقاعد',
      category: 'الفئة',
      automatic: 'أوتوماتيك',
      manual: 'عادي',
      unknown: 'عند الطلب',
    },
    cta: {
      title: 'تحقق من توفرها',
      body:
        'أرسل التواريخ وعدد الركاب. نرد خلال ساعات العمل بالسعر وتأكيد التوفر.',
    },
    audience: {
      'octavia-limuzina':
        'أوسع سيارة سيدان لدينا، وما نسلّمه غالباً عندما تتجاوز الرحلة الساعة. '
        + 'هادئة على الطريق السريع نحو زغرب، وصندوقها يستوعب أمتعة أربعة أشخاص، '
        + 'وداخلها جادّ بما يكفي للوصول به إلى اجتماع عمل.',
      'octavia-combi':
        'الفكرة نفسها كالسيدان لكن بسقف يمتد حتى النهاية. خذها حين لا تتسع '
        + 'الأمتعة في صندوق عادي — معدات رحلات، دراجات، نقل بسيط، أو عائلة '
        + 'مسافرة أسبوعين لا عطلة نهاية أسبوع.',
      'proace-verso':
        'للمجموعة التي كانت ستحتاج سيارتين. عالية، تدخلها واقفاً، ولا أحد في '
        + 'الصف الثالث يجلس عقاباً. تخرج غالباً في التنقلات من المطار والرحلات '
        + 'العائلية حيث تسافر الأمتعة مع الركاب.',
      'golf-gti':
        'السيارة الوحيدة في الأسطول التي لا تُؤخذ من أجل المساحة. إن كانت '
        + 'الرحلة متعة لا واجباً — عطلة على نهر أونا أو سهرة في المدينة — فهي '
        + 'هذه. أما لخمسة أشخاص بحقائب فاختر غيرها.',
      'rapid-crni':
        'أرخص طريقة لامتلاك سيارة لفترة أطول. استهلاك قليل، وصندوق عميق بشكل '
        + 'مفاجئ لهذه الفئة، وبلا زوائد. يأخذها من يحتاج سيارة لأسبوع أو شهر لا '
        + 'ليوم واحد.',
      frontera:
        'وضعية جلوس مرتفعة بلا حجم سيارة الدفع الرباعي الحقيقية. مزيج جيد إن '
        + 'كنت تقود في المدينة وعلى الطرق المحيطة ولا تحب الجلوس المنخفض — سهلة '
        + 'الدخول وتُركن كسيارة مدينة.',
      vivaro:
        'ميني باص للمجموعات والأمتعة، وخيارنا للتنقلات الطويلة. المساحة خلف '
        + 'الصف الأخير هي ما يميّزها عن السيارة العادية: تحمّل الركاب وكل ما '
        + 'يحملونه دون ترتيب معقّد.',
      'rapid-crveni':
        'السيارة نفسها كالـRapid الأسود، لكن هذه تخرج غالباً في إيجارات قصيرة '
        + '— يوم أو يومان، في المدينة وما حولها. ضيّقة بما يناسب شوارع بيهاتش، '
        + 'وتُركن في أي مكان، واستهلاكها يجعل خزان الوقود يدوم أطول مما تتوقع.',
      corsa:
        'أصغر سيارة لدينا وأسهلها على من لا يعرف المدينة. قصيرة وواضحة الرؤية، '
        + 'والركن في المركز لا يعود مشكلة. مثالية لشخص أو شخصين بأمتعة يدوية؛ '
        + 'أما لأربعة بحقائب فخذ الستيشن.',
      'leon-st':
        'ستيشن تُقاد كسيارة عادية. حل وسط جيد إن أردت مساحة الأوكتافيا كومبي مع '
        + 'شيء أكثر حيوية. تُؤخذ كثيراً للسفر إلى البحر، لأن صندوقها يتسع '
        + 'للحقائب والمعدات معاً.',
      kamiq:
        'كروس أوفر للمدينة — أعلى من الهاتشباك وأصغر من الدفع الرباعي. أسهل '
        + 'اختيار إن كنت تقود في المدينة وعلى الطرق الترابية نحو أونا ولا تريد '
        + 'سيارة كبيرة. ستلاحظ وضوح الرؤية من المقعد الأعلى عند أول دوار.',
    },
  },
}

import type { Locale } from '~/i18n/types'

/*
 * Copy for /najam-sa-vozacem.
 *
 * The least contested thing this business offers. Most agencies in the canton
 * rent self-drive only, and almost none of them rank for "sa vozačem". The page
 * is built around the three jobs a driver actually gets hired for — the airport
 * run, the business day, the excursion — rather than around the word
 * "chauffeur", which nobody in this market searches for.
 *
 * The airport run is the anchor. Bihać has no airport, so somebody is making
 * the two-and-a-half-hour drive to Zagreb or Zadar either way; the only
 * question is whether it is the customer, jet-lagged, on the wrong side of a
 * border, in a car they have never driven.
 *
 * Distances are road distances from the office, rounded. Durations are given as
 * ranges on purpose: the Zagreb road in August and the Plitvice road in
 * February do not run to a single number, and a border queue is not a number
 * at all.
 *
 * Claims policy: prices are on request throughout — driverDay is null in
 * ~/data/pricing and no per-route rate has been supplied. Passenger counts say
 * "our minibuses" rather than a seat number, because seats are null on both
 * people carriers until the client confirms them. Bosnian copy uses "Vi".
 */

export interface DriverTrip {
  name: string
  distanceKm: number
  duration: string
  body: string
}

export interface DriverCopy {
  metaTitle: string
  metaDescription: string
  breadcrumb: string
  h1: string
  intro: string
  services: {
    title: string
    intro: string
    items: { title: string, body: string, points: string[] }[]
  }
  trips: {
    title: string
    intro: string
    items: DriverTrip[]
    distanceLabel: string
    durationLabel: string
  }
  pricing: { title: string, paragraphs: string[], onRequest: string }
  why: { title: string, items: string[] }
  faq: { title: string, items: { q: string, a: string }[] }
  cta: { title: string, body: string }
}

export const DRIVER_COPY: Record<Locale, DriverCopy> = {
  bs: {
    metaTitle: 'Najam auta sa vozačem Bihać — transferi i izleti | Gogo',
    metaDescription:
      'Vozilo s vozačem iz Bihaća: transferi s aerodroma Zagreb i Zadar, '
      + 'poslovni angažmani i izleti na Plitvice i Nacionalni park Una.',
    breadcrumb: 'Sa vozačem',
    h1: 'Najam vozila s vozačem u Bihaću',
    intro:
      'Iz Bihaća se do najbližeg aerodroma vozi dva i po sata, preko granice. '
      + 'Neko taj put vozi u svakom slučaju — pitanje je samo hoćete li to biti '
      + 'vi, nakon leta, u autu koji vam nije poznat. Kada nije, imamo vozača.',
    services: {
      title: 'Tri stvari zbog kojih se uzima vozač',
      intro:
        'Sve tri su moguće i s našim vozilima bez vozača. Ovdje je razlika u '
        + 'tome što ne morate razmišljati ni o putu ni o parkingu ni o granici.',
      items: [
        {
          title: 'Transfer s aerodroma',
          body:
            'Najčešći razlog. Sletite u Zagreb ili Zadar, a mi vas čekamo s '
            + 'imenom na papiru i vozimo do Bihaća ili gdje god idete.',
          points: [
            'Pratimo broj leta i čekamo ako kasni',
            'Pomoć s prtljagom i djecom',
            'Naši kombiji za grupe koje putuju zajedno',
            'Isti dogovor i za povratak na aerodrom',
          ],
        },
        {
          title: 'Poslovni angažman',
          body:
            'Cjelodnevni najam kada imate obaveze u više mjesta, a ne želite '
            + 'trošiti dan na vožnju i traženje parkinga.',
          points: [
            'Vozač čeka između sastanaka',
            'Više odredišta u jednom danu',
            'Dolazak na adresu u dogovoreno vrijeme',
            'Diskrecija — vozač ne komentariše šta je čuo',
          ],
        },
        {
          title: 'Izlet',
          body:
            'Plitvice, Štrbački buk, put prema moru. Uzimate vozača kada želite '
            + 'gledati kroz prozor umjesto u cestu.',
          points: [
            'Plitvička jezera i Nacionalni park Una',
            'Stajanja gdje god poželite',
            'Vozač poznaje terene i granične prelaze',
            'Povratak istog dana ili višednevno, po dogovoru',
          ],
        },
      ],
    },
    trips: {
      title: 'Najčešće rute iz Bihaća',
      intro:
        'Udaljenosti su cestovne, od naše kancelarije. Trajanja su rasponi jer '
        + 'zavise od sezone i, gdje je granica, od zadržavanja na prelazu.',
      distanceLabel: 'Udaljenost',
      durationLabel: 'Trajanje',
      items: [
        {
          name: 'Aerodrom Zagreb',
          distanceKm: 165,
          duration: '2 h 30 – 3 h',
          body:
            'Najviše letova iz Njemačke, Austrije i Švicarske, pa i najčešći '
            + 'transfer koji vozimo. Ide se preko prelaza Izačić.',
        },
        {
          name: 'Aerodrom Zadar',
          distanceKm: 150,
          duration: '2 h 15 – 2 h 45',
          body:
            'Nešto bliži od Zagreba i obično jeftiniji za niskotarifne letove. '
            + 'Put ide kroz Liku i ljeti zna biti sporiji.',
        },
        {
          name: 'Plitvička jezera',
          distanceKm: 35,
          duration: '50 min – 1 h 15',
          body:
            'Jednodnevni izlet. Vozač vas ostavi na ulazu i čeka, pa ne morate '
            + 'tražiti parking ni se vraćati u isto vrijeme kad i svi ostali.',
        },
        {
          name: 'Štrbački buk, NP Una',
          distanceKm: 40,
          duration: '45 min – 1 h',
          body:
            'Zadnjih nekoliko kilometara je makadam. S vozačem ne morate '
            + 'razmišljati o tome kojim autom se tuda prolazi.',
        },
        {
          name: 'Banja Luka',
          distanceKm: 155,
          duration: '2 h 30 – 3 h',
          body:
            'Poslovna ruta, cijelim putem kroz Bosnu i Hercegovinu, bez '
            + 'graničnih formalnosti.',
        },
        {
          name: 'Split',
          distanceKm: 275,
          duration: '3 h 30 – 4 h 30',
          body:
            'Dugi transfer prema moru. Za ovakav put dogovor se pravi ranije, '
            + 'zbog rasporeda vozača.',
        },
      ],
    },
    pricing: {
      title: 'Cijena',
      paragraphs: [
        'Vožnja s vozačem se računa po ruti ili po danu, zavisno od toga šta '
        + 'vam treba. Transfer na aerodrom je ruta; dan pun sastanaka je dan.',
        'Ukupan iznos dogovaramo prije nego što išta potvrdite, i u njemu je '
        + 'sve — vozilo, vozač, gorivo i putarine na dogovorenoj ruti. Nema '
        + 'stavki koje se pojave na kraju.',
        'Za tačnu cijenu javite rutu, datum i broj putnika.',
      ],
      onRequest: 'Na upit',
    },
    why: {
      title: 'Zašto s vozačem',
      items: [
        'Ne vozite nakon leta i ne tražite put u mraku',
        'Bez parkinga, bez granice, bez tuđih saobraćajnih pravila',
        'Vozač poznaje ceste kojima ide i prelaze na kojima staje',
        'Za grupu je jedno vozilo umjesto dva auta u koloni',
        'Prtljag ide s vama, ne u drugom autu',
      ],
    },
    faq: {
      title: 'Pitanja o vožnji s vozačem',
      items: [
        {
          q: 'Koliko unaprijed treba rezervisati?',
          a:
            'Što ranije, posebno ljeti i za duže rute. Vozač i vozilo se '
            + 'raspoređuju na cijeli dan, pa transfer za sutra nije uvijek '
            + 'moguć. Za let koji već znate — javite odmah.',
        },
        {
          q: 'Čekate li ako let kasni?',
          a:
            'Da. Ostavite broj leta pri rezervaciji i pratimo ga. Kašnjenje '
            + 'leta nije vaš trošak dogovaranja u zadnji čas.',
        },
        {
          q: 'Koliko nas može ići u jednom vozilu?',
          a:
            'Za veće grupe idu naši kombiji. Javite tačan broj putnika i '
            + 'količinu prtljaga pri upitu i potvrdit ćemo koje vozilo ide.',
        },
        {
          q: 'Je li cijena po osobi ili po vozilu?',
          a:
            'Po vozilu i ruti, ne po osobi. Za grupu je to obično jeftinije '
            + 'nego bilo koja alternativa.',
        },
      ],
    },
    cta: {
      title: 'Javite rutu i datum',
      body:
        'Odgovaramo s cijenom, vozilom i vremenom polaska. Bez obaveze i bez '
        + 'plaćanja unaprijed.',
    },
  },

  de: {
    metaTitle: 'Mietwagen mit Fahrer in Bihać — Transfers und Ausflüge | Gogo',
    metaDescription:
      'Fahrzeug mit Fahrer ab Bihać: Transfers von den Flughäfen Zagreb und '
      + 'Zadar, Geschäftstermine und Ausflüge nach Plitvice und zum Nationalpark Una.',
    breadcrumb: 'Mit Fahrer',
    h1: 'Mietwagen mit Fahrer in Bihać',
    intro:
      'Von Bihać zum nächsten Flughafen sind es zweieinhalb Stunden, über die '
      + 'Grenze. Diese Strecke fährt ohnehin jemand — die Frage ist nur, ob Sie '
      + 'es sind, nach dem Flug, in einem Auto, das Sie nicht kennen. Wenn '
      + 'nicht, haben wir einen Fahrer.',
    services: {
      title: 'Drei Gründe, einen Fahrer zu nehmen',
      intro:
        'Alle drei gehen auch mit unseren Fahrzeugen ohne Fahrer. Der '
        + 'Unterschied ist, dass Sie sich weder um die Strecke noch ums Parken '
        + 'noch um die Grenze kümmern müssen.',
      items: [
        {
          title: 'Flughafentransfer',
          body:
            'Der häufigste Fall. Sie landen in Zagreb oder Zadar, wir warten mit '
            + 'Ihrem Namen auf dem Schild und fahren Sie nach Bihać oder wohin '
            + 'Sie möchten.',
          points: [
            'Wir verfolgen die Flugnummer und warten bei Verspätung',
            'Hilfe mit Gepäck und Kindern',
            'Unsere Kleinbusse für Gruppen, die zusammen reisen',
            'Dieselbe Vereinbarung für die Rückfahrt',
          ],
        },
        {
          title: 'Geschäftstermine',
          body:
            'Tagesbuchung, wenn Sie an mehreren Orten Termine haben und den Tag '
            + 'nicht mit Fahren und Parkplatzsuche verbringen möchten.',
          points: [
            'Der Fahrer wartet zwischen den Terminen',
            'Mehrere Ziele an einem Tag',
            'Abholung an der Adresse zur vereinbarten Zeit',
            'Diskretion — der Fahrer kommentiert nicht, was er hört',
          ],
        },
        {
          title: 'Ausflug',
          body:
            'Plitvice, Štrbački buk, die Straße ans Meer. Einen Fahrer nimmt '
            + 'man, wenn man aus dem Fenster schauen will statt auf die Straße.',
          points: [
            'Plitvicer Seen und Nationalpark Una',
            'Halt, wo immer Sie möchten',
            'Der Fahrer kennt Gelände und Grenzübergänge',
            'Rückkehr am selben Tag oder mehrtägig, nach Absprache',
          ],
        },
      ],
    },
    trips: {
      title: 'Die häufigsten Strecken ab Bihać',
      intro:
        'Die Entfernungen sind Straßenkilometer ab unserem Büro. Die Dauer ist '
        + 'als Spanne angegeben, weil sie von der Saison abhängt und, wo eine '
        + 'Grenze liegt, von der Wartezeit am Übergang.',
      distanceLabel: 'Entfernung',
      durationLabel: 'Dauer',
      items: [
        {
          name: 'Flughafen Zagreb',
          distanceKm: 165,
          duration: '2 Std. 30 – 3 Std.',
          body:
            'Die meisten Verbindungen aus Deutschland, Österreich und der '
            + 'Schweiz, und damit unser häufigster Transfer. Über den Übergang '
            + 'Izačić.',
        },
        {
          name: 'Flughafen Zadar',
          distanceKm: 150,
          duration: '2 Std. 15 – 2 Std. 45',
          body:
            'Etwas näher als Zagreb und meist günstiger für Billigflüge. Die '
            + 'Strecke führt durch die Lika und ist im Sommer langsamer.',
        },
        {
          name: 'Plitvicer Seen',
          distanceKm: 35,
          duration: '50 Min. – 1 Std. 15',
          body:
            'Tagesausflug. Der Fahrer setzt Sie am Eingang ab und wartet, Sie '
            + 'müssen also weder parken noch zur selben Zeit zurück wie alle '
            + 'anderen.',
        },
        {
          name: 'Štrbački buk, NP Una',
          distanceKm: 40,
          duration: '45 Min. – 1 Std.',
          body:
            'Die letzten Kilometer sind Schotter. Mit Fahrer müssen Sie nicht '
            + 'überlegen, mit welchem Auto man da durchkommt.',
        },
        {
          name: 'Banja Luka',
          distanceKm: 155,
          duration: '2 Std. 30 – 3 Std.',
          body:
            'Geschäftsstrecke, durchgehend innerhalb Bosnien und Herzegowinas, '
            + 'ohne Grenzformalitäten.',
        },
        {
          name: 'Split',
          distanceKm: 275,
          duration: '3 Std. 30 – 4 Std. 30',
          body:
            'Langer Transfer ans Meer. Für diese Strecke wird früher '
            + 'vereinbart, wegen der Fahrereinteilung.',
        },
      ],
    },
    pricing: {
      title: 'Preis',
      paragraphs: [
        'Die Fahrt mit Fahrer wird nach Strecke oder nach Tag berechnet, je '
        + 'nachdem was Sie brauchen. Ein Flughafentransfer ist eine Strecke, ein '
        + 'Tag voller Termine ist ein Tag.',
        'Den Gesamtbetrag vereinbaren wir, bevor Sie etwas zusagen, und darin '
        + 'ist alles enthalten — Fahrzeug, Fahrer, Kraftstoff und Maut auf der '
        + 'vereinbarten Strecke. Keine Posten, die am Ende auftauchen.',
        'Für einen genauen Preis nennen Sie Strecke, Datum und Personenzahl.',
      ],
      onRequest: 'Auf Anfrage',
    },
    why: {
      title: 'Warum mit Fahrer',
      items: [
        'Sie fahren nicht nach dem Flug und suchen nicht im Dunkeln',
        'Kein Parken, keine Grenze, keine fremden Verkehrsregeln',
        'Der Fahrer kennt die Strecken und die Übergänge',
        'Für eine Gruppe ein Fahrzeug statt zwei Autos im Konvoi',
        'Das Gepäck fährt mit Ihnen, nicht im zweiten Auto',
      ],
    },
    faq: {
      title: 'Fragen zur Fahrt mit Fahrer',
      items: [
        {
          q: 'Wie früh sollte man buchen?',
          a:
            'So früh wie möglich, besonders im Sommer und für längere Strecken. '
            + 'Fahrer und Fahrzeug werden für den ganzen Tag eingeteilt, ein '
            + 'Transfer für morgen ist also nicht immer möglich. Wenn Sie den '
            + 'Flug schon kennen — melden Sie sich gleich.',
        },
        {
          q: 'Warten Sie, wenn der Flug Verspätung hat?',
          a:
            'Ja. Geben Sie bei der Reservierung die Flugnummer an, wir verfolgen '
            + 'sie. Eine Flugverspätung kostet Sie keine Verhandlung in letzter '
            + 'Minute.',
        },
        {
          q: 'Wie viele Personen passen in ein Fahrzeug?',
          a:
            'Für größere Gruppen fahren unsere Kleinbusse. Nennen Sie bei der '
            + 'Anfrage die genaue Personenzahl und das Gepäck, dann bestätigen '
            + 'wir das Fahrzeug.',
        },
        {
          q: 'Gilt der Preis pro Person oder pro Fahrzeug?',
          a:
            'Pro Fahrzeug und Strecke, nicht pro Person. Für eine Gruppe ist das '
            + 'meist günstiger als jede Alternative.',
        },
      ],
    },
    cta: {
      title: 'Nennen Sie Strecke und Datum',
      body:
        'Wir antworten mit Preis, Fahrzeug und Abfahrtszeit. Unverbindlich und '
        + 'ohne Vorauszahlung.',
    },
  },

  en: {
    metaTitle: 'Car with a driver in Bihać — transfers and day trips | Gogo',
    metaDescription:
      'A car with a driver from Bihać: transfers from Zagreb and Zadar '
      + 'airports, business days, and trips to Plitvice and Una National Park.',
    breadcrumb: 'With a driver',
    h1: 'Car hire with a driver in Bihać',
    intro:
      'It is two and a half hours from Bihać to the nearest airport, across a '
      + 'border. Somebody drives that road either way — the only question is '
      + 'whether it is you, straight off a flight, in a car you have never '
      + 'driven. When it is not, we have a driver.',
    services: {
      title: 'Three reasons people take a driver',
      intro:
        'All three are possible in our cars without one. The difference is that '
        + 'you think about neither the route, nor the parking, nor the border.',
      items: [
        {
          title: 'Airport transfer',
          body:
            'The most common case. You land in Zagreb or Zadar, we are waiting '
            + 'with your name on a card, and we drive you to Bihać or wherever '
            + 'you are going.',
          points: [
            'We track the flight number and wait if it is late',
            'Help with luggage and children',
            'Our minibuses for groups travelling together',
            'The same arrangement for the return leg',
          ],
        },
        {
          title: 'A business day',
          body:
            'A full-day booking when you have commitments in several places and '
            + 'would rather not spend the day driving and hunting for parking.',
          points: [
            'The driver waits between meetings',
            'Several destinations in one day',
            'Collection from an address at an agreed time',
            'Discretion — the driver does not comment on what he hears',
          ],
        },
        {
          title: 'A day out',
          body:
            'Plitvice, Štrbački buk, the road to the coast. You take a driver '
            + 'when you want to look out of the window instead of at the road.',
          points: [
            'Plitvice Lakes and Una National Park',
            'Stops wherever you want them',
            'A driver who knows the terrain and the crossings',
            'Back the same day, or over several, by arrangement',
          ],
        },
      ],
    },
    trips: {
      title: 'The usual routes from Bihać',
      intro:
        'Distances are by road from our office. Durations are ranges because '
        + 'they depend on the season and, where there is a border, on the queue '
        + 'at the crossing.',
      distanceLabel: 'Distance',
      durationLabel: 'Duration',
      items: [
        {
          name: 'Zagreb airport',
          distanceKm: 165,
          duration: '2 h 30 – 3 h',
          body:
            'The most flights from Germany, Austria and Switzerland, and so the '
            + 'transfer we drive most often. Via the Izačić crossing.',
        },
        {
          name: 'Zadar airport',
          distanceKm: 150,
          duration: '2 h 15 – 2 h 45',
          body:
            'A little closer than Zagreb and usually cheaper for low-cost '
            + 'flights. The road runs through the Lika and is slower in summer.',
        },
        {
          name: 'Plitvice Lakes',
          distanceKm: 35,
          duration: '50 min – 1 h 15',
          body:
            'A day trip. The driver drops you at the entrance and waits, so you '
            + 'are neither looking for parking nor leaving at the same hour as '
            + 'everyone else.',
        },
        {
          name: 'Štrbački buk, Una NP',
          distanceKm: 40,
          duration: '45 min – 1 h',
          body:
            'The last few kilometres are gravel. With a driver you do not have '
            + 'to think about which car gets down there.',
        },
        {
          name: 'Banja Luka',
          distanceKm: 155,
          duration: '2 h 30 – 3 h',
          body:
            'A business route, entirely within Bosnia and Herzegovina, with no '
            + 'border formalities.',
        },
        {
          name: 'Split',
          distanceKm: 275,
          duration: '3 h 30 – 4 h 30',
          body:
            'A long transfer to the coast. This one is arranged further ahead, '
            + 'because of driver scheduling.',
        },
      ],
    },
    pricing: {
      title: 'Price',
      paragraphs: [
        'A journey with a driver is priced by route or by day, depending on what '
        + 'you need. An airport transfer is a route; a day full of meetings is a '
        + 'day.',
        'We agree the total before you confirm anything, and everything is in '
        + 'it — the car, the driver, fuel and tolls on the agreed route. Nothing '
        + 'turns up at the end.',
        'For an exact price, send the route, the date and the passenger count.',
      ],
      onRequest: 'On request',
    },
    why: {
      title: 'Why take a driver',
      items: [
        'You are not driving after a flight or finding the way in the dark',
        'No parking, no border, no unfamiliar traffic rules',
        'The driver knows the roads and the crossings',
        'For a group, one vehicle instead of two cars in convoy',
        'The luggage travels with you, not in the second car',
      ],
    },
    faq: {
      title: 'Questions about travelling with a driver',
      items: [
        {
          q: 'How far ahead should I book?',
          a:
            'As early as you can, especially in summer and for longer routes. A '
            + 'driver and a car are assigned for the whole day, so a transfer for '
            + 'tomorrow is not always possible. If you already know the flight, '
            + 'get in touch now.',
        },
        {
          q: 'Do you wait if the flight is late?',
          a:
            'Yes. Leave the flight number when you book and we track it. A '
            + 'delayed flight does not become a last-minute negotiation.',
        },
        {
          q: 'How many of us fit in one vehicle?',
          a:
            'For larger groups we use our minibuses. Give us the exact passenger '
            + 'count and the amount of luggage when you enquire and we will '
            + 'confirm which vehicle goes.',
        },
        {
          q: 'Is the price per person or per vehicle?',
          a:
            'Per vehicle and per route, not per person. For a group that is '
            + 'usually cheaper than any alternative.',
        },
      ],
    },
    cta: {
      title: 'Send the route and the date',
      body:
        'We reply with a price, a vehicle and a departure time. No obligation and '
        + 'nothing paid up front.',
    },
  },

  ar: {
    metaTitle: 'تأجير سيارة مع سائق في بيهاتش — تنقلات ورحلات | Gogo',
    metaDescription:
      'سيارة مع سائق من بيهاتش: تنقلات من مطاري زغرب وزادار، ومواعيد عمل، '
      + 'ورحلات إلى بليتفيتشه وحديقة أونا الوطنية.',
    breadcrumb: 'مع سائق',
    h1: 'تأجير سيارة مع سائق في بيهاتش',
    intro:
      'من بيهاتش إلى أقرب مطار ساعتان ونصف، وعبر الحدود. أحدهم سيقود هذا '
      + 'الطريق على أي حال — والسؤال فقط هل ستكون أنت، بعد رحلة طيران، في سيارة '
      + 'لم تقدها من قبل. وإن لم تكن، فلدينا سائق.',
    services: {
      title: 'ثلاثة أسباب لأخذ سائق',
      intro:
        'الثلاثة ممكنة بسياراتنا بدون سائق أيضاً. الفرق أنك لا تفكر لا في '
        + 'الطريق ولا في الركن ولا في الحدود.',
      items: [
        {
          title: 'التنقل من المطار',
          body:
            'الحالة الأكثر شيوعاً. تهبط في زغرب أو زادار، وننتظرك واسمك على '
            + 'لافتة، ونوصلك إلى بيهاتش أو حيث تشاء.',
          points: [
            'نتابع رقم الرحلة وننتظر عند التأخير',
            'مساعدة في الأمتعة ومع الأطفال',
            'حافلاتنا الصغيرة للمجموعات المسافرة معاً',
            'الترتيب نفسه لرحلة العودة',
          ],
        },
        {
          title: 'يوم عمل',
          body:
            'حجز ليوم كامل حين تكون لديك مواعيد في أماكن عدة ولا ترغب في قضاء '
            + 'اليوم في القيادة والبحث عن موقف.',
          points: [
            'السائق ينتظر بين المواعيد',
            'وجهات متعددة في يوم واحد',
            'الوصول إلى العنوان في الوقت المتفق عليه',
            'كتمان — السائق لا يعلّق على ما يسمع',
          ],
        },
        {
          title: 'رحلة',
          body:
            'بليتفيتشه، شتربَتشكي بوك، الطريق إلى البحر. تأخذ سائقاً حين تريد '
            + 'النظر من النافذة بدل النظر إلى الطريق.',
          points: [
            'بحيرات بليتفيتشه وحديقة أونا الوطنية',
            'توقف أينما أردت',
            'سائق يعرف التضاريس والمعابر الحدودية',
            'العودة في اليوم نفسه أو على عدة أيام، بالاتفاق',
          ],
        },
      ],
    },
    trips: {
      title: 'أكثر المسارات طلباً من بيهاتش',
      intro:
        'المسافات برية من مكتبنا. والمدد مذكورة كنطاقات لأنها تعتمد على الموسم، '
        + 'وحيث توجد حدود، على الانتظار عند المعبر.',
      distanceLabel: 'المسافة',
      durationLabel: 'المدة',
      items: [
        {
          name: 'مطار زغرب',
          distanceKm: 165,
          duration: '2:30 – 3:00',
          body:
            'أكثر الرحلات من ألمانيا والنمسا وسويسرا، وبالتالي أكثر تنقل '
            + 'نقوده. عبر معبر إيزاتشيتش.',
        },
        {
          name: 'مطار زادار',
          distanceKm: 150,
          duration: '2:15 – 2:45',
          body:
            'أقرب قليلاً من زغرب وأرخص عادةً لرحلات الطيران الاقتصادي. الطريق '
            + 'يمر عبر ليكا ويكون أبطأ صيفاً.',
        },
        {
          name: 'بحيرات بليتفيتشه',
          distanceKm: 35,
          duration: '50 د – 1:15',
          body:
            'رحلة يوم واحد. ينزلك السائق عند المدخل وينتظر، فلا تبحث عن موقف '
            + 'ولا تغادر في الساعة نفسها التي يغادر فيها الجميع.',
        },
        {
          name: 'شتربَتشكي بوك، حديقة أونا',
          distanceKm: 40,
          duration: '45 د – 1:00',
          body:
            'آخر بضعة كيلومترات ترابية. مع سائق لن تفكر في أي سيارة تمر من هناك.',
        },
        {
          name: 'بانيا لوكا',
          distanceKm: 155,
          duration: '2:30 – 3:00',
          body: 'مسار عمل، داخل البوسنة والهرسك بالكامل، بلا إجراءات حدودية.',
        },
        {
          name: 'سبليت',
          distanceKm: 275,
          duration: '3:30 – 4:30',
          body:
            'تنقل طويل نحو البحر. يُرتَّب هذا المسار قبل وقت أطول بسبب جدولة '
            + 'السائقين.',
        },
      ],
    },
    pricing: {
      title: 'السعر',
      paragraphs: [
        'تُحسب الرحلة مع سائق بالمسار أو باليوم، حسب ما تحتاج. التنقل من المطار '
        + 'مسار، ويوم مليء بالمواعيد يوم.',
        'نتفق على المبلغ الإجمالي قبل أن تؤكد أي شيء، وهو يشمل كل شيء — السيارة '
        + 'والسائق والوقود ورسوم الطرق على المسار المتفق عليه. ولا تظهر بنود في '
        + 'النهاية.',
        'وللسعر الدقيق أرسل المسار والتاريخ وعدد الركاب.',
      ],
      onRequest: 'عند الطلب',
    },
    why: {
      title: 'لماذا مع سائق',
      items: [
        'لا تقود بعد رحلة الطيران ولا تبحث عن الطريق في الظلام',
        'بلا ركن وبلا حدود وبلا قواعد مرور غير مألوفة',
        'السائق يعرف الطرق والمعابر',
        'للمجموعة سيارة واحدة بدل سيارتين في رتل',
        'الأمتعة تسافر معك لا في السيارة الثانية',
      ],
    },
    faq: {
      title: 'أسئلة عن السفر مع سائق',
      items: [
        {
          q: 'كم من الوقت مسبقاً ينبغي الحجز؟',
          a:
            'مبكراً قدر الإمكان، خصوصاً صيفاً وللمسارات الطويلة. السائق والسيارة '
            + 'يُخصَّصان ليوم كامل، فالتنقل غداً ليس ممكناً دائماً. وإن كنت تعرف '
            + 'موعد رحلتك فتواصل الآن.',
        },
        {
          q: 'هل تنتظرون إن تأخرت الرحلة؟',
          a:
            'نعم. اترك رقم الرحلة عند الحجز ونحن نتابعه. وتأخر الرحلة لا يتحول '
            + 'إلى مفاوضة في اللحظة الأخيرة.',
        },
        {
          q: 'كم شخصاً تتسع السيارة؟',
          a:
            'للمجموعات الأكبر نستخدم حافلاتنا الصغيرة. أرسل عدد الركاب بدقة '
            + 'وحجم الأمتعة عند الاستفسار وسنؤكد السيارة المناسبة.',
        },
        {
          q: 'هل السعر للشخص أم للسيارة؟',
          a:
            'للسيارة وللمسار، لا للشخص. وللمجموعة يكون ذلك عادةً أرخص من أي بديل.',
        },
      ],
    },
    cta: {
      title: 'أرسل المسار والتاريخ',
      body:
        'نرد بالسعر والسيارة وموعد الانطلاق. بلا التزام وبلا دفع مسبق.',
    },
  },
}

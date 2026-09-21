import type { LocaleMessages } from '../types'

/*
 * German — translated from bs.ts, which is the master. Re-read against it
 * whenever the Bosnian changes.
 *
 * This is not a secondary locale for this client. The largest single group
 * arriving in Bihać by air is the Una-Sana diaspora flying into Zagreb from
 * Germany, Austria and Switzerland, usually in July and August, usually with a
 * family and luggage. So the German copy leans harder on the two things that
 * group actually cares about — being met at Zagreb airport, and not having a
 * four-figure sum blocked on a credit card the way the desks in the terminal
 * do it — and it addresses the reader with "Sie" throughout, because that is
 * what a rental contract sounds like in German.
 */
export const de: LocaleMessages = {
  meta: {
    title: 'Rent a Car Gogo Bihać — Mietwagen ohne Kreditkarte',
    description:
      'Mietwagen in Bihać ohne Kreditkarte. Kaution 400 KM (200 €), vollständig '
      + 'erstattet. Lieferung an Ihre Adresse, ans Hotel oder an den Flughafen.',
    ogImageAlt: 'Fahrzeug von Rent a Car Gogo auf der Straße an der Una bei Bihać',
  },

  nav: {
    fleet: 'Fahrzeuge',
    about: 'Über uns',
    terms: 'Mietbedingungen',
    blog: 'Ratgeber',
    contact: 'Kontakt',
    prices: 'Preise',
    services: 'Mit Fahrer',
    airport: 'Lieferung zum Flughafen',
    plitvice: 'Plitvicer Seen',
    una: 'Nationalpark Una',
    book: 'Anfragen',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    mainNav: 'Hauptnavigation',
    mobileNav: 'Mobile Navigation',
    langLabel: 'Sprache',
  },

  hero: {
    eyebrow: 'Bihać · Nationalpark Una · Plitvicer Seen',
    titleLead: 'Mietwagen in Bihać',
    titleAccent: 'ohne Kreditkarte.',
    titleTail: '',
    subtitle:
      'Die Kaution beträgt 400 KM (200 €) und wird vollständig erstattet. Sie '
      + 'reservieren per Anruf oder Nachricht und zahlen erst bei der Übergabe — '
      + 'bar oder mit Bankkarte.',
    imageAlt:
      'Graues Fahrzeug von Rent a Car Gogo auf einer Straße über der Una bei '
      + 'Bihać im Morgenlicht',
    proof: [
      'Wir bringen das Auto zu Ihnen — Adresse, Hotel oder Flughafen',
      'Keine versteckten Kosten — Sie kennen den Preis vor der Zusage',
    ],
  },

  enquiry: {
    title: 'Verfügbarkeit prüfen',
    note: 'Wir antworten während der Öffnungszeiten, meist innerhalb weniger Minuten.',
    dates: 'Mietzeitraum',
    datesPlaceholder: 'z. B. 12.7. – 19.7.',
    people: 'Personen',
    peoplePlaceholder: 'z. B. 4',
    pickup: 'Übernahmeort',
    pickupPlaceholder: 'Bihać, Hotel, Flughafen…',
    car: 'Fahrzeug',
    carAny: 'Egal — bitte vorschlagen',
    submit: 'Anfrage über WhatsApp senden',
    intro: 'Guten Tag! Ich interessiere mich für einen Mietwagen.',
    reassure: 'Unverbindlich. Sie erhalten den Preis, bevor Sie etwas zusagen.',
  },

  facts: [
    { value: '5,0', label: 'Durchschnittsbewertung bei Google' },
    { value: '11', label: 'Fahrzeuge — vom Kleinwagen bis zum Bus' },
    { value: '400 KM', label: 'Kaution, vollständig erstattet' },
    { value: '35 km', label: 'von uns zu den Plitvicer Seen' },
  ],

  benefits: {
    title: 'Drei Dinge, die eine Anmietung sonst kompliziert machen — bei uns nicht',
    intro:
      'Das sind die Fragen, an denen Buchungen scheitern. Deshalb beantworten '
      + 'wir sie hier und nicht im Kleingedruckten.',
    items: [
      {
        title: 'Ohne Kreditkarte',
        body:
          'Sie reservieren per Anruf oder Nachricht — wir brauchen vorab keine '
          + 'Kartennummer. Bezahlt wird bei der Übernahme, bar oder mit '
          + 'Bankkarte. Es wird nichts geblockt und nichts abgebucht, bevor Sie '
          + 'im Auto sitzen.',
      },
      {
        title: 'Kaution 400 KM, keine Mark mehr',
        body:
          'Die Kaution beträgt 400 KM beziehungsweise 200 €. Sie wird '
          + 'vollständig erstattet, sobald Sie das Fahrzeug unbeschädigt und im '
          + 'übernommenen Zustand zurückbringen. Ohne Bearbeitungsgebühren und '
          + 'ohne Abzüge, die Sie vorher nicht gesehen haben.',
      },
      {
        title: 'Das Auto kommt zu Ihnen',
        body:
          'Bihać hat keinen Flughafen, also spielen wir keinen Schalter im '
          + 'Terminal. Wir machen es umgekehrt: Wir bringen das Fahrzeug an Ihre '
          + 'Adresse, vors Hotel, oder wir holen Sie an dem Flughafen ab, an dem '
          + 'Sie landen. Ort und Zeit bestimmen Sie.',
      },
    ],
  },

  reviews: {
    title: '5,0 Sterne — von Leuten, die tatsächlich gefahren sind',
    intro:
      'Die Bewertungen unten sind öffentlich und unverändert. Jede führt zum '
      + 'Original auf Google Maps, Sie können sie also ohne uns nachprüfen.',
    ratingLabel: 'Bewertung bei Google',
    ratingCount: 'auf Basis von {n} Bewertungen',
    onGoogle: 'bei Google',
    translatedNote: 'Von Google übersetzt',
    readOnGoogle: 'Bei Google lesen',
    allReviews: 'Alle Bewertungen auf Google Maps',
  },

  fleet: {
    eyebrow: 'Fuhrpark',
    title: 'Elf Fahrzeuge. Alle vor unserem Büro fotografiert.',
    intro:
      'Kein Katalog und keine fremden Fotos: Das sind unsere Autos, so wie Sie '
      + 'sie übernehmen, mit Kennzeichen aus Bihać und unserem Büro im '
      + 'Hintergrund. Wenn Sie unsicher sind, nennen Sie uns Personenzahl und '
      + 'Gepäck — wir schlagen etwas vor.',
    book: 'Verfügbarkeit prüfen',
    bookMessage: 'Guten Tag! Ich interessiere mich für den {car}.',
    seats: '{n} Sitze',
    seatsUnknown: 'Sitzplätze auf Anfrage',
    transmissionUnknown: 'Getriebe auf Anfrage',
    all: 'Alle Fahrzeuge',
    railHint: 'Wischen für weitere Fahrzeuge',
    categories: {
      all: 'Alle Fahrzeuge',
      city: 'Stadtauto',
      estate: 'Kombi',
      suv: 'SUV',
      van: 'Kleinbus',
      sport: 'Sportlich',
      business: 'Business',
    },
    specs: {
      comfort: 'Komfortabel',
      longTrips: 'Für lange Strecken',
      business: 'Geschäftlich',
      luggage: 'Großer Kofferraum',
      family: 'Familientauglich',
      group: 'Für Gruppen',
      transfer: 'Transfers',
      sport: 'Sportlich abgestimmt',
      economy: 'Sparsam',
      cityDrive: 'Wendig in der Stadt',
      easyParking: 'Leicht zu parken',
      highSeat: 'Erhöhte Sitzposition',
    },
    imageAlt: '{name} ({colour}) vor dem Büro von Rent a Car Gogo in Bihać',
  },

  steps: {
    eyebrow: 'Unser Service',
    title: 'Wie es abläuft — vom ersten Anruf bis zur Rückgabe',
    intro: 'Fünf Schritte, ohne Überraschungen dazwischen.',
    items: [
      {
        label: 'Vor der Anmietung',
        body:
          'Nennen Sie uns Zeitraum, Personenzahl und den gewünschten '
          + 'Übernahmeort. Darauf schlagen wir ein Fahrzeug vor und nennen den '
          + 'Gesamtpreis — nicht einen Tagespreis, zu dem später etwas '
          + 'hinzukommt. Wenn Sie ins Ausland fahren möchten, sagen Sie es '
          + 'gleich, dafür bereiten wir zusätzliche Papiere vor.',
      },
      {
        label: 'Reservierung',
        body:
          'Die Reservierung bestätigen Sie per Anruf, SMS oder WhatsApp. Wir '
          + 'verlangen keine Kreditkartennummer und buchen vorab nichts ab. Name, '
          + 'Telefonnummer und Zeitraum genügen.',
      },
      {
        label: 'Übernahme',
        body:
          'Sie übernehmen das Fahrzeug bei uns in der Dr. Irfana Ljubijankića 139 '
          + 'in Bihać, oder wir bringen es an den vereinbarten Ort. Wir prüfen '
          + 'das Auto gemeinsam und halten den Zustand fest, Sie unterschreiben '
          + 'den Vertrag, hinterlegen 400 KM Kaution und zahlen die Miete — bar '
          + 'oder mit Karte.',
      },
      {
        label: 'Während der Miete',
        body:
          'Die Nummer, die Sie anrufen, gehört derselben Person, die Ihnen die '
          + 'Schlüssel gegeben hat. Wenn etwas passiert — Panne, Reifen, Unfall — '
          + 'rufen Sie zuerst uns an. Eine Verlängerung melden Sie am besten '
          + 'einen Tag vorher.',
      },
      {
        label: 'Rückgabe',
        body:
          'Sie geben das Fahrzeug dort zurück, wo Sie es übernommen haben, oder '
          + 'an einem vereinbarten Ort. Wir sehen es gemeinsam durch, und wenn es '
          + 'unbeschädigt und im übernommenen Zustand ist, erhalten Sie die '
          + 'Kaution von 400 KM sofort und vollständig zurück.',
      },
    ],
  },

  locations: {
    title: 'Wo auch immer Ihre Reise beginnt',
    intro:
      'Unser Büro liegt an der Hauptstraße durch Bihać, im Stadtteil Ozimice I, '
      + 'mit Parkplatz davor. Sie müssen aber gar nicht zu uns kommen — meistens '
      + 'kommen wir zu Ihnen.',
    items: [
      {
        title: 'Bei uns in Bihać',
        body:
          'Dr. Irfana Ljubijankića 139, in der Ladenzeile mit Geschäften und '
          + 'Metzgerei. Direkt an der Hauptstraße, leicht zu finden, '
          + 'Parkmöglichkeit vorhanden.',
        meta: 'Ozimice I',
      },
      {
        title: 'An Ihre Adresse oder vors Hotel',
        body:
          'Wir bringen das Fahrzeug zur vereinbarten Zeit an eine Adresse in '
          + 'Bihać und Umgebung. Dasselbe gilt für die Rückgabe.',
        meta: 'Bihać und Umgebung',
      },
      {
        title: 'An den Flughafen, an dem Sie landen',
        body:
          'Bihać hat keinen Flughafen. Die nächsten sind Zadar, rund 150 km und '
          + 'zweieinhalb Stunden, und Zagreb, rund 165 km und knapp drei Stunden. '
          + 'Wir holen Sie dort ab — nennen Sie uns die Flugnummer.',
        meta: 'Zagreb · Zadar',
      },
      {
        title: 'Richtung Grenze und weiter',
        body:
          'Bis zum Grenzübergang Izačić sind es 13 Kilometer, etwa 25 Minuten. '
          + 'Wenn Sie nach Kroatien fahren möchten, sagen Sie es vor der '
          + 'Reservierung, damit wir Grüne Karte und Ausfuhrgenehmigung '
          + 'vorbereiten können.',
        meta: '13 km zur Grenze',
      },
    ],
    mapsLink: 'Auf Google Maps öffnen',
    addressNote: 'Öffnungszeiten: Montag – Samstag, 08:00 – 18:00 Uhr',
  },

  why: {
    eyebrow: 'Warum wir',
    title: 'Eine kleine Vermietung — und das mit Absicht',
    intro:
      'Kein Callcenter, kein Schalter mit Warteschlange, kein sechsseitiger '
      + 'Vertrag. Elf Autos und Leute, die sie kennen.',
    items: [
      {
        title: 'Eine Person, vom Anruf bis zum Schlüssel',
        body:
          'Wer ans Telefon geht, übergibt Ihnen auch das Fahrzeug und nimmt es '
          + 'wieder entgegen. Sie erklären Ihren Fall nicht dem dritten '
          + 'Mitarbeiter.',
      },
      {
        title: 'Der genannte Preis ist der bezahlte Preis',
        body:
          'Den Gesamtbetrag vereinbaren wir vor der Reservierung. Keine '
          + 'Buchungsgebühr, keine Vertragspauschale, keine Posten, die erst am '
          + 'Ende auftauchen.',
      },
      {
        title: 'Wir kennen die Strecken, für die Sie mieten',
        body:
          'Una, Plitvice, Štrbački buk, die Straße ans Meer und die Straße nach '
          + 'Zagreb — das sind Wege, die wir selbst fahren. Fragen Sie uns vorher.',
      },
      {
        title: 'Fahrbereite Fahrzeuge',
        body:
          'Vor jeder Übergabe gewartet und gereinigt. Den Zustand halten wir '
          + 'gemeinsam mit Ihnen fest, damit es bei der Rückgabe keine Diskussion '
          + 'gibt.',
      },
    ],
  },

  driver: {
    title: 'Selbst fahren oder mit unserem Fahrer',
    intro:
      'Beides ist möglich. Die Wahl hängt meist davon ab, ob die Fahrt '
      + 'geschäftlich oder Urlaub ist.',
    withDriver: {
      title: 'Mit Fahrer',
      body:
        'Für Flughafentransfers, geschäftliche Termine und Gruppen, die sich '
        + 'nicht um Parken, Grenze und unbekannte Straßen kümmern möchten.',
      points: [
        'Transfers von den Flughäfen Zagreb und Zadar',
        'Geschäftstermine und Tagesbuchungen',
        'Gruppen und Familienreisen im Kleinbus',
        'Der Fahrer kennt die Strecken und die Grenzübergänge',
      ],
    },
    selfDrive: {
      title: 'Ohne Fahrer',
      body:
        'Die klassische Anmietung: Schlüssel übernehmen und selbst fahren, im '
        + 'eigenen Tempo.',
      points: [
        'Kaution 400 KM, vollständig erstattet',
        'Ohne Kreditkarte',
        'Lieferung an den vereinbarten Ort',
        'Auslandsfahrt nach vorheriger Absprache möglich',
      ],
    },
    cta: 'Fahrer anfragen',
  },

  faq: {
    title: 'Fragen, die vor jeder Buchung kommen',
    intro: 'Steht Ihre Frage nicht dabei, rufen Sie an — das geht schneller.',
    items: [
      {
        q: 'Brauche ich für die Reservierung eine Kreditkarte?',
        a:
          'Nein. Sie reservieren per Anruf oder Nachricht, ohne Kartennummer. '
          + 'Bezahlt wird bei der Übernahme, bar oder mit Bankkarte.',
      },
      {
        q: 'Wie hoch ist die Kaution und wann bekomme ich sie zurück?',
        a:
          'Die Kaution beträgt 400 KM beziehungsweise 200 €. Sie wird bei der '
          + 'Rückgabe sofort und vollständig erstattet, sofern das Fahrzeug '
          + 'unbeschädigt und im übernommenen Zustand ist.',
      },
      {
        q: 'Können Sie das Fahrzeug an meine Adresse bringen?',
        a:
          'Ja. Wir liefern an Adressen in Bihać und Umgebung, vors Hotel, oder '
          + 'wir holen Sie am Flughafen Zagreb oder Zadar ab. Nennen Sie Ort und '
          + 'Zeit; für Lieferungen außerhalb von Bihać stimmen wir die '
          + 'Bedingungen vor der Reservierung ab.',
      },
      {
        q: 'Wie bezahle ich die Miete?',
        a:
          'Bei der Übernahme, bar oder mit Bankkarte. Den Gesamtbetrag kennen '
          + 'Sie, bevor Sie die Reservierung bestätigen.',
      },
      {
        q: 'Darf ich mit dem Fahrzeug nach Kroatien fahren?',
        a:
          'Die Ausfuhr aus Bosnien und Herzegowina ist möglich, wird aber vorab '
          + 'vereinbart — dafür bereiten wir Grüne Karte und schriftliche '
          + 'Genehmigung vor. Sagen Sie uns das Reiseziel vor der Reservierung, '
          + 'nicht am Tag der Übernahme. Der Grenzübergang Izačić liegt 13 '
          + 'Kilometer entfernt.',
      },
      {
        q: 'Wie sind Ihre Öffnungszeiten?',
        a:
          'Das Büro ist von 08:00 bis 18:00 Uhr geöffnet. Übernahme und Rückgabe '
          + 'außerhalb dieser Zeiten sind nach Absprache möglich — melden Sie '
          + 'sich rechtzeitig.',
      },
      {
        q: 'Was passiert bei einer Panne oder einem platten Reifen?',
        a:
          'Rufen Sie zuerst uns an, unter derselben Nummer, über die Sie '
          + 'reserviert haben. Je nachdem, wo Sie sind und was passiert ist, '
          + 'organisieren wir ein Ersatzfahrzeug oder Pannenhilfe.',
      },
      {
        q: 'Wo genau finde ich Sie?',
        a:
          'Dr. Irfana Ljubijankića 139 in Bihać, Stadtteil Ozimice I, an der '
          + 'Hauptstraße in der Ladenzeile. Parkplatz vor der Tür.',
      },
    ],
  },

  blog: {
    eyebrow: 'Ratgeber',
    title: 'Bevor Sie losfahren',
    intro:
      'Kurze Texte zu dem, was am häufigsten gefragt wird: was Sie zur Übernahme '
      + 'mitbringen und wohin sich eine Fahrt ab Bihać lohnt.',
    readMore: 'Ratgeber lesen',
    backToBlog: 'Zurück zum Ratgeber',
    published: 'Veröffentlicht',
    readingTime: '{n} Min. Lesezeit',
    allPosts: 'Alle Ratgeber',
    ctaTitle: 'Bereit loszufahren?',
    ctaBody:
      'Nennen Sie uns Zeitraum und Personenzahl. Fahrzeug und Preis schlagen wir '
      + 'noch am selben Tag vor.',
  },

  contact: {
    title: 'Melden Sie sich',
    intro:
      'Am schnellsten per Telefon oder WhatsApp. Wenn Sie lieber schreiben, '
      + 'füllen Sie das Formular aus und wir rufen zurück.',
    callTitle: 'Anrufen',
    callBody: 'Werktags von 08:00 bis 18:00 Uhr',
    whatsappTitle: 'WhatsApp',
    whatsappBody: 'Zeitraum und Personenzahl senden — wir antworten per Nachricht',
    addressTitle: 'Adresse',
    hoursTitle: 'Öffnungszeiten',
    hoursNote: 'Übernahme außerhalb der Öffnungszeiten nach Absprache möglich.',
    formTitle: 'Anfrage senden',
    formNote:
      'Wir antworten während der Öffnungszeiten. Die Anfrage ist unverbindlich.',
    name: 'Name',
    namePlaceholder: 'Ihr Name',
    phone: 'Telefon',
    phonePlaceholder: '+49 …',
    pickup: 'Übernahmeort',
    pickupPlaceholder: 'Bihać, Hotel, Flughafen…',
    message: 'Nachricht',
    messagePlaceholder:
      'Mietzeitraum, Personenzahl, Gepäck und ob Sie ins Ausland fahren möchten.',
    submit: 'Anfrage senden',
    sending: 'Wird gesendet…',
    sent: 'Danke — wir melden uns in Kürze.',
    errorRequired: 'Bitte Name und Telefonnummer angeben.',
    errorSend: 'Senden fehlgeschlagen. Rufen Sie an oder schreiben Sie per WhatsApp.',
    whatsappAlt: 'Lieber per WhatsApp',
  },

  footer: {
    tagline:
      'Autovermietung in Bihać — ohne Kreditkarte, mit Kaution, die Sie '
      + 'zurückbekommen.',
    navigation: 'Seiten',
    contact: 'Kontakt',
    followUs: 'Folgen Sie uns',
    rights: 'Alle Rechte vorbehalten.',
    footerNav: 'Navigation im Fußbereich',
    note:
      'Bihać hat keinen Flughafen — wir bringen das Fahrzeug an Ihre Adresse, '
      + 'vors Hotel oder an die Flughäfen Zagreb und Zadar.',
  },

  whatsappFab: 'WhatsApp',
  callFab: 'Anrufen',
  hours: 'Montag – Samstag, 08:00 – 18:00 Uhr',
  hoursShort: '08:00 – 18:00',
  skipToContent: 'Zum Inhalt springen',
  breadcrumbHome: 'Startseite',
}

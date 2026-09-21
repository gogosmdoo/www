import type { Locale } from '~/i18n/types'

/*
 * Copy for /cijene, one entry per language.
 *
 * Page content lives here rather than in i18n/locales, which stays the site
 * chrome. Folding every page's prose into the LocaleMessages interface would
 * turn it into a thousand-line type.
 *
 * Claims policy — and this page is the one where breaking it would cost the
 * client money rather than credibility:
 *
 *   - There is no confirmed rate for any vehicle, and no confirmed "from"
 *     figure. So this page quotes NO price at all. It explains what drives the
 *     price and routes to an enquiry, which is the honest version of a pricing
 *     page with no prices.
 *   - The deposit IS confirmed and flat: 400 KM / 200 € across the fleet, so it
 *     is stated as a figure rather than as "depends on category".
 *   - Delivery is NOT claimed as free anywhere, for any location. The client
 *     confirmed that delivery happens, not that it is free.
 *   - The extras list names only things the site already refers to elsewhere.
 *     No child seats, no GPS, no additional-driver fee is promised, because
 *     none of those is confirmed to exist.
 *
 * While PRICING_COMPLETE is false in ~/data/pricing this page is noindex and is
 * not linked from the header or footer. Bosnian copy uses "Vi" throughout.
 */

export interface PricingCopy {
  metaTitle: string
  metaDescription: string
  breadcrumb: string
  h1: string
  intro: string
  fromLabel: string
  perDay: string
  table: {
    caption: string
    vehicle: string
    short: string
    medium: string
    week: string
    month: string
    deposit: string
    onRequest: string
    note: string
  }
  included: { title: string, intro: string, items: string[] }
  extras: {
    title: string
    intro: string
    labels: Record<string, string>
    units: { perDay: string, perRental: string }
  }
  deposit: { title: string, paragraphs: string[] }
  howPriced: { title: string, paragraphs: string[] }
  faq: { title: string, items: { q: string, a: string }[] }
  cta: { title: string, body: string }
}

export const PRICING_COPY: Record<Locale, PricingCopy> = {
  bs: {
    metaTitle: 'Cijene najma auta u Bihaću | Rent a Car Gogo',
    metaDescription:
      'Kako se formira cijena najma vozila u Bihaću, šta je uključeno, šta se '
      + 'doplaćuje i kolik je depozit. Tačnu cijenu javljamo na upit.',
    breadcrumb: 'Cijene',
    h1: 'Cijene najma auta u Bihaću',
    intro:
      'Ovdje piše sve što utiče na račun: šta određuje cijenu, šta se doplaćuje '
      + 'i koliki je depozit. Tačan iznos po vozilu javljamo na upit, jer zavisi '
      + 'od termina i dužine najma — i dobijete ga kao ukupnu cifru prije nego '
      + 'što bilo šta potvrdite.',
    fromLabel: 'Na upit',
    perDay: 'po danu',
    table: {
      caption: 'Vozila i uslovi najma',
      vehicle: 'Vozilo',
      short: '1 – 2 dana',
      medium: '3 – 6 dana',
      week: '7+ dana',
      month: 'Mjesečno',
      deposit: 'Depozit',
      onRequest: 'Na upit',
      note:
        'Cijene se formiraju po terminu i dužini najma. Što je najam duži, to je '
        + 'dnevna cijena niža.',
    },
    included: {
      title: 'Uključeno u svaki najam',
      intro: 'Ovo ne dolazi kao dodatna stavka na kraju.',
      items: [
        'Obavezno osiguranje od autoodgovornosti',
        'Servisirano i očišćeno vozilo',
        'Zajednički pregled i evidentiranje stanja vozila',
        'Podrška na broj na koji ste rezervisali, tokom cijelog najma',
      ],
    },
    extras: {
      title: 'Šta se doplaćuje',
      intro:
        'Sve ispod se dogovara prije rezervacije i ulazi u ukupan iznos koji '
        + 'dobijete. Ništa se ne pojavljuje na dan preuzimanja.',
      labels: {
        greenCard: 'Zelena karta',
        crossBorder: 'Saglasnost za izlazak iz zemlje',
        extraDriver: 'Dodatni vozač',
        delivery: 'Dostava vozila izvan Bihaća',
        driverDay: 'Vozač',
      },
      units: { perDay: 'po danu', perRental: 'po najmu' },
    },
    deposit: {
      title: 'Depozit',
      paragraphs: [
        'Depozit je 400,00 KM, odnosno 200 €, i isti je za sva vozila. Ostavlja '
        + 'se pri preuzimanju vozila.',
        'Vraća se u cijelosti po povratku vozila bez oštećenja i u stanju u '
        + 'kojem je preuzeto — odmah, bez odbitaka za obradu. Depozit nije '
        + 'predujam i ne oduzima se od cijene najma; to su dva odvojena iznosa.',
        'Kreditna kartica nije potrebna ni za rezervaciju ni za depozit.',
      ],
    },
    howPriced: {
      title: 'Kako se formira cijena',
      paragraphs: [
        'Tri stvari određuju iznos: koje vozilo, koliko dana i u kojem terminu. '
        + 'Dnevna cijena pada kako se najam produžava, pa sedam dana nikad ne '
        + 'košta sedam puta jedan dan.',
        'Sezona je četvrti faktor. Ljeti je potražnja veća i vozila se '
        + 'rezervišu ranije, pa se i cijena i dostupnost razlikuju od onih u '
        + 'novembru.',
        'Ono što ne utiče na iznos je trenutak kad pitate. Cijenu dogovaramo '
        + 'prije rezervacije i ona se ne mijenja do preuzimanja.',
      ],
    },
    faq: {
      title: 'Pitanja o cijeni',
      items: [
        {
          q: 'Zašto cijene nisu objavljene u tabeli?',
          a:
            'Zato što bi bile netačne. Iznos zavisi od vozila, termina i dužine '
            + 'najma, a objavljena dnevna cijena bi za većinu rezervacija bila '
            + 'previsoka ili preniska. Javite termin i dobit ćete tačan ukupan '
            + 'iznos, obično isti dan.',
        },
        {
          q: 'Ima li naknade za rezervaciju?',
          a:
            'Nema. Rezervacija se potvrđuje pozivom ili porukom i ništa se ne '
            + 'plaća unaprijed. Plaćanje je pri preuzimanju vozila.',
        },
        {
          q: 'Kako se plaća?',
          a:
            'Gotovinom, pri preuzimanju vozila. Kreditna '
            + 'kartica nije potrebna.',
        },
        {
          q: 'Da li je dostava vozila besplatna?',
          a:
            'Uslove dostave dogovaramo prije rezervacije, zavisno od toga gdje i '
            + 'kada vozilo treba stići. Ukupan iznos, s dostavom uključenom, '
            + 'dobijete prije nego što potvrdite.',
        },
      ],
    },
    cta: {
      title: 'Zatražite tačnu cijenu',
      body:
        'Javite termin, broj putnika i gdje preuzimate vozilo. Odgovaramo s '
        + 'ukupnim iznosom, bez obaveze.',
    },
  },

  de: {
    metaTitle: 'Mietwagenpreise in Bihać | Rent a Car Gogo',
    metaDescription:
      'Wie sich der Mietpreis in Bihać zusammensetzt, was enthalten ist, was '
      + 'hinzukommt und wie hoch die Kaution ist. Genauer Preis auf Anfrage.',
    breadcrumb: 'Preise',
    h1: 'Mietwagenpreise in Bihać',
    intro:
      'Hier steht alles, was die Rechnung beeinflusst: was den Preis bestimmt, '
      + 'was hinzukommt und wie hoch die Kaution ist. Den genauen Betrag pro '
      + 'Fahrzeug nennen wir auf Anfrage, weil er vom Zeitraum und der Mietdauer '
      + 'abhängt — und Sie bekommen ihn als Gesamtsumme, bevor Sie etwas zusagen.',
    fromLabel: 'Auf Anfrage',
    perDay: 'pro Tag',
    table: {
      caption: 'Fahrzeuge und Mietbedingungen',
      vehicle: 'Fahrzeug',
      short: '1 – 2 Tage',
      medium: '3 – 6 Tage',
      week: '7+ Tage',
      month: 'Monatlich',
      deposit: 'Kaution',
      onRequest: 'Auf Anfrage',
      note:
        'Die Preise richten sich nach Zeitraum und Mietdauer. Je länger die '
        + 'Miete, desto niedriger der Tagespreis.',
    },
    included: {
      title: 'In jeder Anmietung enthalten',
      intro: 'Das kommt nicht am Ende als Zusatzposten dazu.',
      items: [
        'Gesetzliche Kfz-Haftpflichtversicherung',
        'Gewartetes und gereinigtes Fahrzeug',
        'Gemeinsame Zustandsprüfung und Protokollierung',
        'Erreichbarkeit unter der Nummer, über die Sie gebucht haben',
      ],
    },
    extras: {
      title: 'Was hinzukommt',
      intro:
        'Alles Folgende wird vor der Reservierung vereinbart und fließt in den '
        + 'Gesamtbetrag ein. Am Tag der Übernahme taucht nichts Neues auf.',
      labels: {
        greenCard: 'Grüne Karte',
        crossBorder: 'Genehmigung für Auslandsfahrten',
        extraDriver: 'Zusätzlicher Fahrer',
        delivery: 'Lieferung außerhalb von Bihać',
        driverDay: 'Fahrer',
      },
      units: { perDay: 'pro Tag', perRental: 'pro Anmietung' },
    },
    deposit: {
      title: 'Kaution',
      paragraphs: [
        'Die Kaution beträgt 400,00 KM beziehungsweise 200 € und ist für alle '
        + 'Fahrzeuge gleich. Sie wird bei der Übernahme hinterlegt.',
        'Sie wird vollständig erstattet, sobald das Fahrzeug unbeschädigt und im '
        + 'übernommenen Zustand zurückkommt — sofort und ohne '
        + 'Bearbeitungsabzüge. Die Kaution ist keine Anzahlung und wird nicht '
        + 'vom Mietpreis abgezogen; das sind zwei getrennte Beträge.',
        'Eine Kreditkarte ist weder für die Reservierung noch für die Kaution '
        + 'erforderlich.',
      ],
    },
    howPriced: {
      title: 'Wie der Preis entsteht',
      paragraphs: [
        'Drei Dinge bestimmen den Betrag: welches Fahrzeug, wie viele Tage und '
        + 'welcher Zeitraum. Der Tagespreis sinkt mit der Mietdauer, sieben Tage '
        + 'kosten also nie das Siebenfache eines Tages.',
        'Die Saison ist der vierte Faktor. Im Sommer ist die Nachfrage höher und '
        + 'die Fahrzeuge sind früher ausgebucht, Preis und Verfügbarkeit '
        + 'unterscheiden sich also vom November.',
        'Keinen Einfluss hat der Zeitpunkt Ihrer Anfrage. Der Preis wird vor der '
        + 'Reservierung vereinbart und ändert sich bis zur Übernahme nicht.',
      ],
    },
    faq: {
      title: 'Fragen zum Preis',
      items: [
        {
          q: 'Warum stehen keine Preise in der Tabelle?',
          a:
            'Weil sie falsch wären. Der Betrag hängt von Fahrzeug, Zeitraum und '
            + 'Dauer ab, und ein veröffentlichter Tagespreis wäre für die meisten '
            + 'Buchungen zu hoch oder zu niedrig. Nennen Sie den Zeitraum und Sie '
            + 'bekommen den genauen Gesamtbetrag, meist noch am selben Tag.',
        },
        {
          q: 'Gibt es eine Buchungsgebühr?',
          a:
            'Nein. Die Reservierung wird per Anruf oder Nachricht bestätigt, und '
            + 'vorab wird nichts bezahlt. Gezahlt wird bei der Übernahme.',
        },
        {
          q: 'Wie wird bezahlt?',
          a:
            'Bar, bei der Übernahme. Eine Kreditkarte ist '
            + 'nicht erforderlich.',
        },
        {
          q: 'Ist die Fahrzeuglieferung kostenlos?',
          a:
            'Die Lieferbedingungen vereinbaren wir vor der Reservierung, je '
            + 'nachdem wohin und wann das Fahrzeug kommen soll. Den Gesamtbetrag '
            + 'inklusive Lieferung erhalten Sie vor Ihrer Zusage.',
        },
      ],
    },
    cta: {
      title: 'Genauen Preis anfragen',
      body:
        'Nennen Sie Zeitraum, Personenzahl und Übernahmeort. Wir antworten mit '
        + 'dem Gesamtbetrag, unverbindlich.',
    },
  },

  en: {
    metaTitle: 'Car hire prices in Bihać | Rent a Car Gogo',
    metaDescription:
      'How the hire price in Bihać is worked out, what is included, what costs '
      + 'extra and how big the deposit is. Exact price on request.',
    breadcrumb: 'Prices',
    h1: 'Car hire prices in Bihać',
    intro:
      'Everything that affects the bill is here: what drives the price, what '
      + 'costs extra, and how big the deposit is. The exact figure per car comes '
      + 'on request, because it depends on your dates and how long you need it — '
      + 'and you get it as one total before you confirm anything.',
    fromLabel: 'On request',
    perDay: 'per day',
    table: {
      caption: 'Cars and hire conditions',
      vehicle: 'Car',
      short: '1 – 2 days',
      medium: '3 – 6 days',
      week: '7+ days',
      month: 'Monthly',
      deposit: 'Deposit',
      onRequest: 'On request',
      note:
        'Prices are set by your dates and the length of the hire. The longer the '
        + 'hire, the lower the daily rate.',
    },
    included: {
      title: 'Included in every hire',
      intro: 'None of this arrives as a line item at the end.',
      items: [
        'Compulsory third-party liability insurance',
        'A serviced and cleaned vehicle',
        'A joint inspection with the condition recorded',
        'Support on the number you booked on, for the whole hire',
      ],
    },
    extras: {
      title: 'What costs extra',
      intro:
        'Everything below is agreed before you book and goes into the total you '
        + 'are quoted. Nothing appears on the day of collection.',
      labels: {
        greenCard: 'Green card',
        crossBorder: 'Permission to take the car abroad',
        extraDriver: 'Additional driver',
        delivery: 'Delivery outside Bihać',
        driverDay: 'Driver',
      },
      units: { perDay: 'per day', perRental: 'per hire' },
    },
    deposit: {
      title: 'Deposit',
      paragraphs: [
        'The deposit is 400.00 KM, or €200, and it is the same for every car. It '
        + 'is left when you collect the vehicle.',
        'It comes back in full when the car is returned undamaged and in the '
        + 'condition it was taken — on the spot, with no handling deductions. '
        + 'The deposit is not a down payment and is not taken off the hire '
        + 'price; they are two separate amounts.',
        'No credit card is needed, for the booking or for the deposit.',
      ],
    },
    howPriced: {
      title: 'How the price is worked out',
      paragraphs: [
        'Three things set the amount: which car, how many days, and which dates. '
        + 'The daily rate falls as the hire gets longer, so seven days never '
        + 'costs seven times one day.',
        'Season is the fourth factor. In summer demand is higher and cars are '
        + 'booked further ahead, so both price and availability differ from '
        + 'November.',
        'What does not affect the amount is when you ask. The price is agreed '
        + 'before you book and does not move before collection.',
      ],
    },
    faq: {
      title: 'Questions about price',
      items: [
        {
          q: 'Why are there no prices in the table?',
          a:
            'Because they would be wrong. The amount depends on the car, the '
            + 'dates and the length of the hire, and a published daily rate would '
            + 'be too high or too low for most bookings. Send your dates and you '
            + 'get an exact total, usually the same day.',
        },
        {
          q: 'Is there a booking fee?',
          a:
            'No. Bookings are confirmed by call or message and nothing is paid up '
            + 'front. Payment is at collection.',
        },
        {
          q: 'How do I pay?',
          a:
            'In cash, when you collect the car. No credit card is '
            + 'needed.',
        },
        {
          q: 'Is delivery free?',
          a:
            'Delivery terms are agreed before booking, depending on where and '
            + 'when the car needs to be. You get the total, with delivery in it, '
            + 'before you confirm.',
        },
      ],
    },
    cta: {
      title: 'Ask for an exact price',
      body:
        'Send your dates, passenger count and where you are collecting. We reply '
        + 'with a total, with no obligation.',
    },
  },

  ar: {
    metaTitle: 'أسعار تأجير السيارات في بيهاتش | Rent a Car Gogo',
    metaDescription:
      'كيف يُحسب سعر الإيجار في بيهاتش، وما المشمول وما يُدفع إضافةً، وكم مبلغ '
      + 'التأمين. السعر الدقيق عند الطلب.',
    breadcrumb: 'الأسعار',
    h1: 'أسعار تأجير السيارات في بيهاتش',
    intro:
      'هنا كل ما يؤثر في الفاتورة: ما يحدد السعر، وما يُدفع إضافةً، وكم مبلغ '
      + 'التأمين. أما المبلغ الدقيق لكل سيارة فنرسله عند الطلب، لأنه يعتمد على '
      + 'التواريخ ومدة الإيجار — وتحصل عليه كمبلغ إجمالي قبل أن تؤكد أي شيء.',
    fromLabel: 'عند الطلب',
    perDay: 'يومياً',
    table: {
      caption: 'السيارات وشروط الإيجار',
      vehicle: 'السيارة',
      short: 'يوم – يومان',
      medium: '3 – 6 أيام',
      week: '7 أيام فأكثر',
      month: 'شهرياً',
      deposit: 'التأمين',
      onRequest: 'عند الطلب',
      note:
        'تُحسب الأسعار حسب التواريخ ومدة الإيجار. وكلما طالت المدة انخفض السعر '
        + 'اليومي.',
    },
    included: {
      title: 'مشمول في كل إيجار',
      intro: 'هذه البنود لا تُضاف كرسوم في النهاية.',
      items: [
        'التأمين الإلزامي ضد الغير',
        'سيارة مُصانة ونظيفة',
        'فحص مشترك للسيارة وتسجيل حالتها',
        'الدعم على الرقم الذي حجزت عليه، طوال مدة الإيجار',
      ],
    },
    extras: {
      title: 'ما يُدفع إضافةً',
      intro:
        'كل ما يلي يُتفق عليه قبل الحجز ويدخل في المبلغ الإجمالي. ولا يظهر شيء '
        + 'جديد يوم الاستلام.',
      labels: {
        greenCard: 'البطاقة الخضراء',
        crossBorder: 'إذن مغادرة البلاد',
        extraDriver: 'سائق إضافي',
        delivery: 'التوصيل خارج بيهاتش',
        driverDay: 'سائق',
      },
      units: { perDay: 'يومياً', perRental: 'لكل إيجار' },
    },
    deposit: {
      title: 'التأمين',
      paragraphs: [
        'مبلغ التأمين 400,00 مارك أي 200 يورو، وهو نفسه لكل السيارات. ويُترك عند '
        + 'استلام السيارة.',
        'ويُعاد بالكامل عند إعادة السيارة سليمة وبالحالة التي استُلمت بها — في '
        + 'الحال وبدون خصومات إدارية. والتأمين ليس دفعة مقدمة ولا يُخصم من سعر '
        + 'الإيجار؛ فهما مبلغان منفصلان.',
        'ولا حاجة لبطاقة ائتمان، لا للحجز ولا للتأمين.',
      ],
    },
    howPriced: {
      title: 'كيف يُحسب السعر',
      paragraphs: [
        'ثلاثة أمور تحدد المبلغ: أي سيارة، وكم يوماً، وفي أي تواريخ. والسعر '
        + 'اليومي ينخفض كلما طالت المدة، فسبعة أيام لا تكلّف أبداً سبعة أضعاف '
        + 'اليوم الواحد.',
        'والموسم هو العامل الرابع. ففي الصيف يزداد الطلب وتُحجز السيارات مبكراً، '
        + 'فيختلف السعر والتوفر عمّا هما عليه في تشرين الثاني.',
        'أما ما لا يؤثر في المبلغ فهو وقت سؤالك. السعر يُتفق عليه قبل الحجز ولا '
        + 'يتغير حتى الاستلام.',
      ],
    },
    faq: {
      title: 'أسئلة عن السعر',
      items: [
        {
          q: 'لماذا لا توجد أسعار في الجدول؟',
          a:
            'لأنها ستكون غير دقيقة. المبلغ يعتمد على السيارة والتواريخ ومدة '
            + 'الإيجار، وأي سعر يومي منشور سيكون أعلى أو أقل من الصحيح لمعظم '
            + 'الحجوزات. أرسل التواريخ وتحصل على المبلغ الإجمالي الدقيق، غالباً في '
            + 'اليوم نفسه.',
        },
        {
          q: 'هل هناك رسوم حجز؟',
          a:
            'لا. يُؤكَّد الحجز بمكالمة أو رسالة ولا يُدفع شيء مسبقاً. والدفع عند '
            + 'الاستلام.',
        },
        {
          q: 'كيف أدفع؟',
          a: 'نقداً عند استلام السيارة. ولا حاجة لبطاقة ائتمان.',
        },
        {
          q: 'هل التوصيل مجاني؟',
          a:
            'تُتفق شروط التوصيل قبل الحجز حسب المكان والوقت الذي يجب أن تصل فيه '
            + 'السيارة. وتحصل على المبلغ الإجمالي شاملاً التوصيل قبل أن تؤكد.',
        },
      ],
    },
    cta: {
      title: 'اطلب السعر الدقيق',
      body:
        'أرسل التواريخ وعدد الركاب ومكان الاستلام. نرد بالمبلغ الإجمالي، وبلا '
        + 'أي التزام.',
    },
  },
}

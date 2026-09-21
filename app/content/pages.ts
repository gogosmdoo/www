import type { Locale } from '~/i18n/types'

/*
 * Copy for the three standalone pages the brief asks for: O nama, Uslovi and
 * Kontakt.
 *
 * On the terms page: the client has not sent their rental conditions yet, and
 * they said so — they are coming separately. So this page states only what is
 * already confirmed elsewhere on the site (the deposit, the no-credit-card
 * policy, payment at collection, opening hours, cross-border by prior
 * arrangement) and says plainly that the rest is agreed at booking.
 *
 * It does NOT invent a minimum age, a licence-held-for period, a mileage
 * allowance, a fuel policy, an insurance excess or a cancellation window.
 * Those are the terms a customer would actually be held to, and a guessed
 * figure there is worse than the page not existing — it is a promise the
 * client never made, on the client's own domain.
 *
 * `pending` renders as a visible note. Delete it and fill `sections` when the
 * real conditions arrive; the page is noindex until then (see uslovi.vue).
 */

export interface PageCopy {
  about: {
    metaTitle: string
    metaDescription: string
    title: string
    lead: string
    body: string[]
    pointsTitle: string
    points: { title: string, body: string }[]
  }
  terms: {
    metaTitle: string
    metaDescription: string
    title: string
    lead: string
    pending: string
    confirmedTitle: string
    sections: { title: string, items: string[] }[]
  }
  contact: {
    metaTitle: string
    metaDescription: string
    title: string
    lead: string
    mapTitle: string
    directionsTitle: string
    directionsBody: string
  }
}

export const PAGE_COPY: Record<Locale, PageCopy> = {
  bs: {
    about: {
      metaTitle: 'O nama | Rent a Car Gogo Bihać',
      metaDescription:
        'Mala rent a car agencija u Bihaću, na glavnoj cesti u Ozimicama I. '
        + 'Jedanaest vozila, depozit 400 KM bez kreditne kartice, dostava na adresu.',
      title: 'Jedanaest auta i ljudi koji ih poznaju',
      lead:
        'Rent a Car Gogo je mala agencija u Bihaću. Nemamo pozivni centar ni '
        + 'šalter s redom — imamo vozila i broj telefona na koji se javlja neko '
        + 'ko zna gdje je svako od njih i ko ga je zadnji vozio.',
      body: [
        'Kancelarija nam je u Ulici dr. Irfana Ljubijankića 139, u naselju '
        + 'Ozimice I, u nizu lokala na glavnoj cesti kroz Bihać. Nije skrivena '
        + 'u dvorištu i ispred nje ima gdje se stati — što zvuči sitno dok ne '
        + 'pokušate preuzeti auto s koferima u rukama.',
        'Bihać nema aerodrom i nema smisla praviti se da ima. Zato radimo '
        + 'obrnuto od agencija koje čekaju u terminalu: vozilo dovozimo na vašu '
        + 'adresu, pred hotel, ili vas sačekamo tamo gdje slijećete. Najbliži '
        + 'aerodromi su Zadar, oko 150 kilometara, i Zagreb, oko 165.',
        'Ono što nas razlikuje od velikih nije flota nego uslov: ne tražimo '
        + 'kreditnu karticu. Depozit je 400 KM i vraća se u cijelosti. Za '
        + 'porodicu koja dolazi iz Njemačke na dvije sedmice to je razlika '
        + 'između rezervacije i odustajanja, jer na šalteru u Zagrebu ta ista '
        + 'rezervacija znači blokadu četverocifrenog iznosa na kartici.',
        'Ako putujete dalje — Plitvička jezera su 35 kilometara, Štrbački buk '
        + 'četrdeset, granica na Izačiću trinaest — pitajte nas za put. To su '
        + 'ceste kojima i sami vozimo.',
      ],
      pointsTitle: 'Kako radimo',
      points: [
        {
          title: 'Bez kreditne kartice',
          body:
            'Rezervacija se potvrđuje pozivom ili porukom. Plaćanje je pri '
            + 'preuzimanju — gotovinom ili bankovnom karticom.',
        },
        {
          title: 'Depozit 400 KM',
          body:
            'Odnosno 200 €. Vraća se u cijelosti pri vraćanju neoštećenog '
            + 'vozila, odmah i bez odbitaka za obradu.',
        },
        {
          title: 'Dostava vozila',
          body:
            'Na adresu u Bihaću i okolini, pred hotel, ili na aerodrom u '
            + 'Zagrebu i Zadru po dogovoru.',
        },
        {
          title: 'Jedan sagovornik',
          body:
            'Isti čovjek diže telefon, predaje ključeve i prima vozilo nazad. '
            + 'Ne prepričavate svoj slučaj triput.',
        },
      ],
    },
    terms: {
      metaTitle: 'Uslovi najma | Rent a Car Gogo Bihać',
      metaDescription:
        'Uslovi najma vozila u Rent a Car Gogo Bihać: depozit 400 KM, bez '
        + 'kreditne kartice, plaćanje pri preuzimanju.',
      title: 'Uslovi najma',
      lead:
        'Ispod je ono što je već potvrđeno i što vrijedi za svaki najam. Puni '
        + 'uslovi se dogovaraju i potpisuju pri preuzimanju vozila.',
      pending:
        'Kompletan tekst uslova je u pripremi i bit će objavljen ovdje čim ga '
        + 'dobijemo. Do tada: sve što vas zanima — starosna granica, '
        + 'kilometraža, gorivo, osiguranje, otkazivanje — recite nam pri upitu '
        + 'i dobit ćete odgovor prije nego što bilo šta potvrdite. Ništa se ne '
        + 'plaća unaprijed.',
      confirmedTitle: 'Ovo je potvrđeno',
      sections: [
        {
          title: 'Rezervacija i plaćanje',
          items: [
            'Rezervacija se potvrđuje pozivom, SMS-om ili porukom na WhatsApp.',
            'Kreditna kartica nije potrebna. Ne tražimo broj kartice unaprijed.',
            'Najam se plaća pri preuzimanju vozila — gotovinom ili bankovnom karticom.',
            'Ukupan iznos dogovaramo prije rezervacije, bez naknadnih stavki.',
          ],
        },
        {
          title: 'Depozit',
          items: [
            'Depozit iznosi 400,00 KM, odnosno 200 €.',
            'Ostavlja se pri preuzimanju vozila.',
            'Vraća se u cijelosti pri povratu vozila bez oštećenja i u stanju u '
            + 'kojem je preuzeto.',
          ],
        },
        {
          title: 'Preuzimanje i vraćanje',
          items: [
            'Preuzimanje u našoj kancelariji: Dr. Irfana Ljubijankića 139, Bihać.',
            'Dostava na adresu, pred hotel ili na aerodrom po dogovoru.',
            'Stanje vozila se zajednički pregleda i evidentira pri preuzimanju i '
            + 'pri vraćanju.',
            'Radno vrijeme je 08:00 – 18:00. Preuzimanje izvan tog vremena je '
            + 'moguće uz prethodni dogovor.',
          ],
        },
        {
          title: 'Izlazak iz zemlje',
          items: [
            'Izlazak vozila iz Bosne i Hercegovine se najavljuje prije rezervacije.',
            'Za prelazak granice pripremamo zelenu kartu i pisanu saglasnost.',
            'Destinaciju recite unaprijed, a ne na dan preuzimanja.',
          ],
        },
      ],
    },
    contact: {
      metaTitle: 'Kontakt | Rent a Car Gogo Bihać',
      metaDescription:
        'Rent a Car Gogo, Dr. Irfana Ljubijankića 139, Bihać. Telefon 061 798 '
        + '203, radno vrijeme 08:00 – 18:00. Dostava vozila na adresu.',
      title: 'Kontakt',
      lead:
        'Najbrže je telefonom ili na WhatsApp. Recite termin, broj putnika i '
        + 'gdje želite preuzeti vozilo — ostalo riješimo u jednoj poruci.',
      mapTitle: 'Gdje smo',
      directionsTitle: 'Kako do nas',
      directionsBody:
        'Nalazimo se na glavnoj cesti kroz Bihać, u naselju Ozimice I, u nizu '
        + 'poslovnih lokala s trgovinama i mesnicom. Natpis RENT-A-CAR je na '
        + 'fasadi iznad ulaza, a ispred zgrade ima parking. Dolazite li iz '
        + 'pravca centra, vozite Ulicom dr. Irfana Ljubijankića prema '
        + 'Ozimicama — mi smo s desne strane.',
    },
  },

  de: {
    about: {
      metaTitle: 'Über uns | Rent a Car Gogo Bihać',
      metaDescription:
        'Kleine Autovermietung in Bihać, an der Hauptstraße in Ozimice I. Elf '
        + 'Fahrzeuge, Kaution 400 KM ohne Kreditkarte, Lieferung an Ihre Adresse.',
      title: 'Elf Autos und Leute, die sie kennen',
      lead:
        'Rent a Car Gogo ist eine kleine Vermietung in Bihać. Kein Callcenter, '
        + 'kein Schalter mit Warteschlange — Fahrzeuge und eine Telefonnummer, '
        + 'an der jemand abnimmt, der weiß, wo jedes einzelne gerade steht.',
      body: [
        'Unser Büro liegt in der Dr. Irfana Ljubijankića 139 im Stadtteil '
        + 'Ozimice I, in der Ladenzeile an der Hauptstraße durch Bihać. Nicht '
        + 'versteckt im Hinterhof, und davor ist Platz zum Halten — was '
        + 'nebensächlich klingt, bis man mit Koffern in der Hand ein Auto '
        + 'übernehmen will.',
        'Bihać hat keinen Flughafen, und es hat keinen Sinn, so zu tun als ob. '
        + 'Deshalb machen wir es umgekehrt als die Vermieter, die im Terminal '
        + 'warten: Wir bringen das Fahrzeug an Ihre Adresse, vors Hotel, oder '
        + 'wir holen Sie dort ab, wo Sie landen. Die nächsten Flughäfen sind '
        + 'Zadar mit rund 150 Kilometern und Zagreb mit rund 165.',
        'Was uns von den Großen unterscheidet, ist nicht der Fuhrpark, sondern '
        + 'die Bedingung: Wir verlangen keine Kreditkarte. Die Kaution beträgt '
        + '400 KM und wird vollständig erstattet. Für eine Familie, die für '
        + 'zwei Wochen aus Deutschland kommt, ist das der Unterschied zwischen '
        + 'Buchen und Sein-lassen — am Schalter in Zagreb bedeutet dieselbe '
        + 'Buchung eine vierstellige Blockierung auf der Karte.',
        'Und wenn Sie weiterfahren — die Plitvicer Seen sind 35 Kilometer '
        + 'entfernt, der Štrbački buk vierzig, die Grenze bei Izačić '
        + 'dreizehn — fragen Sie uns nach der Strecke. Das sind Wege, die wir '
        + 'selbst fahren.',
      ],
      pointsTitle: 'Wie wir arbeiten',
      points: [
        {
          title: 'Ohne Kreditkarte',
          body:
            'Reservierung per Anruf oder Nachricht. Bezahlt wird bei der '
            + 'Übernahme — bar oder mit Bankkarte.',
        },
        {
          title: 'Kaution 400 KM',
          body:
            'Also 200 €. Vollständige Erstattung bei Rückgabe eines '
            + 'unbeschädigten Fahrzeugs, sofort und ohne Bearbeitungsabzüge.',
        },
        {
          title: 'Fahrzeuglieferung',
          body:
            'An eine Adresse in Bihać und Umgebung, vors Hotel oder nach '
            + 'Absprache an die Flughäfen Zagreb und Zadar.',
        },
        {
          title: 'Ein Ansprechpartner',
          body:
            'Dieselbe Person geht ans Telefon, übergibt die Schlüssel und nimmt '
            + 'das Fahrzeug zurück. Sie erklären Ihren Fall nicht dreimal.',
        },
      ],
    },
    terms: {
      metaTitle: 'Mietbedingungen | Rent a Car Gogo Bihać',
      metaDescription:
        'Mietbedingungen bei Rent a Car Gogo Bihać: Kaution 400 KM, ohne '
        + 'Kreditkarte, Zahlung bei Übernahme.',
      title: 'Mietbedingungen',
      lead:
        'Unten steht, was bereits feststeht und für jede Anmietung gilt. Die '
        + 'vollständigen Bedingungen werden bei der Übernahme vereinbart und '
        + 'unterschrieben.',
      pending:
        'Der vollständige Bedingungstext ist in Vorbereitung und wird hier '
        + 'veröffentlicht, sobald er vorliegt. Bis dahin gilt: Was Sie wissen '
        + 'möchten — Mindestalter, Kilometer, Kraftstoff, Versicherung, '
        + 'Stornierung — fragen Sie bei der Anfrage, und Sie bekommen die '
        + 'Antwort, bevor Sie etwas zusagen. Vorab wird nichts bezahlt.',
      confirmedTitle: 'Das steht fest',
      sections: [
        {
          title: 'Reservierung und Zahlung',
          items: [
            'Die Reservierung wird per Anruf, SMS oder WhatsApp bestätigt.',
            'Eine Kreditkarte ist nicht erforderlich. Wir verlangen vorab keine Kartennummer.',
            'Die Miete wird bei der Übernahme bezahlt — bar oder mit Bankkarte.',
            'Den Gesamtbetrag vereinbaren wir vor der Reservierung, ohne spätere Posten.',
          ],
        },
        {
          title: 'Kaution',
          items: [
            'Die Kaution beträgt 400,00 KM beziehungsweise 200 €.',
            'Sie wird bei der Übernahme hinterlegt.',
            'Sie wird vollständig erstattet, wenn das Fahrzeug unbeschädigt und '
            + 'im übernommenen Zustand zurückgegeben wird.',
          ],
        },
        {
          title: 'Übernahme und Rückgabe',
          items: [
            'Übernahme in unserem Büro: Dr. Irfana Ljubijankića 139, Bihać.',
            'Lieferung an eine Adresse, vors Hotel oder an den Flughafen nach Absprache.',
            'Der Fahrzeugzustand wird bei Übernahme und Rückgabe gemeinsam geprüft und festgehalten.',
            'Öffnungszeiten 08:00 – 18:00 Uhr. Übernahme außerhalb dieser Zeiten nach Absprache möglich.',
          ],
        },
        {
          title: 'Fahrten ins Ausland',
          items: [
            'Die Ausfuhr des Fahrzeugs aus Bosnien und Herzegowina wird vor der Reservierung angemeldet.',
            'Für den Grenzübertritt bereiten wir Grüne Karte und schriftliche Genehmigung vor.',
            'Nennen Sie das Reiseziel vorab, nicht am Tag der Übernahme.',
          ],
        },
      ],
    },
    contact: {
      metaTitle: 'Kontakt | Rent a Car Gogo Bihać',
      metaDescription:
        'Rent a Car Gogo, Dr. Irfana Ljubijankića 139, Bihać. Telefon 061 798 '
        + '203, Öffnungszeiten 08:00 – 18:00 Uhr. Fahrzeuglieferung an Ihre Adresse.',
      title: 'Kontakt',
      lead:
        'Am schnellsten per Telefon oder WhatsApp. Nennen Sie Zeitraum, '
        + 'Personenzahl und den gewünschten Übernahmeort — den Rest klären wir '
        + 'in einer Nachricht.',
      mapTitle: 'Wo wir sind',
      directionsTitle: 'So finden Sie uns',
      directionsBody:
        'Wir liegen an der Hauptstraße durch Bihać, im Stadtteil Ozimice I, in '
        + 'der Ladenzeile mit Geschäften und Metzgerei. Der Schriftzug '
        + 'RENT-A-CAR hängt über dem Eingang, davor gibt es Parkplätze. Aus '
        + 'Richtung Zentrum fahren Sie die Dr. Irfana Ljubijankića Richtung '
        + 'Ozimice — wir sind auf der rechten Seite.',
    },
  },

  en: {
    about: {
      metaTitle: 'About us | Rent a Car Gogo Bihać',
      metaDescription:
        'A small car hire agency in Bihać, on the main road in Ozimice I. '
        + 'Eleven cars, a 400 KM deposit, no credit card, delivery to your address.',
      title: 'Eleven cars and people who know them',
      lead:
        'Rent a Car Gogo is a small agency in Bihać. No call centre and no '
        + 'queue at a desk — cars, and a phone number answered by someone who '
        + 'knows where every one of them is and who drove it last.',
      body: [
        'Our office is at Dr. Irfana Ljubijankića 139 in the Ozimice I '
        + 'district, in the parade of shops on the main road through Bihać. It '
        + 'is not hidden in a courtyard and there is room to pull up outside — '
        + 'which sounds trivial until you try to collect a car with suitcases '
        + 'in your hands.',
        'Bihać has no airport and there is no sense pretending otherwise. So we '
        + 'work the other way round from the agencies waiting in a terminal: we '
        + 'bring the car to your address, to your hotel, or we meet you where '
        + 'you land. The nearest airports are Zadar, about 150 kilometres away, '
        + 'and Zagreb, about 165.',
        'What separates us from the large firms is not the fleet but the '
        + 'condition: we do not ask for a credit card. The deposit is 400 KM '
        + 'and you get all of it back. For a family arriving from Germany for a '
        + 'fortnight that is the difference between booking and not bothering, '
        + 'because at a desk in Zagreb the same booking means a four-figure '
        + 'hold on a card.',
        'And if you are driving on — the Plitvice Lakes are 35 kilometres away, '
        + 'Štrbački buk forty, the Izačić border crossing thirteen — ask us '
        + 'about the route. These are roads we drive ourselves.',
      ],
      pointsTitle: 'How we work',
      points: [
        {
          title: 'No credit card',
          body:
            'Book by call or message. Pay at collection — cash or bank card.',
        },
        {
          title: '400 KM deposit',
          body:
            'That is €200. Refunded in full when you bring the car back '
            + 'undamaged, on the spot, with no handling deductions.',
        },
        {
          title: 'We deliver',
          body:
            'To an address in Bihać and around, to your hotel, or to Zagreb and '
            + 'Zadar airports by arrangement.',
        },
        {
          title: 'One person to deal with',
          body:
            'The same person answers the phone, hands over the keys and takes '
            + 'the car back. You will not explain yourself three times.',
        },
      ],
    },
    terms: {
      metaTitle: 'Rental terms | Rent a Car Gogo Bihać',
      metaDescription:
        'Rental terms at Rent a Car Gogo Bihać: 400 KM deposit, no credit card '
        + 'required, payment at collection.',
      title: 'Rental terms',
      lead:
        'Below is what is already settled and applies to every hire. The full '
        + 'conditions are agreed and signed when you collect the car.',
      pending:
        'The complete terms are being finalised and will be published here as '
        + 'soon as we have them. Until then: whatever you need to know — '
        + 'minimum age, mileage, fuel, insurance, cancellation — ask when you '
        + 'enquire and you will have the answer before you commit to anything. '
        + 'Nothing is paid up front.',
      confirmedTitle: 'What is confirmed',
      sections: [
        {
          title: 'Booking and payment',
          items: [
            'Bookings are confirmed by call, SMS or WhatsApp message.',
            'No credit card is required. We do not ask for a card number in advance.',
            'The hire is paid at collection — cash or bank card.',
            'The total is agreed before booking, with no items added later.',
          ],
        },
        {
          title: 'Deposit',
          items: [
            'The deposit is 400.00 KM, or €200.',
            'It is left at collection.',
            'It is refunded in full when the car is returned undamaged and in '
            + 'the condition it was taken.',
          ],
        },
        {
          title: 'Collection and return',
          items: [
            'Collection at our office: Dr. Irfana Ljubijankića 139, Bihać.',
            'Delivery to an address, hotel or airport by arrangement.',
            'The condition of the car is inspected and recorded together at both collection and return.',
            'Opening hours are 08:00 – 18:00. Collection outside those hours can be arranged in advance.',
          ],
        },
        {
          title: 'Taking the car abroad',
          items: [
            'Taking the car out of Bosnia and Herzegovina is declared before booking.',
            'We prepare a green card and written permission for the crossing.',
            'Tell us the destination in advance, not on the day of collection.',
          ],
        },
      ],
    },
    contact: {
      metaTitle: 'Contact | Rent a Car Gogo Bihać',
      metaDescription:
        'Rent a Car Gogo, Dr. Irfana Ljubijankića 139, Bihać. Phone 061 798 '
        + '203, open 08:00 – 18:00. Car delivery to your address.',
      title: 'Contact',
      lead:
        'Phone or WhatsApp is quickest. Send your dates, how many of you there '
        + 'are and where you want to collect — we sort the rest in one message.',
      mapTitle: 'Where we are',
      directionsTitle: 'Finding us',
      directionsBody:
        'We are on the main road through Bihać, in the Ozimice I district, in '
        + 'the parade of business units with the shops and the butcher. The '
        + 'RENT-A-CAR sign is on the facade above the entrance and there is '
        + 'parking in front. Coming from the centre, follow Dr. Irfana '
        + 'Ljubijankića towards Ozimice — we are on the right.',
    },
  },

  ar: {
    about: {
      metaTitle: 'من نحن | Rent a Car Gogo بيهاتش',
      metaDescription:
        'وكالة تأجير سيارات صغيرة في بيهاتش، على الطريق الرئيسي في أوزيميتسه '
        + 'الأول. إحدى عشرة سيارة، تأمين 400 مارك بدون بطاقة ائتمان.',
      title: 'إحدى عشرة سيارة وأشخاص يعرفونها',
      lead:
        'Rent a Car Gogo وكالة صغيرة في بيهاتش. لا مركز اتصال ولا طابور أمام '
        + 'شبّاك — سيارات، ورقم هاتف يرد عليه شخص يعرف أين توجد كل واحدة منها '
        + 'ومن قادها آخر مرة.',
      body: [
        'مكتبنا في شارع Dr. Irfana Ljubijankića 139 في حي أوزيميتسه الأول، ضمن '
        + 'صف المحلات على الطريق الرئيسي في بيهاتش. ليس مخفياً في فناء خلفي، '
        + 'وأمامه مكان للوقوف — وهو تفصيل يبدو بسيطاً حتى تحاول استلام سيارة '
        + 'وحقائبك في يديك.',
        'بيهاتش ليس فيها مطار ولا معنى للتظاهر بغير ذلك. لذلك نعمل بعكس '
        + 'الوكالات التي تنتظر في صالة الوصول: نوصل السيارة إلى عنوانك أو أمام '
        + 'فندقك، أو نلتقيك حيث تهبط طائرتك. أقرب المطارات زادار على نحو 150 '
        + 'كيلومتراً، وزغرب على نحو 165.',
        'ما يميّزنا عن الشركات الكبيرة ليس الأسطول بل الشرط: لا نطلب بطاقة '
        + 'ائتمان. التأمين 400 مارك ويُعاد إليك بالكامل. ولعائلة قادمة من '
        + 'ألمانيا لأسبوعين، هذا هو الفرق بين أن تحجز وألا تحجز، لأن الحجز نفسه '
        + 'عند شبّاك في زغرب يعني حجز مبلغ من أربعة أرقام على البطاقة.',
        'وإن كنت ستكمل الطريق — بحيرات بليتفيتشه على بعد 35 كيلومتراً، '
        + 'وشتربَتشكي بوك أربعين، ومعبر إيزاتشيتش ثلاثة عشر — فاسألنا عن '
        + 'الطريق. هذه طرق نقودها بأنفسنا.',
      ],
      pointsTitle: 'كيف نعمل',
      points: [
        {
          title: 'بدون بطاقة ائتمان',
          body: 'الحجز بمكالمة أو رسالة. والدفع عند الاستلام — نقداً أو ببطاقة مصرفية.',
        },
        {
          title: 'تأمين 400 مارك',
          body:
            'أي 200 يورو. يُعاد بالكامل عند إعادة سيارة سليمة، في الحال وبدون '
            + 'خصومات إدارية.',
        },
        {
          title: 'نوصل السيارة',
          body:
            'إلى عنوان في بيهاتش وما حولها، أو إلى فندقك، أو إلى مطاري زغرب '
            + 'وزادار بترتيب مسبق.',
        },
        {
          title: 'شخص واحد تتعامل معه',
          body:
            'الشخص نفسه يرد على الهاتف ويسلّم المفاتيح ويستلم السيارة. لن تشرح '
            + 'حالتك ثلاث مرات.',
        },
      ],
    },
    terms: {
      metaTitle: 'شروط الإيجار | Rent a Car Gogo بيهاتش',
      metaDescription:
        'شروط الإيجار لدى Rent a Car Gogo بيهاتش: تأمين 400 مارك، بدون بطاقة '
        + 'ائتمان، الدفع عند الاستلام.',
      title: 'شروط الإيجار',
      lead:
        'في الأسفل ما هو مؤكد وينطبق على كل إيجار. أما الشروط الكاملة فتُتفق '
        + 'وتُوقَّع عند استلام السيارة.',
      pending:
        'النص الكامل للشروط قيد الإعداد وسيُنشر هنا فور توفره. وحتى ذلك الحين: '
        + 'كل ما يهمك — الحد الأدنى للعمر، الكيلومترات، الوقود، التأمين، '
        + 'الإلغاء — اسأل عنه عند الاستفسار وستحصل على الجواب قبل أن تؤكد أي '
        + 'شيء. ولا يُدفع شيء مسبقاً.',
      confirmedTitle: 'هذا مؤكد',
      sections: [
        {
          title: 'الحجز والدفع',
          items: [
            'يُؤكَّد الحجز بمكالمة أو رسالة نصية أو عبر واتساب.',
            'بطاقة الائتمان غير مطلوبة. ولا نطلب رقم البطاقة مسبقاً.',
            'يُدفع الإيجار عند استلام السيارة — نقداً أو ببطاقة مصرفية.',
            'يُتفق على المبلغ الإجمالي قبل الحجز، بلا بنود تُضاف لاحقاً.',
          ],
        },
        {
          title: 'التأمين',
          items: [
            'مبلغ التأمين 400,00 مارك أي 200 يورو.',
            'يُترك عند استلام السيارة.',
            'يُعاد بالكامل عند إعادة السيارة سليمة وبالحالة التي استُلمت بها.',
          ],
        },
        {
          title: 'الاستلام والإعادة',
          items: [
            'الاستلام في مكتبنا: Dr. Irfana Ljubijankića 139، بيهاتش.',
            'التوصيل إلى عنوان أو فندق أو مطار بترتيب مسبق.',
            'تُفحص حالة السيارة وتُسجَّل معاً عند الاستلام وعند الإعادة.',
            'ساعات العمل 08:00 – 18:00. والاستلام خارجها ممكن بترتيب مسبق.',
          ],
        },
        {
          title: 'مغادرة البلاد',
          items: [
            'يُعلَن عن إخراج السيارة من البوسنة والهرسك قبل الحجز.',
            'نجهّز البطاقة الخضراء وإذناً خطياً لعبور الحدود.',
            'أخبرنا بالوجهة مسبقاً لا يوم الاستلام.',
          ],
        },
      ],
    },
    contact: {
      metaTitle: 'اتصل بنا | Rent a Car Gogo بيهاتش',
      metaDescription:
        'Rent a Car Gogo، شارع Dr. Irfana Ljubijankića 139، بيهاتش. هاتف 061 '
        + '798 203، ساعات العمل 08:00 – 18:00.',
      title: 'اتصل بنا',
      lead:
        'الأسرع هو الهاتف أو واتساب. أرسل التواريخ وعدد الركاب ومكان الاستلام '
        + '— ونرتّب الباقي في رسالة واحدة.',
      mapTitle: 'أين نحن',
      directionsTitle: 'كيف تصل إلينا',
      directionsBody:
        'نحن على الطريق الرئيسي في بيهاتش، في حي أوزيميتسه الأول، ضمن صف '
        + 'المحلات التجارية. لافتة RENT-A-CAR على الواجهة فوق المدخل، وأمام '
        + 'المبنى موقف للسيارات. قادماً من المركز، سر في شارع Dr. Irfana '
        + 'Ljubijankića باتجاه أوزيميتسه — نحن على اليمين.',
    },
  },
}

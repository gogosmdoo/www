import type { LocaleMessages } from '../types'

/*
 * English — translated from bs.ts, which is the master. Re-read against it
 * whenever the Bosnian changes.
 *
 * The English reader is usually a traveller who has landed at Zagreb or Zadar
 * and is heading for Plitvice or the Una valley, so this locale front-loads the
 * two facts that decide it for them: the distances, and that they will not need
 * the credit card the airport desks insist on.
 */
export const en: LocaleMessages = {
  meta: {
    title: 'Rent a Car Gogo Bihać — car hire with no credit card',
    description:
      'Car hire in Bihać with no credit card required. Deposit 400 KM (€200), '
      + 'refunded in full. Delivery to your address, hotel or airport. Rated 5.0.',
    ogImageAlt: 'A Rent a Car Gogo vehicle on the road above the Una river near Bihać',
  },

  nav: {
    fleet: 'Cars',
    about: 'About',
    terms: 'Terms',
    blog: 'Guides',
    contact: 'Contact',
    prices: 'Prices',
    services: 'With a driver',
    airport: 'Airport delivery',
    plitvice: 'Plitvice Lakes',
    una: 'Una National Park',
    book: 'Enquire',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    langLabel: 'Language',
  },

  hero: {
    eyebrow: 'Bihać · Una National Park · Plitvice Lakes',
    titleLead: 'Hire a car in Bihać',
    titleAccent: 'with no credit card.',
    titleTail: '',
    subtitle:
      'The deposit is 400 KM (€200) and you get all of it back. Confirm by call '
      + 'or message, and pay in cash when you pick the car up.',
    imageAlt:
      'A grey Rent a Car Gogo vehicle on a road above the Una river near Bihać '
      + 'in morning light',
    proof: [
      'We bring the car to your address, hotel or airport, by prior arrangement',
      'No hidden costs — you get the total before you confirm',
    ],
  },

  enquiry: {
    title: 'Check availability',
    note: 'We reply during opening hours, usually within minutes.',
    dates: 'Dates',
    datesPlaceholder: 'e.g. 12 – 19 July',
    people: 'Passengers',
    peoplePlaceholder: 'e.g. 4',
    pickup: 'Pick-up point',
    pickupPlaceholder: 'Bihać, hotel, airport…',
    car: 'Vehicle',
    carAny: 'No preference — suggest one',
    submit: 'Send enquiry on WhatsApp',
    intro: 'Hello! I would like to enquire about hiring a car.',
    reassure: 'No commitment. You get a price before you agree to anything.',
  },

  facts: [
    { value: '5.0', label: 'average rating on Google' },
    { value: '11', label: 'cars — from a city hatchback to a minibus' },
    { value: '400 KM', label: 'deposit, refunded in full' },
    { value: '35 km', label: 'from us to the Plitvice Lakes' },
  ],

  benefits: {
    title: 'Three things that usually complicate car hire — not here',
    intro:
      'These are the questions that make people abandon a booking. So we answer '
      + 'them here, not in the small print.',
    items: [
      {
        title: 'No credit card',
        body:
          'You confirm by call or message — we do not need a card number up '
          + 'front. You pay in cash when you collect the car. Nothing is blocked '
          + 'and nothing is charged before you are sitting in it.',
      },
      {
        title: 'A 400 KM deposit, and not a mark more',
        body:
          'The deposit is 400 KM, or €200. You get all of it back when you '
          + 'return the car undamaged and in the condition you took it. No '
          + 'handling fees and no deductions you did not see in advance.',
      },
      {
        title: 'The car comes to you',
        body:
          'Bihać has no airport, so we do not pretend to run a desk in a '
          + 'terminal. We do the opposite: we bring the car to your address, to '
          + 'your hotel, or we meet you at whichever airport you land at — by '
          + 'prior arrangement. You pick the place and the time in advance.',
      },
    ],
  },

  reviews: {
    title: 'Rated 5.0 — by people who actually drove',
    intro:
      'The reviews below are public and unedited. Each one links to its original '
      + 'on Google Maps, so you can check them without taking our word for it.',
    ratingLabel: 'Rating on Google',
    ratingCount: 'based on {n} reviews',
    onGoogle: 'on Google',
    translatedNote: 'Translated by Google',
    readOnGoogle: 'Read on Google',
    allReviews: 'All reviews on Google Maps',
  },

  fleet: {
    eyebrow: 'The fleet',
    title: 'Eleven cars. Every photo taken outside our own office.',
    intro:
      'No catalogue renders and no stock photography: these are our cars, as you '
      + 'will collect them, with Bihać plates and our shopfront behind them. If '
      + 'you are not sure what you need, tell us how many people and how much '
      + 'luggage, and we will suggest one.',
    book: 'Check availability',
    bookMessage: 'Hello! I would like to enquire about the {car}.',
    seats: '{n} seats',
    seatsUnknown: 'Seats on request',
    transmissionUnknown: 'Transmission on request',
    all: 'All cars',
    railHint: 'Swipe for more cars',
    categories: {
      all: 'All cars',
      city: 'City',
      estate: 'Estate',
      suv: 'SUV',
      van: 'Minibus',
      sport: 'Sport',
      business: 'Business',
    },
    specs: {
      comfort: 'Comfortable',
      longTrips: 'Good for long drives',
      business: 'Business travel',
      luggage: 'Large boot',
      family: 'Family friendly',
      group: 'For groups',
      transfer: 'Transfers',
      sport: 'Lively to drive',
      economy: 'Low fuel use',
      cityDrive: 'Easy in town',
      easyParking: 'Easy to park',
      highSeat: 'Raised seating position',
    },
    imageAlt: '{name} ({colour}) outside the Rent a Car Gogo office in Bihać',
  },

  steps: {
    eyebrow: 'How it works',
    title: 'From the first call to handing the keys back',
    intro: 'Five steps, with no surprises in between.',
    items: [
      {
        label: 'Before you book',
        body:
          'Tell us the dates, how many of you there are, and where you want to '
          + 'collect the car. We suggest a vehicle and give you the total price — '
          + 'not a daily rate that grows later. If you plan to leave Bosnia and '
          + 'Herzegovina, say so straight away, because that needs extra '
          + 'paperwork.',
      },
      {
        label: 'Booking',
        body:
          'You confirm by call, message or WhatsApp. We do not ask for a credit '
          + 'card number and we charge nothing in advance. A name, a phone number '
          + 'and the dates are enough.',
      },
      {
        label: 'Collection',
        body:
          'Collect from us at Dr. Irfana Ljubijankića 139 in Bihać, or we deliver '
          + 'to an agreed address. We check the car over together and record its '
          + 'condition, you sign the contract, leave the 400 KM deposit and pay '
          + 'for the hire — in cash.',
      },
      {
        label: 'During the hire',
        body:
          'The number you call belongs to the same person who handed you the '
          + 'keys. If anything happens — breakdown, tyre, accident — call us '
          + 'before you call anyone else. To extend, let us know a day ahead if '
          + 'you can.',
      },
      {
        label: 'Return',
        body:
          'Return the car where you collected it, or to an agreed place. We look '
          + 'it over together, and if it is undamaged and in the condition you '
          + 'took it, the 400 KM deposit comes back in full, on the spot.',
      },
    ],
  },

  locations: {
    title: 'Wherever your trip starts',
    intro:
      'Our office is on the main road through Bihać, near the City Centar, with '
      + 'parking outside. But you do not have to come to us — usually we come to '
      + 'you.',
    items: [
      {
        title: 'At our office in Bihać',
        body:
          'Dr. Irfana Ljubijankića 139, in the parade of shops with the butcher, '
          + 'near the City Centar. On the main road, easy to find, somewhere to '
          + 'park.',
        meta: 'City Centar',
      },
      {
        title: 'To your address or hotel',
        body:
          'We deliver to an address in Bihać and the surrounding area at an '
          + 'agreed time. The same goes for the return — no trip to the office '
          + 'needed.',
        meta: 'Bihać and around',
      },
      {
        title: 'To the airport you land at',
        body:
          'Bihać has no airport. The nearest are Zadar, about 150 km and two and '
          + 'a half hours away, and Zagreb, about 165 km and a little under three '
          + 'hours. We can meet you at either — send us the flight number.',
        meta: 'Zagreb · Zadar',
      },
      {
        title: 'Towards the border and beyond',
        body:
          'The Izačić crossing is 13 kilometres away, about 25 minutes. If you '
          + 'plan to cross into Croatia, tell us before you book so we can '
          + 'prepare the green card and written permission to take the car out.',
        meta: '13 km to the border',
      },
    ],
    mapsLink: 'Open in Google Maps',
    addressNote: 'Opening hours: Monday – Saturday, 08:00 – 18:00',
  },

  why: {
    eyebrow: 'Why us',
    title: 'A small agency, on purpose',
    intro:
      'No call centre, no queue at a desk, no six-page contract. Eleven cars and '
      + 'people who know them.',
    items: [
      {
        title: 'One person, from the call to the keys',
        body:
          'Whoever answers the phone is the person who hands you the car and '
          + 'takes it back. You will not explain your situation to a third agent.',
      },
      {
        title: 'The price you are quoted is the price you pay',
        body:
          'We agree the total before you book. No booking fee, no contract '
          + 'administration charge, no line items that appear at the end.',
      },
      {
        title: 'We know the roads you are hiring for',
        body:
          'The Una, Plitvice, Štrbački buk, the road to the coast and the road to '
          + 'Zagreb — these are drives we make ourselves. Ask us before you set '
          + 'off.',
      },
      {
        title: 'Cars ready for the road',
        body:
          'Serviced and cleaned before every hire. We record the condition '
          + 'together with you at collection, so there is nothing to argue about '
          + 'at the return.',
      },
    ],
  },

  driver: {
    title: 'Drive yourself, or take one of our drivers',
    intro:
      'Both are available. Which one suits usually depends on whether the trip is '
      + 'work or a holiday.',
    withDriver: {
      title: 'With a driver',
      body:
        'For airport transfers, business arrivals and groups who would rather not '
        + 'think about parking, borders and unfamiliar roads.',
      points: [
        'Transfers from Zagreb and Zadar airports',
        'Business meetings and full-day bookings',
        'Groups and family trips by minibus',
        'A driver who knows the local roads and the crossings',
      ],
    },
    selfDrive: {
      title: 'Without a driver',
      body:
        'Standard hire: take the keys and drive yourself, at your own pace and to '
        + 'your own plan.',
      points: [
        '400 KM deposit, refunded in full',
        'No credit card',
        'Delivery to an agreed place',
        'Travel abroad possible if arranged in advance',
      ],
    },
    cta: 'Arrange a driver',
  },

  faq: {
    title: 'What people ask before every booking',
    intro: 'If your question is not here, call — it is quicker than you think.',
    items: [
      {
        q: 'Do I need a credit card to book?',
        a:
          'No. You confirm by call or message, with no card number. You pay for '
          + 'the hire in cash when you collect the car.',
      },
      {
        q: 'How much is the deposit and when do I get it back?',
        a:
          'The deposit is 400 KM, or €200. It comes back in full the moment you '
          + 'return the car, provided it is undamaged and in the condition you '
          + 'took it.',
      },
      {
        q: 'Can you bring the car to my address?',
        a:
          'Yes, but only by prior arrangement. We deliver to addresses in Bihać '
          + 'and the surrounding area, to hotels, or we meet you at Zagreb or '
          + 'Zadar airport. Tell us the place and time before you book; for '
          + 'delivery outside Bihać we agree the terms at the same time.',
      },
      {
        q: 'How do I pay?',
        a:
          'In cash, when you collect the car. You know the total '
          + 'before you confirm the booking.',
      },
      {
        q: 'Can I take the car into Croatia?',
        a:
          'Taking the car out of Bosnia and Herzegovina is possible, but it is '
          + 'arranged in advance — we prepare a green card and written '
          + 'permission. Tell us your destination before you book, not on the day '
          + 'of collection. The Izačić crossing is 13 kilometres from us.',
      },
      {
        q: 'What are your opening hours?',
        a:
          'The office is open 08:00 to 18:00. Collection and return outside those '
          + 'hours can be arranged — just let us know in advance.',
      },
      {
        q: 'What if I break down or get a puncture?',
        a:
          'Call us before you call anyone else, on the same number you booked on. '
          + 'Depending on where you are and what has happened, we will arrange a '
          + 'replacement car or roadside assistance.',
      },
      {
        q: 'Where exactly are you?',
        a:
          'Dr. Irfana Ljubijankića 139 in Bihać, near the City Centar, on '
          + 'the main road in the parade of shops. There is parking outside.',
      },
    ],
  },

  blog: {
    eyebrow: 'Guides',
    title: 'Before you set off',
    intro:
      'Short pieces on what we get asked most: what to bring to the handover, and '
      + 'where it is worth driving from Bihać.',
    readMore: 'Read the guide',
    backToBlog: 'Back to guides',
    published: 'Published',
    readingTime: '{n} min read',
    allPosts: 'All guides',
    ctaTitle: 'Ready to go?',
    ctaBody:
      'Send us your dates and how many of you there are. We will suggest a car '
      + 'and a price the same day.',
  },

  contact: {
    title: 'Get in touch',
    intro:
      'Phone or WhatsApp is quickest. If you would rather write, fill in the form '
      + 'and we will call you back.',
    callTitle: 'Call us',
    callBody: 'Weekdays 08:00 to 18:00',
    whatsappTitle: 'WhatsApp',
    whatsappBody: 'Send your dates and passenger count — we reply by message',
    addressTitle: 'Address',
    hoursTitle: 'Opening hours',
    hoursNote: 'Collection outside opening hours can be arranged in advance.',
    formTitle: 'Send an enquiry',
    formNote: 'We reply during opening hours. An enquiry commits you to nothing.',
    name: 'Name',
    namePlaceholder: 'Your name',
    phone: 'Phone',
    phonePlaceholder: '+44 …',
    pickup: 'Pick-up point',
    pickupPlaceholder: 'Bihać, hotel, airport…',
    message: 'Message',
    messagePlaceholder:
      'Dates, how many passengers, how much luggage, and whether you plan to '
      + 'leave the country.',
    submit: 'Send enquiry',
    sending: 'Sending…',
    sent: 'Thank you — we will be in touch shortly.',
    errorRequired: 'Please enter your name and phone number.',
    errorSend: 'Could not send. Please call us or message on WhatsApp.',
    whatsappAlt: 'Rather use WhatsApp',
  },

  footer: {
    tagline:
      'Car hire in Bihać — no credit card, and a deposit you actually get back.',
    navigation: 'Pages',
    contact: 'Contact',
    followUs: 'Follow us',
    rights: 'All rights reserved.',
    footerNav: 'Footer navigation',
    note:
      'Bihać has no airport — we bring the car to your address, your hotel, or to '
      + 'Zagreb and Zadar airports, by prior arrangement.',
  },

  whatsappFab: 'WhatsApp',
  callFab: 'Call',
  hours: 'Monday – Saturday, 08:00 – 18:00',
  hoursShort: '08:00 – 18:00',
  skipToContent: 'Skip to content',
  breadcrumbHome: 'Home',
}

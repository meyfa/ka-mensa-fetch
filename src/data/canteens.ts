import type { Canteen } from '../types/canteen.js'

export const canteens: Canteen[] = [
  {
    id: 'adenauerring',
    name: 'Mensa Am Adenauerring',
    lines: [
      {
        id: 'l1',
        name: 'Linie 1',
        alternativeNames: [
          'Linie 1 To-Go',
          'Linie 1 BOOK A MENSA',
          'Linie 1 Gut & Günstig'
        ]
      },
      {
        id: 'l2',
        name: 'Linie 2',
        alternativeNames: [
          'Linie 2 To-Go',
          'Linie 2 BOOK A MENSA',
          'Linie 2 Gut & Günstig',
          'Linie 2 vegane Linie',
          'Vegane Linie'
        ]
      },
      {
        id: 'l3',
        name: 'Linie 3'
      },
      {
        id: 'l45',
        name: 'Linie 4/5',
        alternativeNames: [
          'Linie 4',
          'Linie 4/5 G&G-Gerichte To-Go'
        ]
      },
      {
        id: 'l5',
        name: 'Linie 5',
        alternativeNames: [
          'Linie 5 To-Go',
          'Linie 5 Vegane Linie'
        ]
      },
      {
        id: 'schnitzelbar',
        name: 'Schnitzelbar',
        alternativeNames: [
          'Schnitzel-Burger-Bar',
          'Schnitzel-/ Burgerbar'
        ]
      },
      {
        id: 'update',
        name: 'L6 Update',
        alternativeNames: [
          'Linie 6'
        ]
      },
      {
        id: 'abend',
        name: 'Spätausgabe und Abendessen'
      },
      {
        id: 'aktion',
        name: '[kœri]werk',
        alternativeNames: [
          '[kœri]werk 11-14 Uhr',
          '[kœri]werk 11-14:30 Uhr',
          '[kœri]werk 11-14 Uhr To-Go'
        ]
      },
      {
        id: 'heisstheke',
        name: 'Cafeteria Heiße Theke',
        alternativeNames: [
          'Cafeteria',
          'Cafeteria 11-14 Uhr'
        ]
      },
      {
        id: 'nmtisch',
        name: 'Cafeteria ab 14:30',
        alternativeNames: [
          'Cafeteria 11-14 Uhr To-Go'
        ]
      },
      {
        id: 'pizza',
        name: '[pizza]werk Pizza',
        alternativeNames: [
          '[pizza]werk Pizza 11:30-14:30 Uhr To-Go',
          '[pizza]werk Pizza 11:30-13:30 Uhr To-Go',
          '[pizza]werk Pizza 11-14 Uhr To-Go',
          '[pizza]werk Pizza 11-14 Uhr'
        ]
      },
      {
        id: 'pasta',
        name: '[pizza]werk Pasta'
      },
      {
        id: 'salat_dessert',
        name: '[pizza]werk Salate / Vorspeisen'
      }
    ]
  },
  {
    id: 'moltke',
    name: 'Mensa Moltke',
    lines: [
      {
        id: 'wahl1',
        name: 'Wahlessen 1'
      },
      {
        id: 'wahl2',
        name: 'Wahlessen 2'
      },
      {
        id: 'aktion',
        name: 'Aktionstheke'
      },
      {
        id: 'gut',
        name: 'Gut & Günstig'
      },
      {
        id: 'buffet',
        name: 'Buffet'
      },
      {
        id: 'schnitzelbar',
        name: 'Schnitzelbar'
      },
      {
        id: 'curryqueen',
        name: '[Kœri]werk'
      }
    ]
  },
  {
    id: 'x1moltkestrasse',
    name: 'Menseria Moltkestraße 30',
    lines: [
      {
        id: 'gut',
        name: 'Gut & Günstig'
      }
    ]
  },
  {
    id: 'erzberger',
    name: 'Mensa Erzbergerstraße',
    lines: [
      {
        id: 'wahl1',
        name: 'Wahlessen 1'
      },
      {
        id: 'wahl2',
        name: 'Wahlessen 2'
      },
      {
        id: 'wahl3',
        name: 'Wahlessen 3'
      }
    ]
  },
  {
    id: 'gottesaue',
    name: 'Menseria Schloss Gottesaue',
    lines: [
      {
        id: 'wahl1',
        name: 'Wahlessen 1'
      },
      {
        id: 'wahl2',
        name: 'Wahlessen 2'
      }
    ]
  },
  {
    id: 'tiefenbronner',
    name: 'Mensa Tiefenbronnerstraße',
    lines: [
      {
        id: 'wahl1',
        name: 'Wahlessen 1'
      },
      {
        id: 'wahl2',
        name: 'Wahlessen 2'
      },
      {
        id: 'gut',
        name: 'Gut & Günstig'
      },
      {
        id: 'buffet',
        name: 'Buffet'
      },
      {
        id: 'curryqueen',
        name: '[Kœri]werk'
      }
    ]
  },
  {
    id: 'holzgarten',
    name: 'Mensa Holzgartenstraße',
    lines: [
      {
        id: 'gut1',
        name: 'Gut & Günstig 1',
        alternativeNames: [
          'Wahlessen 1'
        ]
      },
      {
        id: 'gut2',
        name: 'Gut & Günstig 2',
        alternativeNames: [
          'Wahlessen 2'
        ]
      }
    ]
  }
]

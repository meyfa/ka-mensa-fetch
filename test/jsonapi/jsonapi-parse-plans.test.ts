import assert from 'node:assert'
import { parsePlans } from '../../src/jsonapi/jsonapi-parse-plans.js'

describe('jsonapi/jsonapi-parse-plans', function () {
  it('can handle empty plan', function () {
    const data = {}
    const obj = parsePlans(data, new Date(2020, 7, 11))
    assert.deepStrictEqual(obj, [])
  })

  it('can handle empty canteen objects', function () {
    const data = {
      adenauerring: {},
      moltke: {}
    }
    const obj = parsePlans(data, new Date(2020, 7, 11))
    assert.deepStrictEqual(obj, [])
  })

  it('can handle closed lines and nodata', function () {
    const data = {
      adenauerring: {
        1597096800: {
          l1: [{ closing_start: 1596232800, closing_end: 1598824800 }],
          l2: [{ nodata: true }]
        }
      }
    }
    const obj = parsePlans(data, new Date(2020, 7, 10))
    assert.ok(Array.isArray(obj))
    assert.strictEqual(obj.length, 1)
    assert.deepStrictEqual(obj[0].lines, [
      {
        id: 'l1',
        name: 'Linie 1',
        meals: []
      },
      {
        id: 'l2',
        name: 'Linie 2',
        meals: []
      }
    ])
  })

  it('parses timestamp, canteen id, includes canteen name', function () {
    const data = {
      adenauerring: {
        1597096800: {
          l1: [{ nodata: true }]
        }
      }
    }
    const obj = parsePlans(data, new Date(2020, 7, 10))
    assert.ok(Array.isArray(obj))
    assert.strictEqual(obj.length, 1)
    assert.deepStrictEqual(obj[0].date, {
      day: 11,
      month: 7,
      year: 2020
    })
    assert.strictEqual(obj[0].id, 'adenauerring')
    assert.strictEqual(obj[0].name, 'Mensa Am Adenauerring')
  })

  it('uses overridden canteen name if provided', function () {
    const data = {
      adenauerring: {
        1597096800: {
          l1: [{ nodata: true }]
        }
      }
    }
    const metadata = [{ id: 'adenauerring', name: 'override', lines: [] }]
    const obj = parsePlans(data, new Date(2020, 7, 10), metadata)
    assert.ok(Array.isArray(obj))
    assert.strictEqual(obj.length, 1)
    assert.strictEqual(obj[0].id, 'adenauerring')
    assert.strictEqual(obj[0].name, 'override')
  })

  it('parses line id, includes line name', function () {
    const data = {
      adenauerring: {
        1597096800: {
          l1: [{ nodata: true }]
        }
      }
    }
    const obj = parsePlans(data, new Date(2020, 7, 10))
    assert.ok(Array.isArray(obj))
    assert.strictEqual(obj.length, 1)
    assert.strictEqual(obj[0].lines[0].id, 'l1')
    assert.strictEqual(obj[0].lines[0].name, 'Linie 1')
  })

  it('uses overridden line name if provided', function () {
    const data = {
      adenauerring: {
        1597096800: {
          l1: [{ nodata: true }]
        }
      }
    }
    const metadata = [{
      id: 'adenauerring',
      name: 'Mensa Am Adenauerring',
      lines: [{ id: 'l1', name: 'override' }]
    }]
    const obj = parsePlans(data, new Date(2020, 7, 11), metadata)
    assert.ok(Array.isArray(obj))
    assert.strictEqual(obj.length, 1)
    assert.ok(Array.isArray(obj[0].lines))
    assert.strictEqual(obj[0].lines.length, 1)
    assert.strictEqual(obj[0].lines[0].id, 'l1')
    assert.strictEqual(obj[0].lines[0].name, 'override')
  })

  it('formats meal name correctly', function () {
    const makeData = (meal: string, dish: string): object => ({
      adenauerring: {
        1597096800: {
          aktion: [
            {
              meal,
              dish,
              add: [],
              bio: false,
              fish: false,
              pork: false,
              pork_aw: false,
              cow: false,
              cow_aw: false,
              vegan: false,
              veg: false,
              mensa_vit: false,
              info: '',
              price_1: 2,
              price_2: 2.2,
              price_3: 2.2,
              price_4: 2.2,
              price_flag: 0
            }
          ]
        }
      }
    })
    const obj1 = parsePlans(makeData('foo bar', ''), new Date(2020, 7, 10))
    assert.ok(Array.isArray(obj1))
    assert.strictEqual(obj1.length, 1)
    assert.ok(Array.isArray(obj1[0].lines))
    assert.strictEqual(obj1[0].lines.length, 1)
    assert.ok(Array.isArray(obj1[0].lines[0].meals))
    assert.strictEqual(obj1[0].lines[0].meals.length, 1)
    assert.strictEqual(obj1[0].lines[0].meals[0].name, 'foo bar')
    const obj2 = parsePlans(makeData('foo bar', 'baz qux'), new Date(2020, 7, 10))
    assert.strictEqual(obj2[0].lines[0].meals[0].name, 'foo bar baz qux')
  })

  it('formats meal price with info', function () {
    // eslint-disable-next-line camelcase
    const makeData = (price_1: number, info: string): object => ({
      adenauerring: {
        1597096800: {
          aktion: [
            {
              meal: 'foo',
              dish: '',
              add: [],
              bio: false,
              fish: false,
              pork: false,
              pork_aw: false,
              cow: false,
              cow_aw: false,
              vegan: false,
              veg: false,
              mensa_vit: false,
              info,
              // eslint-disable-next-line camelcase
              price_1,
              price_2: 2.2,
              price_3: 2.2,
              price_4: 2.2,
              price_flag: 0
            }
          ]
        }
      }
    })
    const obj1 = parsePlans(makeData(1.73, ''), new Date(2020, 7, 10))
    assert.strictEqual(obj1[0].lines[0].meals[0].price, '1,73 €')
    const obj2 = parsePlans(makeData(1.73, 'ab'), new Date(2020, 7, 10))
    assert.strictEqual(obj2[0].lines[0].meals[0].price, '(ab) 1,73 €')
  })

  it('uses empty string for price of 0', function () {
    const data = {
      adenauerring: {
        1597096800: {
          heisstheke: [
            {
              meal: 'TO GO von 8:00 Uhr bis 14:00 Uhr',
              dish: '',
              add: [],
              bio: false,
              fish: false,
              pork: false,
              pork_aw: false,
              cow: false,
              cow_aw: false,
              vegan: false,
              veg: false,
              mensa_vit: false,
              info: '',
              price_1: 0,
              price_2: 0,
              price_3: 0,
              price_4: 0,
              price_flag: 0
            }
          ]
        }
      }
    }
    const obj = parsePlans(data, new Date(2020, 7, 10))
    assert.strictEqual(obj[0].lines[0].meals[0].price, '')
  })

  it('detects classifiers', function () {
    const data = {
      adenauerring: {
        1597096800: {
          aktion: [
            {
              meal: 'foo',
              dish: '',
              add: [],
              bio: true,
              fish: false,
              pork: false,
              pork_aw: false,
              cow: false,
              cow_aw: false,
              vegan: true,
              veg: false,
              mensa_vit: true,
              info: '',
              price_1: 2,
              price_2: 2.2,
              price_3: 2.2,
              price_4: 2.2,
              price_flag: 0
            }
          ]
        }
      }
    }
    const obj = parsePlans(data, new Date(2020, 7, 10))
    const classifiers = obj[0].lines[0].meals[0].classifiers
    assert.strictEqual(classifiers.length, 3)
    assert.ok(classifiers.includes('B'))
    assert.ok(classifiers.includes('MV'))
    assert.ok(classifiers.includes('VG'))
  })

  it('includes additives', function () {
    const data = {
      adenauerring: {
        1597096800: {
          aktion: [
            {
              meal: 'foo',
              dish: '',
              add: ['Ei', '', 'Fi', ''],
              bio: false,
              fish: false,
              pork: false,
              pork_aw: false,
              cow: false,
              cow_aw: false,
              vegan: false,
              veg: false,
              mensa_vit: false,
              info: '',
              price_1: 2,
              price_2: 2.2,
              price_3: 2.2,
              price_4: 2.2,
              price_flag: 0
            }
          ]
        }
      }
    }
    const obj = parsePlans(data, new Date(2020, 7, 10))
    const additives = obj[0].lines[0].meals[0].additives
    assert.strictEqual(additives.length, 2)
    assert.ok(additives.includes('Ei'))
    assert.ok(additives.includes('Fi'))
  })

  it('does not include unreliable data', function () {
    const data = {
      adenauerring: {
        // 1 day before
        1597010400: {
          l1: [{ nodata: true }]
        },
        // same day
        1597096800: {
          l1: [{ nodata: true }]
        },
        // next day
        1597183200: {
          l1: [{ nodata: true }]
        }
      }
    }
    const obj = parsePlans(data, new Date(2020, 7, 11))
    assert.ok(Array.isArray(obj))
    assert.strictEqual(obj.length, 2)
    assert.deepStrictEqual(obj[0].date, {
      day: 11,
      month: 7,
      year: 2020
    })
    assert.deepStrictEqual(obj[1].date, {
      day: 12,
      month: 7,
      year: 2020
    })
  })

  it('ignores unknown canteen ids', function () {
    const data = {
      unknown: {
        1597096800: {
          l1: [{ nodata: true }]
        }
      }
    }
    const obj = parsePlans(data, new Date(2020, 7, 11))
    assert.deepStrictEqual(obj, [])
  })

  it('ignores unknown line ids', function () {
    const data = {
      adenauerring: {
        1597096800: {
          unknown: [{ nodata: true }]
        }
      }
    }
    const obj = parsePlans(data, new Date(2020, 7, 11))
    assert.ok(Array.isArray(obj))
    assert.strictEqual(obj.length, 1)
    assert.deepStrictEqual(obj[0].lines, [])
  })
})

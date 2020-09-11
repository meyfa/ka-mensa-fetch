'use strict'

const { expect } = require('chai')

const parse = require('../../src/jsonapi/jsonapi-parse-plans.js')

describe('jsonapi/jsonapi-parse-plans.js', function () {
  it('can handle empty plan', function () {
    const data = {}
    const obj = parse(data, new Date(2020, 7, 11))
    expect(obj).to.deep.equal([])
  })

  it('can handle empty canteen objects', function () {
    const data = {
      adenauerring: {},
      moltke: {}
    }
    const obj = parse(data, new Date(2020, 7, 11))
    expect(obj).to.deep.equal([])
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
    const obj = parse(data, new Date(2020, 7, 10))
    expect(obj).to.be.an('array').with.lengthOf(1)
    expect(obj[0].lines).to.deep.equal([
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
    const obj = parse(data, new Date(2020, 7, 10))
    expect(obj).to.be.an('array').with.lengthOf(1)
    expect(obj[0].date).to.deep.equal({
      day: 11,
      month: 7,
      year: 2020
    })
    expect(obj[0].id).to.equal('adenauerring')
    expect(obj[0].name).to.equal('Mensa Am Adenauerring')
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
    const obj = parse(data, new Date(2020, 7, 10), metadata)
    expect(obj).to.be.an('array').with.lengthOf(1)
    expect(obj[0].id).to.equal('adenauerring')
    expect(obj[0].name).to.equal('override')
  })

  it('parses line id, includes line name', function () {
    const data = {
      adenauerring: {
        1597096800: {
          l1: [{ nodata: true }]
        }
      }
    }
    const obj = parse(data, new Date(2020, 7, 10))
    expect(obj).to.be.an('array').with.lengthOf(1)
    expect(obj[0].lines).to.be.an('array').with.lengthOf(1)
    expect(obj[0].lines[0].id).to.equal('l1')
    expect(obj[0].lines[0].name).to.equal('Linie 1')
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
    const obj = parse(data, new Date(2020, 7, 11), metadata)
    expect(obj).to.be.an('array').with.lengthOf(1)
    expect(obj[0].lines).to.be.an('array').with.lengthOf(1)
    expect(obj[0].lines[0].id).to.equal('l1')
    expect(obj[0].lines[0].name).to.equal('override')
  })

  it('formats meal name correctly', function () {
    const makeData = (meal, dish) => ({
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
    const obj1 = parse(makeData('foo bar', ''), new Date(2020, 7, 10))
    expect(obj1).to.be.an('array').with.lengthOf(1)
    expect(obj1[0].lines).to.be.an('array').with.lengthOf(1)
    expect(obj1[0].lines[0].meals).to.be.an('array').with.lengthOf(1)
    expect(obj1[0].lines[0].meals[0].name).to.equal('foo bar')
    const obj2 = parse(makeData('foo bar', 'baz qux'), new Date(2020, 7, 10))
    expect(obj2[0].lines[0].meals[0].name).to.equal('foo bar baz qux')
  })

  it('formats meal price with info', function () {
    // eslint-disable-next-line camelcase
    const makeData = (price_1, info) => ({
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
    const obj1 = parse(makeData(1.73, ''), new Date(2020, 7, 10))
    expect(obj1[0].lines[0].meals[0].price).to.equal('1,73 €')
    const obj2 = parse(makeData(1.73, 'ab'), new Date(2020, 7, 10))
    expect(obj2[0].lines[0].meals[0].price).to.equal('(ab) 1,73 €')
  })

  it('uses empty string for price of 0', function () {
    // eslint-disable-next-line camelcase
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
    const obj = parse(data, new Date(2020, 7, 10))
    expect(obj[0].lines[0].meals[0].price).to.equal('')
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
    const obj = parse(data, new Date(2020, 7, 10))
    expect(obj[0].lines[0].meals[0].classifiers).to.have.members(['B', 'MV', 'VG'])
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
    const obj = parse(data, new Date(2020, 7, 10))
    expect(obj[0].lines[0].meals[0].additives).to.have.members(['Ei', 'Fi'])
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
    const obj = parse(data, new Date(2020, 7, 11))
    expect(obj).to.be.an('array').with.lengthOf(2)
    expect(obj[0].date).to.deep.equal({
      day: 11,
      month: 7,
      year: 2020
    })
    expect(obj[1].date).to.deep.equal({
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
    const obj = parse(data, new Date(2020, 7, 11))
    expect(obj).to.deep.equal([])
  })

  it('ignores unknown line ids', function () {
    const data = {
      adenauerring: {
        1597096800: {
          unknown: [{ nodata: true }]
        }
      }
    }
    const obj = parse(data, new Date(2020, 7, 11))
    expect(obj).to.be.an('array').with.lengthOf(1)
    expect(obj[0].lines).to.deep.equal([])
  })
})

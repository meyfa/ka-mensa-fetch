import parse from '../../src/jsonapi/jsonapi-parse-metadata'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('jsonapi/jsonapi-parse-metadata', function () {
  it('can handle empty root', function () {
    const data = {}
    const obj = parse(data)
    expect(obj).to.deep.equal([])
  })

  it('can handle empty mensa object', function () {
    const data = {
      mensa: {}
    }
    const obj = parse(data)
    expect(obj).to.deep.equal([])
  })

  it('sets canteen id and name', function () {
    const data = {
      mensa: {
        adenauerring: { name: 'A' },
        moltke: { name: 'M' }
      }
    }
    const obj = parse(data)
    expect(obj).to.deep.equal([
      { id: 'adenauerring', name: 'A', lines: [] },
      { id: 'moltke', name: 'M', lines: [] }
    ])
  })

  it('includes line name, id', function () {
    const data = {
      mensa: {
        adenauerring: {
          name: 'A',
          lines: { l1: 'Linie 1', l2: 'Linie 2' }
        },
        moltke: {
          name: 'M',
          lines: { wahl1: 'Wahlessen 1' }
        }
      }
    }
    const obj = parse(data)
    expect(obj).to.deep.equal([
      {
        id: 'adenauerring',
        name: 'A',
        lines: [{ id: 'l1', name: 'Linie 1' }, { id: 'l2', name: 'Linie 2' }]
      },
      {
        id: 'moltke',
        name: 'M',
        lines: [{ id: 'wahl1', name: 'Wahlessen 1' }]
      }
    ])
  })
})

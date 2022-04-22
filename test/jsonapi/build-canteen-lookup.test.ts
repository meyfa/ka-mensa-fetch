import { buildCanteenLookup } from '../../src/jsonapi/build-canteen-lookup.js'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('jsonapi/build-canteen-lookup', function () {
  it('creates a map for base array', function () {
    const base = [
      {
        id: 'a',
        name: 'A',
        lines: [
          { id: 'a1', name: 'A1' },
          { id: 'a2', name: 'A2' }
        ]
      },
      {
        id: 'b',
        name: 'B',
        lines: [
          { id: 'b1', name: 'B1' }
        ]
      }
    ]

    const result = buildCanteenLookup(base)

    expect([...result.keys()]).to.have.members(['a', 'b'])

    const a = result.get('a') as any
    expect(a.id).to.equal('a')
    expect(a.name).to.equal('A')
    expect([...a.lines.keys()]).to.have.members(['a1', 'a2'])
    expect(a.lines.get('a1')).to.deep.equal({ id: 'a1', name: 'A1' })
    expect(a.lines.get('a2')).to.deep.equal({ id: 'a2', name: 'A2' })

    const b = result.get('b') as any
    expect(b.id).to.equal('b')
    expect(b.name).to.equal('B')
    expect([...b.lines.keys()]).to.have.members(['b1'])
    expect(b.lines.get('b1')).to.deep.equal({ id: 'b1', name: 'B1' })
  })

  it('overrides canteen names if available', function () {
    const base = [
      {
        id: 'a',
        name: 'A',
        lines: [
          { id: 'a1', name: 'A1' },
          { id: 'a2', name: 'A2' }
        ]
      },
      {
        id: 'b',
        name: 'B',
        lines: [
          { id: 'b1', name: 'B1' }
        ]
      }
    ]
    const extend = [
      {
        id: 'a',
        name: 'A-override',
        lines: []
      }
    ]

    const result = buildCanteenLookup(base, extend)

    expect([...result.keys()]).to.have.members(['a', 'b'])

    const a = result.get('a') as any
    expect(a.id).to.equal('a')
    expect(a.name).to.equal('A-override')
    expect([...a.lines.keys()]).to.have.members(['a1', 'a2'])
  })

  it('overrides line names if available', function () {
    const base = [
      {
        id: 'a',
        name: 'A',
        lines: [
          { id: 'a1', name: 'A1' },
          { id: 'a2', name: 'A2' }
        ]
      }
    ]
    const extend = [
      {
        id: 'a',
        lines: [
          { id: 'a1', name: 'A1-override' }
        ]
      }
    ]

    // TODO fix type of extend
    const result = buildCanteenLookup(base, extend as any)

    const a = result.get('a') as any
    expect(a.id).to.equal('a')
    expect(a.name).to.equal('A')
    expect([...a.lines.keys()]).to.have.members(['a1', 'a2'])
    expect(a.lines.get('a1')).to.deep.equal({ id: 'a1', name: 'A1-override' })
    expect(a.lines.get('a2')).to.deep.equal({ id: 'a2', name: 'A2' })
  })
})

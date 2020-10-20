'use strict'

const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

const buildCanteenLookup = require('../../src/jsonapi/build-canteen-lookup.js')

describe('jsonapi/build-canteen-lookup.js', function () {
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

    const a = result.get('a')
    expect(a.id).to.equal('a')
    expect(a.name).to.equal('A')
    expect([...a.lines.keys()]).to.have.members(['a1', 'a2'])
    expect(a.lines.get('a1')).to.deep.equal({ id: 'a1', name: 'A1' })
    expect(a.lines.get('a2')).to.deep.equal({ id: 'a2', name: 'A2' })

    const b = result.get('b')
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

    const a = result.get('a')
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

    const result = buildCanteenLookup(base, extend)

    const a = result.get('a')
    expect(a.id).to.equal('a')
    expect(a.name).to.equal('A')
    expect([...a.lines.keys()]).to.have.members(['a1', 'a2'])
    expect(a.lines.get('a1')).to.deep.equal({ id: 'a1', name: 'A1-override' })
    expect(a.lines.get('a2')).to.deep.equal({ id: 'a2', name: 'A2' })
  })
})

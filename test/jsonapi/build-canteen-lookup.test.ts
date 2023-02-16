import assert from 'node:assert'
import { buildCanteenLookup } from '../../src/jsonapi/build-canteen-lookup.js'

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

    assert.deepStrictEqual([...result.keys()], ['a', 'b'])

    const a = result.get('a') as any
    assert.strictEqual(a.id, 'a')
    assert.strictEqual(a.name, 'A')
    assert.deepStrictEqual([...a.lines.keys()], ['a1', 'a2'])
    assert.deepStrictEqual(a.lines.get('a1'), { id: 'a1', name: 'A1' })
    assert.deepStrictEqual(a.lines.get('a2'), { id: 'a2', name: 'A2' })

    const b = result.get('b') as any
    assert.strictEqual(b.id, 'b')
    assert.strictEqual(b.name, 'B')
    assert.deepStrictEqual([...b.lines.keys()], ['b1'])
    assert.deepStrictEqual(b.lines.get('b1'), { id: 'b1', name: 'B1' })
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

    assert.deepStrictEqual([...result.keys()], ['a', 'b'])

    const a = result.get('a') as any
    assert.strictEqual(a.id, 'a')
    assert.strictEqual(a.name, 'A-override')
    assert.deepStrictEqual([...a.lines.keys()], ['a1', 'a2'])
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
        name: 'A',
        lines: [
          { id: 'a1', name: 'A1-override' }
        ]
      }
    ]

    const result = buildCanteenLookup(base, extend)

    const a = result.get('a') as any
    assert.strictEqual(a.id, 'a')
    assert.strictEqual(a.name, 'A')
    assert.deepStrictEqual([...a.lines.keys()], ['a1', 'a2'])
    assert.deepStrictEqual(a.lines.get('a1'), { id: 'a1', name: 'A1-override' })
    assert.deepStrictEqual(a.lines.get('a2'), { id: 'a2', name: 'A2' })
  })
})

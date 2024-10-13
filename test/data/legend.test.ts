import assert from 'node:assert'
import { legend } from '../../src/data/legend.js'
import { isTrimmed } from '../helper-is-trimmed.js'
import { checkDuplicates } from '../helper-check-duplicates.js'

describe('data/legend', function () {
  it('has proper schema', function () {
    assert.ok(Array.isArray(legend))
    for (const entry of legend) {
      assert.strictEqual(typeof entry, 'object')
      assert.deepStrictEqual(Object.keys(entry).sort(), ['short', 'label'].sort())
      assert.strictEqual(typeof entry.short, 'string')
      assert.strictEqual(typeof entry.label, 'string')
    }
  })

  it('does not have strings with leading/trailing whitespace', function () {
    for (const entry of legend) {
      assert.ok(isTrimmed(entry.short))
      assert.ok(isTrimmed(entry.label))
    }
  })

  it('does not have duplicate short values', function () {
    checkDuplicates(legend, (entry) => entry.short)
  })
})

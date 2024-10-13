import assert from 'node:assert'
import { canteens } from '../../src/data/canteens.js'
import { isTrimmed } from '../helper-is-trimmed.js'
import { checkDuplicates } from '../helper-check-duplicates.js'

describe('data/canteens', function () {
  it('has proper schema', function () {
    assert.ok(Array.isArray(canteens))
    for (const entry of canteens) {
      assert.strictEqual(typeof entry, 'object')
      assert.deepStrictEqual(Object.keys(entry).sort(), ['id', 'name', 'lines'].sort())
      assert.strictEqual(typeof entry.id, 'string')
      assert.strictEqual(typeof entry.name, 'string')
      assert.ok(Array.isArray(entry.lines))
      for (const line of entry.lines) {
        assert.strictEqual(typeof line, 'object')
        const lineKeys = Object.keys(line)
        if (lineKeys.includes('alternativeNames')) {
          assert.deepStrictEqual(lineKeys.sort(), ['id', 'name', 'alternativeNames'].sort())
        } else {
          assert.deepStrictEqual(lineKeys.sort(), ['id', 'name'].sort())
        }
        assert.strictEqual(typeof line.id, 'string')
        assert.strictEqual(typeof line.name, 'string')
        if (line.alternativeNames != null) {
          assert.ok(Array.isArray(line.alternativeNames))
          for (const alt of line.alternativeNames) {
            assert.strictEqual(typeof alt, 'string')
          }
        }
      }
    }
  })

  it('does not have strings with leading/trailing whitespace', function () {
    for (const entry of canteens) {
      assert.ok(isTrimmed(entry.id))
      assert.ok(isTrimmed(entry.name))
      for (const line of entry.lines) {
        assert.ok(isTrimmed(line.id))
        assert.ok(isTrimmed(line.name))
        for (const alt of (line.alternativeNames ?? [])) {
          assert.ok(isTrimmed(alt))
        }
      }
    }
  })

  it('does not have duplicate canteen ids', function () {
    checkDuplicates(canteens, (canteen) => canteen.id)
  })

  it('does not have duplicate canteen names', function () {
    checkDuplicates(canteens, (canteen) => canteen.name)
  })

  it('does not have duplicate line ids in canteens', function () {
    for (const entry of canteens) {
      checkDuplicates(entry.lines, (line) => line.id)
    }
  })

  it('does not have duplicate line names in canteens (case-insensitive)', function () {
    for (const entry of canteens) {
      const allNames: string[] = []
      for (const line of entry.lines) {
        allNames.push(line.name.toLocaleLowerCase(['de-DE', 'en-US']))
        if (line.alternativeNames != null) {
          allNames.push(...line.alternativeNames.map((name) => name.toLocaleLowerCase(['de-DE', 'en-US'])))
        }
      }
      checkDuplicates(allNames, (name) => name)
    }
  })
})

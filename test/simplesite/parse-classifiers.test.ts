import assert from 'node:assert'
import { parseClassifiers } from '../../src/simplesite/parse-classifiers.js'

describe('simplesite/parse-classifiers', function () {
  it("returns [] for empty input ('')", function () {
    assert.deepStrictEqual(parseClassifiers(''), [])
  })

  it("returns [] for empty brackets ('[]')", function () {
    assert.deepStrictEqual(parseClassifiers('[]'), [])
  })

  it('splits bracket contents', function () {
    assert.deepStrictEqual(parseClassifiers('[FOO,BAR]'), ['FOO', 'BAR'])
  })
})

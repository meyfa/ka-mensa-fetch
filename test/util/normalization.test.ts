import assert from 'node:assert'
import { mergeWhitespace, normalizeNameForMatching } from '../../src/util/normalization.js'

describe('util/normalization', function () {
  describe('mergeWhitespace()', function () {
    it('leaves empty string intact', function () {
      assert.strictEqual(mergeWhitespace(''), '')
    })

    it('leaves single spaces intact', function () {
      assert.strictEqual(mergeWhitespace(' foo bar baz '), ' foo bar baz ')
    })

    it('merges consecutive spaces', function () {
      assert.strictEqual(mergeWhitespace('  foo     bar  '), ' foo bar ')
    })
  })

  describe('normalizeNameForMatching()', function () {
    it('consolidates whitespace', function () {
      assert.strictEqual(normalizeNameForMatching('foo\n\nbar'), 'foo bar')
      assert.strictEqual(normalizeNameForMatching('foo \nbar'), 'foo bar')
      assert.strictEqual(normalizeNameForMatching('foo    bar'), 'foo bar')
    })

    it('trims leading/trailing whitespace', function () {
      assert.strictEqual(normalizeNameForMatching(' foo bar'), 'foo bar')
      assert.strictEqual(normalizeNameForMatching('foo bar '), 'foo bar')
      assert.strictEqual(normalizeNameForMatching(' \n foo bar \n '), 'foo bar')
    })

    it('lowercases', function () {
      assert.strictEqual(normalizeNameForMatching('FOOoo baR'), 'foooo bar')
    })
  })
})

import { mergeWhitespace, normalizeNameForMatching } from '../../src/util/normalization.js'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('util/normalization', function () {
  describe('mergeWhitespace()', function () {
    it('leaves empty string intact', function () {
      expect(mergeWhitespace('')).to.equal('')
    })

    it('leaves single spaces intact', function () {
      expect(mergeWhitespace(' foo bar baz ')).to.equal(' foo bar baz ')
    })

    it('merges consecutive spaces', function () {
      expect(mergeWhitespace('  foo     bar  ')).to.equal(' foo bar ')
    })
  })

  describe('normalizeNameForMatching()', function () {
    it('consolidates whitespace', function () {
      expect(normalizeNameForMatching('foo\n\nbar')).to.equal('foo bar')
      expect(normalizeNameForMatching('foo \nbar')).to.equal('foo bar')
      expect(normalizeNameForMatching('foo    bar')).to.equal('foo bar')
    })

    it('trims leading/trailing whitespace', function () {
      expect(normalizeNameForMatching(' foo bar')).to.equal('foo bar')
      expect(normalizeNameForMatching('foo bar ')).to.equal('foo bar')
      expect(normalizeNameForMatching(' \n foo bar \n ')).to.equal('foo bar')
    })

    it('lowercases', function () {
      expect(normalizeNameForMatching('FOOoo baR')).to.equal('foooo bar')
    })
  })
})

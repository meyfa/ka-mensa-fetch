import { mergeWhitespace } from '../../src/util/merge-whitespace.js'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('util/merge-whitespace', function () {
  it('leaves empty string intact', function () {
    return expect(mergeWhitespace('')).to.equal('')
  })

  it('leaves single spaces intact', function () {
    return expect(mergeWhitespace(' foo bar baz ')).to.equal(' foo bar baz ')
  })

  it('merges consecutive spaces', function () {
    return expect(mergeWhitespace('  foo     bar  ')).to.equal(' foo bar ')
  })
})

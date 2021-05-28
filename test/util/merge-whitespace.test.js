'use strict'

const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

const mergeWhitespace = require('../../src/util/merge-whitespace').default

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

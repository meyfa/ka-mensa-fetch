'use strict'

const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

const parseClassifiers = require('../../src/simplesite/parse-classifiers').default

describe('simplesite/parse-classifiers', function () {
  it("returns [] for empty input ('')", function () {
    return expect(parseClassifiers('')).to.deep.equal([])
  })

  it("returns [] for empty brackets ('[]')", function () {
    return expect(parseClassifiers('[]')).to.deep.equal([])
  })

  it('splits bracket contents', function () {
    return expect(parseClassifiers('[FOO,BAR]')).to.deep.equal(['FOO', 'BAR'])
  })
})

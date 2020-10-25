'use strict'

const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

const parseDatestamp = require('../../src/simplesite/parse-datestamp.js')

describe('simplesite/parse-datestamp.js', function () {
  it("returns null for invalid input ('')", function () {
    const ref = new Date(2019, 10, 30)
    return expect(parseDatestamp('', ref)).to.be.null
  })

  it("returns null for implausible input ('Mo 40.05.')", function () {
    const ref = new Date(2019, 10, 30)
    return expect(parseDatestamp('Mo 40.05.', ref)).to.be.null
  })

  it("parses 'Mo 02.12.' with reference 2019-10-30", function () {
    const ref = new Date(2019, 10, 30)
    return expect(parseDatestamp('Mo 02.12.', ref)).to.deep.equal({
      day: 2,
      month: 11,
      year: 2019
    })
  })

  it("parses 'Mi 01.01.' with reference 2020-01-01", function () {
    const ref = new Date(2020, 0, 1)
    return expect(parseDatestamp('Mi 01.01.', ref)).to.deep.equal({
      day: 1,
      month: 0,
      year: 2020
    })
  })

  it("parses 'Mo 02.12.' with reference 2020-01-05", function () {
    const ref = new Date(2020, 0, 5)
    return expect(parseDatestamp('Mo 02.12.', ref)).to.deep.equal({
      day: 2,
      month: 11,
      year: 2019
    })
  })

  it("parses 'Mi 01.01.' with reference 2019-12-15", function () {
    const ref = new Date(2019, 11, 15)
    return expect(parseDatestamp('Mi 01.01.', ref)).to.deep.equal({
      day: 1,
      month: 0,
      year: 2020
    })
  })

  it("parses 'Mi 01.07.' with reference 2020-06-30", function () {
    // test for chunk overlap
    const ref = new Date(2020, 5, 30)
    return expect(parseDatestamp('Mi 01.07.', ref)).to.deep.equal({
      day: 1,
      month: 6,
      year: 2020
    })
  })
})

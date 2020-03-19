'use strict'

const { expect } = require('chai')

const matchLineName = require('../../src/handicap/match-line-name.js')

describe('handicap/match-line-name.js', function () {
  it('returns null for invalid canteen id', function () {
    return expect(matchLineName('foobar', 'l1')).to.be.null
  })

  it('returns null for unknown line name', function () {
    return expect(matchLineName('adenauerring', 'Unbekannte Linie')).to.be.null
  })

  it("matches 'Linie 1' (adenauerring)", function () {
    return expect(matchLineName('adenauerring', 'Linie 1')).to.equal('l1')
  })

  it("matches '[pizza]werk Salate / Vorspeisen' (adenauerring)", function () {
    return expect(matchLineName('adenauerring', '[pizza]werk Salate / Vorspeisen')).to.equal('salat_dessert')
  })

  it("matches '[kœri]werk' (adenauerring)", function () {
    return expect(matchLineName('adenauerring', '[kœri]werk')).to.equal('aktion')
  })

  it("matches 'Gut & Günstig' (x1moltkestrasse)", function () {
    return expect(matchLineName('x1moltkestrasse', 'Gut & Günstig')).to.equal('gut')
  })

  it('ignores leading/trailing whitespace', function () {
    return expect(matchLineName('x1moltkestrasse', ' \n Gut & Günstig \n ')).to.equal('gut')
  })
})

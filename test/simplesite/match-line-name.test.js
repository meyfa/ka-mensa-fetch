'use strict'

const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

const matchLineName = require('../../src/simplesite/match-line-name').default

describe('simplesite/match-line-name', function () {
  it('returns undefined for invalid canteen id', function () {
    return expect(matchLineName('foobar', 'l1')).to.be.undefined
  })

  it('returns undefined for unknown line name', function () {
    return expect(matchLineName('adenauerring', 'Unbekannte Linie')).to.be.undefined
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

  it('matches alternative names', function () {
    expect(matchLineName('adenauerring', 'Cafeteria')).to.equal('heisstheke')
    expect(matchLineName('adenauerring', 'Cafeteria 11-14 Uhr')).to.equal('nmtisch')
  })
})

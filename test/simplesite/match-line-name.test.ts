import { matchLineName } from '../../src/simplesite/match-line-name.js'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

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
    expect(matchLineName('adenauerring', '[kœri]werk 11-14 Uhr')).to.equal('aktion')
  })

  it('matches case-insensitively', function () {
    expect(matchLineName('adenauerring', 'linie 1')).to.equal('l1')
    expect(matchLineName('adenauerring', 'LinIE 1')).to.equal('l1')
    expect(matchLineName('adenauerring', '[kœri]werk 11-14 UHR')).to.equal('aktion')
  })
})

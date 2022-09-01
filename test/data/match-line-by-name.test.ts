import { matchLineByName } from '../../src/data/match-line-by-name.js'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('data/match-line-by-name', function () {
  it('returns undefined for invalid canteen id', function () {
    return expect(matchLineByName('foobar', 'l1')).to.be.undefined
  })

  it('returns undefined for unknown line name', function () {
    return expect(matchLineByName('adenauerring', 'Unbekannte Linie')).to.be.undefined
  })

  it("matches 'Linie 1' (adenauerring)", function () {
    return expect(matchLineByName('adenauerring', 'Linie 1')).to.equal('l1')
  })

  it("matches '[pizza]werk Salate / Vorspeisen' (adenauerring)", function () {
    return expect(matchLineByName('adenauerring', '[pizza]werk Salate / Vorspeisen')).to.equal('salat_dessert')
  })

  it("matches '[kœri]werk' (adenauerring)", function () {
    return expect(matchLineByName('adenauerring', '[kœri]werk')).to.equal('aktion')
  })

  it("matches 'Gut & Günstig' (x1moltkestrasse)", function () {
    return expect(matchLineByName('x1moltkestrasse', 'Gut & Günstig')).to.equal('gut')
  })

  it('ignores leading/trailing whitespace', function () {
    return expect(matchLineByName('x1moltkestrasse', ' \n Gut & Günstig \n ')).to.equal('gut')
  })

  it('ignores multiple internal whitespace', function () {
    return expect(matchLineByName('x1moltkestrasse', 'Gut \n&     Günstig')).to.equal('gut')
  })

  it('matches alternative names', function () {
    expect(matchLineByName('adenauerring', '[kœri]werk 11-14 Uhr')).to.equal('aktion')
  })

  it('matches case-insensitively', function () {
    expect(matchLineByName('adenauerring', 'linie 1')).to.equal('l1')
    expect(matchLineByName('adenauerring', 'LinIE 1')).to.equal('l1')
    expect(matchLineByName('adenauerring', '[kœri]werk 11-14 UHR')).to.equal('aktion')
  })
})

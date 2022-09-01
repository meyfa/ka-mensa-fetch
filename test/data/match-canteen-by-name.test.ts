import { matchCanteenByName } from '../../src/data/match-canteen-by-name.js'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('data/match-canteen-by-name', function () {
  it('returns undefined for unknown canteen name', function () {
    return expect(matchCanteenByName('Unbekannte Mensa')).to.be.undefined
  })

  it("matches 'Mensa Am Adenauerring", function () {
    return expect(matchCanteenByName('Mensa Am Adenauerring')).to.equal('adenauerring')
  })

  it("matches 'Menseria Moltkestraße 30'", function () {
    return expect(matchCanteenByName('Menseria Moltkestraße 30')).to.equal('x1moltkestrasse')
  })

  it('ignores leading/trailing whitespace', function () {
    return expect(matchCanteenByName(' \n Mensa Am Adenauerring \n ')).to.equal('adenauerring')
  })

  it('ignores multiple internal whitespace', function () {
    return expect(matchCanteenByName('Mensa \nAm    Adenauerring')).to.equal('adenauerring')
  })

  it('matches case-insensitively', function () {
    expect(matchCanteenByName('Mensa am Adenauerring')).to.equal('adenauerring')
    expect(matchCanteenByName('menseria moltkestraße 30')).to.equal('x1moltkestrasse')
    //  capitalized eszett
    expect(matchCanteenByName('MENSERIA MOLTKESTRAẞE 30')).to.equal('x1moltkestrasse')
  })
})

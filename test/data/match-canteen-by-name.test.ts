import assert from 'node:assert'
import { matchCanteenByName } from '../../src/data/match-canteen-by-name.js'

describe('data/match-canteen-by-name', function () {
  it('returns undefined for unknown canteen name', function () {
    assert.strictEqual(matchCanteenByName('Unbekannte Mensa'), undefined)
  })

  it('matches \'Mensa Am Adenauerring', function () {
    assert.strictEqual(matchCanteenByName('Mensa Am Adenauerring'), 'adenauerring')
  })

  it('matches \'Menseria Moltkestraße 30\'', function () {
    assert.strictEqual(matchCanteenByName('Menseria Moltkestraße 30'), 'x1moltkestrasse')
  })

  it('ignores leading/trailing whitespace', function () {
    assert.strictEqual(matchCanteenByName(' \n Mensa Am Adenauerring \n '), 'adenauerring')
  })

  it('ignores multiple internal whitespace', function () {
    assert.strictEqual(matchCanteenByName('Mensa \nAm    Adenauerring'), 'adenauerring')
  })

  it('matches case-insensitively', function () {
    assert.strictEqual(matchCanteenByName('Mensa am Adenauerring'), 'adenauerring')
    assert.strictEqual(matchCanteenByName('menseria moltkestraße 30'), 'x1moltkestrasse')
    //  capitalized eszett
    assert.strictEqual(matchCanteenByName('MENSERIA MOLTKESTRAẞE 30'), 'x1moltkestrasse')
  })
})

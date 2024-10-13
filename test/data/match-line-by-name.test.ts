import assert from 'node:assert'
import { matchLineByName } from '../../src/data/match-line-by-name.js'

describe('data/match-line-by-name', function () {
  it('returns undefined for invalid canteen id', function () {
    assert.strictEqual(matchLineByName('foobar', 'l1'), undefined)
  })

  it('returns undefined for unknown line name', function () {
    assert.strictEqual(matchLineByName('adenauerring', 'Unbekannte Linie'), undefined)
  })

  it('matches \'Linie 1\' (adenauerring)', function () {
    assert.strictEqual(matchLineByName('adenauerring', 'Linie 1'), 'l1')
  })

  it('matches \'[pizza]werk Salate / Vorspeisen\' (adenauerring)', function () {
    assert.strictEqual(matchLineByName('adenauerring', '[pizza]werk Salate / Vorspeisen'), 'salat_dessert')
  })

  it('matches \'[kœri]werk\' (adenauerring)', function () {
    assert.strictEqual(matchLineByName('adenauerring', '[kœri]werk'), 'aktion')
  })

  it('matches \'Gut & Günstig\' (x1moltkestrasse)', function () {
    assert.strictEqual(matchLineByName('x1moltkestrasse', 'Gut & Günstig'), 'gut')
  })

  it('ignores leading/trailing whitespace', function () {
    assert.strictEqual(matchLineByName('x1moltkestrasse', ' \n Gut & Günstig \n '), 'gut')
  })

  it('ignores multiple internal whitespace', function () {
    assert.strictEqual(matchLineByName('x1moltkestrasse', 'Gut \n&     Günstig'), 'gut')
  })

  it('matches alternative names', function () {
    assert.strictEqual(matchLineByName('adenauerring', '[kœri]werk 11-14 Uhr'), 'aktion')
  })

  it('matches case-insensitively', function () {
    assert.strictEqual(matchLineByName('adenauerring', 'linie 1'), 'l1')
    assert.strictEqual(matchLineByName('adenauerring', 'LinIE 1'), 'l1')
    assert.strictEqual(matchLineByName('adenauerring', '[kœri]werk 11-14 UHR'), 'aktion')
  })
})

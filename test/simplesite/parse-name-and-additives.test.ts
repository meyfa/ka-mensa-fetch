import assert from 'node:assert'
import { parseNameAndAdditives } from '../../src/simplesite/parse-name-and-additives.js'

describe('simplesite/parse-name-and-additives', function () {
  it('parses empty input correctly', function () {
    assert.deepStrictEqual(parseNameAndAdditives(''), {
      name: '',
      additives: []
    })
  })

  it('parses input without brackets as name', function () {
    assert.deepStrictEqual(parseNameAndAdditives('Nasi Goreng'), {
      name: 'Nasi Goreng',
      additives: []
    })
  })

  it('parses bracket contents as additives', function () {
    assert.deepStrictEqual(parseNameAndAdditives('Nasi Goreng (So,Sn,Se,We)'), {
      name: 'Nasi Goreng',
      additives: ['So', 'Sn', 'Se', 'We']
    })
  })

  it('merges whitespace in name-only input', function () {
    assert.deepStrictEqual(parseNameAndAdditives('  Nasi\n  Goreng '), {
      name: 'Nasi Goreng',
      additives: []
    })
  })

  it('merges whitespace in input that includes additives', function () {
    assert.deepStrictEqual(parseNameAndAdditives('  Nasi\n Goreng  (So,Sn,Se,We)'), {
      name: 'Nasi Goreng',
      additives: ['So', 'Sn', 'Se', 'We']
    })
  })

  it('ignores whitespace in additives list', function () {
    assert.deepStrictEqual(parseNameAndAdditives('Nasi Goreng ( So,Sn,\nSe ,We )'), {
      name: 'Nasi Goreng',
      additives: ['So', 'Sn', 'Se', 'We']
    })
  })
})

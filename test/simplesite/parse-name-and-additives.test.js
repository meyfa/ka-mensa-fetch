'use strict'

const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

const parseNameAndAdditives = require('../../src/simplesite/parse-name-and-additives.js')

describe('simplesite/parse-name-and-additives.js', function () {
  it('parses empty input correctly', function () {
    return expect(parseNameAndAdditives('')).to.deep.equal({
      name: '',
      additives: []
    })
  })

  it('parses input without brackets as name', function () {
    return expect(parseNameAndAdditives('Nasi Goreng')).to.deep.equal({
      name: 'Nasi Goreng',
      additives: []
    })
  })

  it('parses bracket contents as additives', function () {
    return expect(parseNameAndAdditives('Nasi Goreng (So,Sn,Se,We)')).to.deep.equal({
      name: 'Nasi Goreng',
      additives: ['So', 'Sn', 'Se', 'We']
    })
  })

  it('merges whitespace in name-only input', function () {
    return expect(parseNameAndAdditives('  Nasi\n  Goreng ')).to.deep.equal({
      name: 'Nasi Goreng',
      additives: []
    })
  })

  it('merges whitespace in input that includes additives', function () {
    return expect(parseNameAndAdditives('  Nasi\n Goreng  (So,Sn,Se,We)')).to.deep.equal({
      name: 'Nasi Goreng',
      additives: ['So', 'Sn', 'Se', 'We']
    })
  })

  it('ignores whitespace in additives list', function () {
    return expect(parseNameAndAdditives('Nasi Goreng ( So,Sn,\nSe ,We )')).to.deep.equal({
      name: 'Nasi Goreng',
      additives: ['So', 'Sn', 'Se', 'We']
    })
  })
})

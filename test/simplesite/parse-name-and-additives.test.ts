import { parseNameAndAdditives } from '../../src/simplesite/parse-name-and-additives'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('simplesite/parse-name-and-additives', function () {
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

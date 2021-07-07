import legend from '../../data/legend.json'
import { isTrimmed } from '../helper-is-trimmed'
import { checkDuplicates } from '../helper-check-duplicates'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('data: legend.json', function () {
  it('has proper schema', function () {
    expect(legend).to.be.an('array')
    for (const entry of legend) {
      expect(entry).to.be.an('object').with.keys(['short', 'label'])
      expect(entry.short).to.be.a('string')
      expect(entry.label).to.be.a('string')
    }
  })

  it('does not have strings with leading/trailing whitespace', function () {
    for (const entry of legend) {
      expect(entry.short).to.satisfy(isTrimmed)
      expect(entry.label).to.satisfy(isTrimmed)
    }
  })

  it('does not have duplicate short values', function () {
    checkDuplicates(expect, legend, entry => entry.short)
  })
})

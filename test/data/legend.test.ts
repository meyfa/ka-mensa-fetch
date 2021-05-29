import legend from '../../data/legend.json'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('data: legend.json', function () {
  it('does not have duplicate short values', function () {
    const counts: Map<string, number> = new Map()
    for (const { short } of legend) {
      counts.set(short, (counts.get(short) ?? 0) + 1)
    }
    for (const [short, count] of counts) {
      expect(count).to.equal(1, `"${short}" occurs ${count} times`)
    }
  })
})

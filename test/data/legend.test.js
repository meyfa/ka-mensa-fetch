'use strict'

const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

const legend = require('../../data/legend.json')

describe('data: legend.json', function () {
  it('does not have duplicate short values', function () {
    const counts = new Map()
    for (const { short } of legend) {
      counts.set(short, (counts.get(short) || 0) + 1)
    }
    for (const [short, count] of counts) {
      expect(count).to.equal(1, '"' + short + '" occurs ' + count + ' times')
    }
    expect()
  })
})

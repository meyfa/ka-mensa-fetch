import { parseClassifiers } from '../../src/simplesite/parse-classifiers'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('simplesite/parse-classifiers', function () {
  it("returns [] for empty input ('')", function () {
    return expect(parseClassifiers('')).to.deep.equal([])
  })

  it("returns [] for empty brackets ('[]')", function () {
    return expect(parseClassifiers('[]')).to.deep.equal([])
  })

  it('splits bracket contents', function () {
    return expect(parseClassifiers('[FOO,BAR]')).to.deep.equal(['FOO', 'BAR'])
  })
})

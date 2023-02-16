import assert from 'node:assert'
import { parseDatestamp } from '../../src/simplesite/parse-datestamp.js'

describe('simplesite/parse-datestamp', function () {
  it("returns undefined for invalid input ('')", function () {
    const ref = new Date(2019, 10, 30)
    assert.strictEqual(parseDatestamp('', ref), undefined)
  })

  it("returns undefined for implausible input ('Mo 40.05.')", function () {
    const ref = new Date(2019, 10, 30)
    assert.strictEqual(parseDatestamp('Mo 40.05.', ref), undefined)
  })

  it("parses 'Mo 02.12.' with reference 2019-10-30", function () {
    const ref = new Date(2019, 10, 30)
    assert.deepStrictEqual(parseDatestamp('Mo 02.12.', ref), {
      day: 2,
      month: 11,
      year: 2019
    })
  })

  it("parses 'Mi 01.01.' with reference 2020-01-01", function () {
    const ref = new Date(2020, 0, 1)
    assert.deepStrictEqual(parseDatestamp('Mi 01.01.', ref), {
      day: 1,
      month: 0,
      year: 2020
    })
  })

  it("parses 'Mo 02.12.' with reference 2020-01-05", function () {
    const ref = new Date(2020, 0, 5)
    assert.deepStrictEqual(parseDatestamp('Mo 02.12.', ref), {
      day: 2,
      month: 11,
      year: 2019
    })
  })

  it("parses 'Mi 01.01.' with reference 2019-12-15", function () {
    const ref = new Date(2019, 11, 15)
    assert.deepStrictEqual(parseDatestamp('Mi 01.01.', ref), {
      day: 1,
      month: 0,
      year: 2020
    })
  })

  it("parses 'Mi 01.07.' with reference 2020-06-30", function () {
    // test for chunk overlap
    const ref = new Date(2020, 5, 30)
    assert.deepStrictEqual(parseDatestamp('Mi 01.07.', ref), {
      day: 1,
      month: 6,
      year: 2020
    })
  })
})

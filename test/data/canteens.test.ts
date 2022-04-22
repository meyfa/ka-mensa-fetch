import { canteens } from '../../src/data/canteens.js'
import { isTrimmed } from '../helper-is-trimmed.js'
import { checkDuplicates } from '../helper-check-duplicates.js'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('data/canteens', function () {
  it('has proper schema', function () {
    expect(canteens).to.be.an('array')
    for (const entry of canteens) {
      expect(entry).to.be.an('object').with.keys(['id', 'name', 'lines'])
      expect(entry.id).to.be.a('string')
      expect(entry.name).to.be.a('string')
      expect(entry.lines).to.be.an('array')
      for (const line of entry.lines) {
        expect(line).to.be.an('object').that.includes.all.keys(['id', 'name'])
        expect(line.id).to.be.a('string')
        expect(line.name).to.be.a('string')
        if (line.alternativeNames != null) {
          expect(line.alternativeNames).to.be.an('array')
          for (const alt of line.alternativeNames) {
            expect(alt).to.be.a('string')
          }
        }
      }
    }
  })

  it('does not have strings with leading/trailing whitespace', function () {
    for (const entry of canteens) {
      expect(entry.id).to.satisfy(isTrimmed)
      expect(entry.name).to.satisfy(isTrimmed)
      for (const line of entry.lines) {
        expect(line.id).to.satisfy(isTrimmed)
        expect(line.name).to.satisfy(isTrimmed)
        for (const alt of (line.alternativeNames ?? [])) {
          expect(alt).to.satisfy(isTrimmed)
        }
      }
    }
  })

  it('does not have duplicate canteen ids', function () {
    checkDuplicates(expect, canteens, canteen => canteen.id)
  })

  it('does not have duplicate canteen names', function () {
    checkDuplicates(expect, canteens, canteen => canteen.name)
  })

  it('does not have duplicate line ids in canteens', function () {
    for (const entry of canteens) {
      checkDuplicates(expect, entry.lines, line => line.id)
    }
  })

  it('does not have duplicate line names in canteens', function () {
    for (const entry of canteens) {
      const allNames: string[] = []
      for (const line of entry.lines) {
        allNames.push(line.name)
        allNames.push(...(line.alternativeNames ?? []))
      }
      checkDuplicates(expect, allNames, name => name)
    }
  })
})

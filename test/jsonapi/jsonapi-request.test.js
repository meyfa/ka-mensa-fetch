'use strict'

const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

const MockAdapter = require('axios-mock-adapter')

const { default: request, METADATA_ENDPOINT, PLANS_ENDPOINT } = require('../../src/jsonapi/jsonapi-request')

describe('jsonapi/jsonapi-request', function () {
  let mock

  beforeEach(function () {
    mock = new MockAdapter(require('axios'), { onNoMatch: 'throwException' })
  })

  afterEach(function () {
    mock.restore()
    mock = null
  })

  it('exports endpoint constants', function () {
    expect(METADATA_ENDPOINT).to.be.a('string')
    expect(PLANS_ENDPOINT).to.be.a('string')
  })

  it('rejects for missing/wrong endpoint', function () {
    return Promise.all([
      expect(request({ user: 'a', password: 'b' })).to.eventually.be.rejected,
      expect(request({ user: 'a', password: 'b' }, 'invalid')).to.eventually.be.rejected
    ])
  })

  describe('with #METADATA_ENDPOINT', function () {
    it('sends request as expected', function () {
      mock.onAny().replyOnce(config => {
        expect(config.url).to.equal('https://www.sw-ka.de/json_interface/general/')
        expect(config.method).to.equal('get')
        expect(config.auth).to.deep.equal({
          username: 'a',
          password: 'b'
        })
        return [200, { some: { data: 42 } }]
      })
      return expect(request({ user: 'a', password: 'b' }, METADATA_ENDPOINT))
        .to.eventually.be.fulfilled
    })

    it('returns data as-is', function () {
      mock.onAny().replyOnce(config => {
        return [200, { some: { data: 42 } }]
      })
      return expect(request({ user: 'a', password: 'b' }, METADATA_ENDPOINT))
        .to.eventually.deep.equal({ some: { data: 42 } })
    })
  })

  describe('with #PLANS_ENDPOINT', function () {
    it('sends request as expected', function () {
      mock.onAny().replyOnce(config => {
        expect(config.url).to.equal('https://www.sw-ka.de/json_interface/canteen/')
        expect(config.method).to.equal('get')
        expect(config.auth).to.deep.equal({
          username: 'a',
          password: 'b'
        })
        return [200, { some: { data: 42 } }]
      })
      return expect(request({ user: 'a', password: 'b' }, PLANS_ENDPOINT))
        .to.eventually.be.fulfilled
    })

    it('returns data as-is', function () {
      mock.onAny().replyOnce(config => {
        return [200, { some: { data: 42 } }]
      })
      return expect(request({ user: 'a', password: 'b' }, PLANS_ENDPOINT))
        .to.eventually.deep.equal({ some: { data: 42 } })
    })
  })
})

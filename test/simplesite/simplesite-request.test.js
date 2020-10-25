'use strict'

const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

const MockAdapter = require('axios-mock-adapter')

const request = require('../../src/simplesite/simplesite-request.js')

describe('simplesite/simplesite-request.js', function () {
  let mock

  beforeEach(function () {
    mock = new MockAdapter(require('axios'), { onNoMatch: 'throwException' })
  })

  afterEach(function () {
    mock.restore()
    mock = null
  })

  it('sends request as expected', function () {
    mock.onAny().replyOnce(config => {
      expect(config.url).to.equal('https://www.sw-ka.de/de/essen/')
      expect(config.method).to.equal('get')
      expect(config.params).to.deep.equal({
        STYLE: 'popup_plain',
        view: 'ok',
        c: 'test-canteen',
        kw: 11
      })
      return [200, { some: { data: 42 } }]
    })
    return expect(request('test-canteen', 11))
      .to.eventually.be.fulfilled
  })

  it('returns data as-is', function () {
    mock.onAny().replyOnce(config => {
      return [200, { some: { data: 42 } }]
    })
    return expect(request('test-canteen', 11))
      .to.eventually.deep.equal({ some: { data: 42 } })
  })

  it('includes session cookie if provided', function () {
    mock.onAny().replyOnce(config => {
      expect(config.headers).to.have.property('Cookie').that.equals('platoCMS=qux42baz')
      return [200, { some: { data: 42 } }]
    })
    return expect(request('test-canteen', 11, 'qux42baz'))
      .to.eventually.be.fulfilled
  })
})

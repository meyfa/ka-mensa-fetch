'use strict'

const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect } = chai

const MockAdapter = require('axios-mock-adapter')

const requestSessionCookie = require('../../src/cookies/request-session-cookie').default

describe('cookies/request-session-cookie', function () {
  let mock

  beforeEach(function () {
    mock = new MockAdapter(require('axios'), { onNoMatch: 'throwException' })
  })

  afterEach(function () {
    mock.restore()
    mock = null
  })

  it('sends request to https://www.sw-ka.de/*', function () {
    mock.onAny().replyOnce(config => {
      expect(config.url).to.satisfy(url => url.startsWith('https://www.sw-ka.de/'))
      return [200, 'test-response']
    })
    return expect(requestSessionCookie()).to.eventually.be.fulfilled
  })

  it('returns undefined for missing set-cookie', function () {
    return Promise.resolve().then(() => {
      mock.reset()
      mock.onAny().replyOnce(200, 'test-response')
      return expect(requestSessionCookie()).to.eventually.be.undefined
    }).then(() => {
      mock.reset()
      mock.onAny().replyOnce(200, 'test-response', { 'x-some-header': 'xyz' })
      return expect(requestSessionCookie()).to.eventually.be.undefined
    })
  })

  it('returns null for missing platoCMS cookie', function () {
    mock.onAny().replyOnce(200, 'test-response', {
      'set-cookie': 'someCookie=xyz; path=/'
    })
    return expect(requestSessionCookie()).to.eventually.be.undefined
  })

  it('returns platoCMS cookie if exists', function () {
    mock.onAny().replyOnce(200, 'test-response', {
      'set-cookie': 'platoCMS=qux42baz; path=/'
    })
    return expect(requestSessionCookie()).to.eventually.equal('qux42baz')
  })

  it('finds platoCMS cookie among multiple cookies', function () {
    mock.onAny().replyOnce(200, 'test-response', {
      'set-cookie': [
        'testCookie1=fail1; path=/',
        'platoCMS=qux42baz; path=/',
        'testCookie2=fail2; path=/'
      ]
    })
    return expect(requestSessionCookie()).to.eventually.equal('qux42baz')
  })

  it('sends a Firefox user agent', function () {
    // this is required because sw-ka does not reliably set cookies in other
    // browsers

    mock.onAny().replyOnce(config => {
      expect(config.headers).to.have.property('User-Agent').that.satisfies(ua => {
        return ua.includes('Mozilla') && ua.includes('Firefox')
      })
      return [200, 'test-response']
    })
    return expect(requestSessionCookie()).to.eventually.be.fulfilled
  })
})

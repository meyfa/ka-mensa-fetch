import requestSessionCookie from '../../src/cookies/request-session-cookie'
import LazyMockAdapter from '../helper-lazymockadapter'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('cookies/request-session-cookie', function () {
  const lazyMock = new LazyMockAdapter()
  afterEach(() => lazyMock.restore())

  it('sends request to https://www.sw-ka.de/*', function () {
    lazyMock.get().onAny().replyOnce(config => {
      expect(config.url).to.satisfy((url: string) => url.startsWith('https://www.sw-ka.de/'))
      return [200, 'test-response']
    })
    return expect(requestSessionCookie()).to.eventually.be.fulfilled
  })

  it('returns undefined for missing set-cookie', async function () {
    const mock = lazyMock.get()

    mock.onAny().replyOnce(200, 'test-response')
    await expect(requestSessionCookie()).to.eventually.be.undefined

    mock.reset()
    mock.onAny().replyOnce(200, 'test-response', { 'x-some-header': 'xyz' })
    await expect(requestSessionCookie()).to.eventually.be.undefined
  })

  it('returns null for missing platoCMS cookie', function () {
    lazyMock.get().onAny().replyOnce(200, 'test-response', {
      'set-cookie': 'someCookie=xyz; path=/'
    })
    return expect(requestSessionCookie()).to.eventually.be.undefined
  })

  it('returns platoCMS cookie if exists', function () {
    lazyMock.get().onAny().replyOnce(200, 'test-response', {
      'set-cookie': 'platoCMS=qux42baz; path=/'
    })
    return expect(requestSessionCookie()).to.eventually.equal('qux42baz')
  })

  it('finds platoCMS cookie among multiple cookies', function () {
    lazyMock.get().onAny().replyOnce(200, 'test-response', {
      'set-cookie': [
        'testCookie1=fail1; path=/',
        'platoCMS=qux42baz; path=/',
        'testCookie2=fail2; path=/'
      ]
    })
    return expect(requestSessionCookie()).to.eventually.equal('qux42baz')
  })

  it('sends a Firefox user agent', function () {
    // this is required because sw-ka does not reliably set cookies in other browsers

    lazyMock.get().onAny().replyOnce(config => {
      expect(config.headers).to.have.property('User-Agent').that.satisfies((ua: string) => {
        return ua.includes('Mozilla') && ua.includes('Firefox')
      })
      return [200, 'test-response']
    })
    return expect(requestSessionCookie()).to.eventually.be.fulfilled
  })
})

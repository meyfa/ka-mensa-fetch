import assert from 'node:assert'
import { requestSessionCookie } from '../../src/cookies/request-session-cookie.js'
import { LazyMockAdapter } from '../helper-lazymockadapter.js'

describe('cookies/request-session-cookie', function () {
  const lazyMock = new LazyMockAdapter()
  afterEach(() => lazyMock.restore())

  it('sends request to https://www.sw-ka.de/*', async function () {
    lazyMock.get().onAny().replyOnce(config => {
      assert.ok(config.url?.startsWith('https://www.sw-ka.de/') === true)
      return [200, 'test-response']
    })
    await assert.doesNotReject(requestSessionCookie())
  })

  it('returns undefined for missing set-cookie', async function () {
    const mock = lazyMock.get()

    mock.onAny().replyOnce(200, 'test-response')
    assert.strictEqual(await requestSessionCookie(), undefined)

    mock.reset()
    mock.onAny().replyOnce(200, 'test-response', { 'x-some-header': 'xyz' })
    assert.strictEqual(await requestSessionCookie(), undefined)
  })

  it('returns null for missing platoCMS cookie', async function () {
    lazyMock.get().onAny().replyOnce(200, 'test-response', {
      'set-cookie': 'someCookie=xyz; path=/'
    })
    assert.strictEqual(await requestSessionCookie(), undefined)
  })

  it('returns platoCMS cookie if exists', async function () {
    lazyMock.get().onAny().replyOnce(200, 'test-response', {
      'set-cookie': 'platoCMS=qux42baz; path=/'
    })
    assert.strictEqual(await requestSessionCookie(), 'qux42baz')
  })

  it('finds platoCMS cookie among multiple cookies', async function () {
    lazyMock.get().onAny().replyOnce(200, 'test-response', {
      'set-cookie': [
        'testCookie1=fail1; path=/',
        'platoCMS=qux42baz; path=/',
        'testCookie2=fail2; path=/'
      ]
    })
    assert.strictEqual(await requestSessionCookie(), 'qux42baz')
  })

  it('sends a Firefox user agent', async function () {
    // this is required because sw-ka does not reliably set cookies in other browsers

    lazyMock.get().onAny().replyOnce(config => {
      assert.ok(config.headers != null)
      assert.ok(typeof config.headers['User-Agent'] === 'string')
      assert.match(config.headers['User-Agent'], /Mozilla/)
      assert.match(config.headers['User-Agent'], /Firefox/)
      return [200, 'test-response']
    })
    await assert.doesNotReject(requestSessionCookie())
  })
})

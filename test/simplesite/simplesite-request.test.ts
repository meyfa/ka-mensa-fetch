import assert from 'node:assert'
import { request } from '../../src/simplesite/simplesite-request.js'
import { LazyMockAdapter } from '../helper-lazymockadapter.js'

describe('simplesite/simplesite-request', function () {
  const lazyMock = new LazyMockAdapter()
  afterEach(() => lazyMock.restore())

  it('sends request as expected', async function () {
    lazyMock.get().onAny().replyOnce(config => {
      assert.strictEqual(config.url, 'https://www.sw-ka.de/de/hochschulgastronomie/speiseplan/mensa_test-canteen/')
      assert.strictEqual(config.method, 'get')
      assert.deepStrictEqual(config.params, {
        STYLE: 'popup_plain',
        view: 'ok',
        c: 'test-canteen',
        kw: 11
      })
      return [200, 'page content']
    })
    await assert.doesNotReject(request('test-canteen', 11))
  })

  it('returns data as-is', async function () {
    const data = JSON.stringify({ some: { data: 42 } })
    lazyMock.get().onAny().replyOnce(() => {
      return [200, data]
    })
    assert.deepStrictEqual(await request('test-canteen', 11), data)
  })

  it('includes session cookie if provided', async function () {
    lazyMock.get().onAny().replyOnce(config => {
      assert.ok(config.headers != null)
      assert.strictEqual(config.headers.Cookie, 'platoCMS=qux42baz')
      return [200, 'page content']
    })
    await assert.doesNotReject(request('test-canteen', 11, 'qux42baz'))
  })

  it('throws if JSON data is returned', async function () {
    lazyMock.get().onAny().replyOnce(200, { foo: 'bar' })
    await assert.rejects(request('test-canteen', 11))
  })

  it('throws if null is returned', async function () {
    lazyMock.get().onAny().replyOnce(200, null)
    await assert.rejects(request('test-canteen', 11))
  })

  it('throws if undefined is returned', async function () {
    lazyMock.get().onAny().replyOnce(200, undefined)
    await assert.rejects(request('test-canteen', 11))
  })
})

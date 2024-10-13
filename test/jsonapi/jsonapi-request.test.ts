import assert from 'node:assert'
import { request, METADATA_ENDPOINT, PLANS_ENDPOINT } from '../../src/jsonapi/jsonapi-request.js'
import { LazyMockAdapter } from '../helper-lazymockadapter.js'

describe('jsonapi/jsonapi-request', function () {
  const lazyMock = new LazyMockAdapter()
  afterEach(() => lazyMock.restore())

  it('exports endpoint constants', function () {
    assert.strictEqual(typeof METADATA_ENDPOINT, 'string')
    assert.strictEqual(typeof PLANS_ENDPOINT, 'string')
  })

  it('rejects for missing/wrong endpoint', async function () {
    await assert.rejects(request({ user: 'a', password: 'b' }, undefined as any))
    await assert.rejects(request({ user: 'a', password: 'b' }, 'invalid'))
  })

  describe('with #METADATA_ENDPOINT', function () {
    it('sends request as expected', async function () {
      lazyMock.get().onAny().replyOnce((config) => {
        assert.strictEqual(config.url, 'https://www.sw-ka.de/en/json_interface/general/')
        assert.strictEqual(config.method, 'get')
        assert.deepStrictEqual(config.auth, {
          username: 'a',
          password: 'b'
        })
        return [200, { some: { data: 42 } }]
      })
      await assert.doesNotReject(request({ user: 'a', password: 'b' }, METADATA_ENDPOINT))
    })

    it('returns data as-is', async function () {
      lazyMock.get().onAny().replyOnce(() => {
        return [200, { some: { data: 42 } }]
      })
      assert.deepStrictEqual(await request({ user: 'a', password: 'b' }, METADATA_ENDPOINT), { some: { data: 42 } })
    })

    it('throws if non-json data is returned', async function () {
      lazyMock.get().onAny().replyOnce(200, 'textual page content')
      await assert.rejects(request({ user: 'a', password: 'b' }, METADATA_ENDPOINT))
    })
  })

  describe('with #PLANS_ENDPOINT', function () {
    it('sends request as expected', async function () {
      lazyMock.get().onAny().replyOnce((config) => {
        assert.strictEqual(config.url, 'https://www.sw-ka.de/en/json_interface/canteen/')
        assert.strictEqual(config.method, 'get')
        assert.deepStrictEqual(config.auth, {
          username: 'a',
          password: 'b'
        })
        return [200, { some: { data: 42 } }]
      })
      await assert.doesNotReject(request({ user: 'a', password: 'b' }, PLANS_ENDPOINT))
    })

    it('returns data as-is', async function () {
      lazyMock.get().onAny().replyOnce(() => {
        return [200, { some: { data: 42 } }]
      })
      assert.deepStrictEqual(await request({ user: 'a', password: 'b' }, PLANS_ENDPOINT), { some: { data: 42 } })
    })

    it('throws if non-json data is returned', async function () {
      lazyMock.get().onAny().replyOnce(200, 'textual page content')
      await assert.rejects(request({ user: 'a', password: 'b' }, PLANS_ENDPOINT))
    })
  })
})

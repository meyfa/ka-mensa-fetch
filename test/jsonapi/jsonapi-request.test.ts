import { request, METADATA_ENDPOINT, PLANS_ENDPOINT } from '../../src/jsonapi/jsonapi-request'
import { LazyMockAdapter } from '../helper-lazymockadapter'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('jsonapi/jsonapi-request', function () {
  const lazyMock = new LazyMockAdapter()
  afterEach(() => lazyMock.restore())

  it('exports endpoint constants', function () {
    expect(METADATA_ENDPOINT).to.be.a('string')
    expect(PLANS_ENDPOINT).to.be.a('string')
  })

  it('rejects for missing/wrong endpoint', async function () {
    await Promise.all([
      expect(request({ user: 'a', password: 'b' }, undefined as any)).to.eventually.be.rejected,
      expect(request({ user: 'a', password: 'b' }, 'invalid')).to.eventually.be.rejected
    ])
  })

  describe('with #METADATA_ENDPOINT', function () {
    it('sends request as expected', function () {
      lazyMock.get().onAny().replyOnce(config => {
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
      lazyMock.get().onAny().replyOnce(() => {
        return [200, { some: { data: 42 } }]
      })
      return expect(request({ user: 'a', password: 'b' }, METADATA_ENDPOINT))
        .to.eventually.deep.equal({ some: { data: 42 } })
    })

    it('throws if non-json data is returned', function () {
      lazyMock.get().onAny().replyOnce(200, 'textual page content')
      return expect(request({ user: 'a', password: 'b' }, METADATA_ENDPOINT))
        .to.eventually.be.rejected
    })
  })

  describe('with #PLANS_ENDPOINT', function () {
    it('sends request as expected', function () {
      lazyMock.get().onAny().replyOnce(config => {
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
      lazyMock.get().onAny().replyOnce(() => {
        return [200, { some: { data: 42 } }]
      })
      return expect(request({ user: 'a', password: 'b' }, PLANS_ENDPOINT))
        .to.eventually.deep.equal({ some: { data: 42 } })
    })

    it('throws if non-json data is returned', function () {
      lazyMock.get().onAny().replyOnce(200, 'textual page content')
      return expect(request({ user: 'a', password: 'b' }, PLANS_ENDPOINT))
        .to.eventually.be.rejected
    })
  })
})

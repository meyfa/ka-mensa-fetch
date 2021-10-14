import { request } from '../../src/simplesite/simplesite-request'
import { LazyMockAdapter } from '../helper-lazymockadapter'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('simplesite/simplesite-request', function () {
  const lazyMock = new LazyMockAdapter()
  afterEach(() => lazyMock.restore())

  it('sends request as expected', function () {
    lazyMock.get().onAny().replyOnce(config => {
      expect(config.url).to.equal('https://www.sw-ka.de/de/essen/')
      expect(config.method).to.equal('get')
      expect(config.params).to.deep.equal({
        STYLE: 'popup_plain',
        view: 'ok',
        c: 'test-canteen',
        kw: 11
      })
      return [200, 'page content']
    })
    return expect(request('test-canteen', 11))
      .to.eventually.be.fulfilled
  })

  it('returns data as-is', function () {
    const data = JSON.stringify({ some: { data: 42 } })
    lazyMock.get().onAny().replyOnce(() => {
      return [200, data]
    })
    return expect(request('test-canteen', 11))
      .to.eventually.deep.equal(data)
  })

  it('includes session cookie if provided', function () {
    lazyMock.get().onAny().replyOnce(config => {
      expect(config.headers).to.have.property('Cookie').that.equals('platoCMS=qux42baz')
      return [200, 'page content']
    })
    return expect(request('test-canteen', 11, 'qux42baz'))
      .to.eventually.be.fulfilled
  })

  it('throws if JSON data is returned', function () {
    lazyMock.get().onAny().replyOnce(200, { foo: 'bar' })
    return expect(request('test-canteen', 11))
      .to.eventually.be.rejected
  })

  it('throws if null is returned', function () {
    lazyMock.get().onAny().replyOnce(200, null)
    return expect(request('test-canteen', 11))
      .to.eventually.be.rejected
  })

  it('throws if undefined is returned', function () {
    lazyMock.get().onAny().replyOnce(200, undefined)
    return expect(request('test-canteen', 11))
      .to.eventually.be.rejected
  })
})

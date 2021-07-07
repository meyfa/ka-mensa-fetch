import MockAdapter from 'axios-mock-adapter'

/**
 * This is used in some test files to obtain an Axios MockAdapter.
 * The advantage is that it auto-initializes lazily and is easy to clean up, de-duplicating code among tests.
 */
export class LazyMockAdapter {
  private mock: MockAdapter | undefined

  /**
   * Obtain the MockAdapter, initializing it if necessary.
   * Subsequent calls will return the same instance until restore() is called.
   *
   * @returns {object} The Axios MockAdapter.
   */
  get (): MockAdapter {
    if (this.mock == null) {
      this.mock = new MockAdapter(require('axios'), { onNoMatch: 'throwException' })
    }
    return this.mock
  }

  /**
   * Restore Axios to normal functionality and clean up the MockAdapter.
   *
   * @returns {void}
   */
  restore (): void {
    if (this.mock != null) this.mock.restore()
    this.mock = undefined
  }
}

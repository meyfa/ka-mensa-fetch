import axios from 'axios'
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
   * @returns The Axios MockAdapter.
   */
  get (): MockAdapter {
    if (this.mock == null) {
      // @ts-expect-error MockAdapter is not typed correctly
      this.mock = new MockAdapter(axios, { onNoMatch: 'throwException' })
    }
    return this.mock
  }

  /**
   * Restore Axios to normal functionality and clean up the MockAdapter.
   */
  restore (): void {
    if (this.mock != null) this.mock.restore()
    this.mock = undefined
  }
}

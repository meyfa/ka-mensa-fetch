import assert from 'node:assert'

/**
 * Checks whether the given iterable has unique entries.
 * A function is used to convert each entry into a string that represents that entry's identity.
 * In other words, two entries are considered duplicates iff the function returns the same string for both of them.
 *
 * @param iterable The iterable to check.
 * @param accessProp To-String-Converter for the iterable's entries.
 */
export function checkDuplicates<T> (iterable: Iterable<T>, accessProp: (item: T) => string): void {
  const counts: Map<string, number> = new Map()
  for (const entry of iterable) {
    const prop = accessProp(entry)
    counts.set(prop, (counts.get(prop) ?? 0) + 1)
  }
  for (const [prop, count] of counts) {
    assert.strictEqual(count, 1, `"${prop}" occurs ${count} times`)
  }
}

import ExpectStatic = Chai.ExpectStatic

/**
 * Checks whether the given iterable has unique entries.
 * A function is used to convert each entry into a string that represents that entries identity.
 * In other words, two entries are considered duplicates iff the function returns the same string for both of them.
 *
 * @param expect The Chai expect function.
 * @param iterable The iterable to check.
 * @param accessProp To-String-Converter for the iterable's entries.
 */
export function checkDuplicates<T> (expect: ExpectStatic, iterable: Iterable<T>, accessProp: (item: T) => string): void {
  const counts: Map<string, number> = new Map()
  for (const entry of iterable) {
    const prop = accessProp(entry)
    counts.set(prop, (counts.get(prop) ?? 0) + 1)
  }
  for (const [prop, count] of counts) {
    expect(count).to.equal(1, `"${prop}" occurs ${count} times`)
  }
}

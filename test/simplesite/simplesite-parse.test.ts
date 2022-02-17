import { parse } from '../../src/simplesite/simplesite-parse'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('simplesite/simplesite-parse', function () {
  it('can handle empty plan', function () {
    const str = '<!DOCYTPE html><html><body>' +
      '<div id="platocontent">' +
      '<h1>Mensa Am Adenauerring</h1>' +
      '</div>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date())
    expect(obj).to.deep.equal([])
  })

  it('extracts canteen name from first h1', function () {
    const str = '<!DOCTYPE html><html><body>' +
      '<div id="platocontent">' +
      '<h1>name-here</h1>' +
      '<h1>Mi 12.08.</h1><table></table>' +
      '</div>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date(2020, 7, 12))
    expect(obj).to.deep.equal([
      {
        id: 'adenauerring',
        name: 'name-here',
        date: { year: 2020, month: 7, day: 12 },
        lines: []
      }
    ])
  })

  it('is resilient to fake headlines in content-block', function () {
    // sometimes other content is prepended to the view, and that content might
    // contain h1 tags
    const str = '<!DOCTYPE html><html><body>' +
      '<div id="platocontent">' +
      '<div><h1>fake1</h1></div>' +
      '<div><h1>fake2</h1></div>' +
      '<h1>name-here</h1>' +
      '<h1>Mi 12.08.</h1><table></table>' +
      '</div>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date(2020, 7, 12))
    expect(obj).to.deep.equal([
      {
        id: 'adenauerring',
        name: 'name-here',
        date: { year: 2020, month: 7, day: 12 },
        lines: []
      }
    ])
  })

  it('deduces dates', function () {
    const str = '<!DOCTYPE html><html><body>' +
      '<div id="platocontent">' +
      '<h1>name-here</h1>' +
      '<h1>Di 11.08.</h1><table></table>' +
      '<h1>Mi 12.08.</h1><table></table>' +
      '<h1>Do 13.08.</h1><table></table>' +
      '</div>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date(2020, 7, 12))
    expect(obj).to.deep.equal([
      {
        id: 'adenauerring',
        name: 'name-here',
        date: { year: 2020, month: 7, day: 11 },
        lines: []
      },
      {
        id: 'adenauerring',
        name: 'name-here',
        date: { year: 2020, month: 7, day: 12 },
        lines: []
      },
      {
        id: 'adenauerring',
        name: 'name-here',
        date: { year: 2020, month: 7, day: 13 },
        lines: []
      }
    ])
  })

  it('does not include plans with invalid dates', function () {
    const str = '<!DOCTYPE html><html><body>' +
      '<div id="platocontent">' +
      '<h1>name-here</h1>' +
      '<h1>foo bar.baz.</h1><table></table>' +
      '</div>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date(2020, 7, 12))
    expect(obj).to.deep.equal([])
  })

  it('ignores empty rows in line table', function () {
    const str = '<!DOCTYPE html><html><body>' +
      '<div id="platocontent">' +
      '<h1>Mensa Am Adenauerring</h1>' +
      '<h1>Mi 12.08.</h1><table><tr></tr><tr></tr><tr></tr></table>' +
      '</div>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date(2020, 7, 12))
    expect(obj[0].lines).to.deep.equal([])
  })

  it('parses closed lines', function () {
    const str = '<!DOCTYPE html><html><body>' +
      '<div id="platocontent">' +
      '<h1>Mensa Am Adenauerring</h1>' +
      '<h1>Mi 12.08.</h1><table>' +
      '  <tr><td>Linie 1</td><td><table>' +
      '    <tr><td><div><b>Geschlossen:</b> 01.08.-31.08.</div></td></tr>' +
      '  </table></td></tr>' +
      '  <tr><td>Linie 2</td><td><table>' +
      '    <tr><td><div><b>Geschlossen:</b> 01.08.-31.08.</div></td></tr>' +
      '  </table></td></tr>' +
      '</table>' +
      '</div>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date(2020, 7, 12))
    expect(obj).to.deep.equal([
      {
        id: 'adenauerring',
        name: 'Mensa Am Adenauerring',
        date: { year: 2020, month: 7, day: 12 },
        lines: [
          {
            id: 'l1',
            name: 'Linie 1',
            meals: []
          },
          {
            id: 'l2',
            name: 'Linie 2',
            meals: []
          }
        ]
      }
    ])
  })

  it('parses lines with no meal content', function () {
    // This markup has never been observed in the wild, the table was always present, even if it was empty.
    // Nonetheless, we have to test this in case it ever happens.
    const str = '<!DOCTYPE html><html><body>' +
      '<div id="platocontent">' +
      '<h1>Mensa Am Adenauerring</h1>' +
      '<h1>Mi 12.08.</h1><table>' +
      '  <tr><td>Linie 1</td><td></td></tr>' +
      '  <tr><td>Linie 2</td><td></td></tr>' +
      '</table>' +
      '</div>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date(2020, 7, 12))
    expect(obj).to.deep.equal([
      {
        id: 'adenauerring',
        name: 'Mensa Am Adenauerring',
        date: { year: 2020, month: 7, day: 12 },
        lines: [
          {
            id: 'l1',
            name: 'Linie 1',
            meals: []
          },
          {
            id: 'l2',
            name: 'Linie 2',
            meals: []
          }
        ]
      }
    ])
  })

  it('parses meals', function () {
    const str = '<!DOCTYPE html><html><body>' +
      '<div id="platocontent">' +
      '<h1>Mensa Am Adenauerring</h1>' +
      '<h1>Mi 12.08.</h1><table>' +
      '  <tr><td>[kœri]werk</td><td><table>' +
      '    <tr><td>[R]</td><td><span><b>Kalb</b> (Sn,Se,We)<span></td><td><span>2,00 &euro;</span></td></tr>' +
      '    <tr><td>[VG]</td><td><span><b>vegan</b> (So,Sn,Se,We)<span></td><td><span>2,00 &euro;</span></td></tr>' +
      '    <tr><td>[VG]</td><td><span><b>Frites</b><span></td><td><span>1,20 &euro;</span></td></tr>' +
      '  </table></td></tr>' +
      '</table>' +
      '</div>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date(2020, 7, 12))
    expect(obj).to.deep.equal([
      {
        id: 'adenauerring',
        name: 'Mensa Am Adenauerring',
        date: { year: 2020, month: 7, day: 12 },
        lines: [
          {
            id: 'aktion',
            name: '[kœri]werk',
            meals: [
              {
                name: 'Kalb', price: '2,00 €', classifiers: ['R'], additives: ['Sn', 'Se', 'We']
              },
              {
                name: 'vegan', price: '2,00 €', classifiers: ['VG'], additives: ['So', 'Sn', 'Se', 'We']
              },
              {
                name: 'Frites', price: '1,20 €', classifiers: ['VG'], additives: []
              }
            ]
          }
        ]
      }
    ])
  })

  it('includes lines with unknown names', function () {
    const str = '<!DOCTYPE html><html><body>' +
      '<div id="platocontent">' +
      '<h1>Mensa Am Adenauerring</h1>' +
      '<h1>Mi 12.08.</h1><table>' +
      '  <tr><td>unknown-line-name</td><td><table>' +
      '    <tr><td>[VG]</td><td><span><b>Frites</b><span></td><td><span>1,20 &euro;</span></td></tr>' +
      '  </table></td></tr>' +
      '</table>' +
      '</div>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date(2020, 7, 12))
    expect(obj).to.deep.equal([
      {
        id: 'adenauerring',
        name: 'Mensa Am Adenauerring',
        date: { year: 2020, month: 7, day: 12 },
        lines: [
          {
            id: null,
            name: 'unknown-line-name',
            meals: [
              {
                name: 'Frites', price: '1,20 €', classifiers: ['VG'], additives: []
              }
            ]
          }
        ]
      }
    ])
  })
})

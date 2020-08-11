'use strict'

const { expect } = require('chai')

const parse = require('../../src/handicap/handicap-parse.js')

describe('handicap/handicap-parse.js', function () {
  it('can handle empty plan', function () {
    const str = '<!DOCYTPE html><html><body><h1>Mensa am Adenauerring</h1></body></html>'
    const obj = parse(str, 'adenauerring', new Date())
    expect(obj).to.deep.equal([])
  })

  it('extracts canteen name from first h1', function () {
    const str = '<!DOCTYPE html><html><body>' +
      '<h1>name-here</h1>' +
      '<h1>Mi 12.08.</h1><table></table>' +
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
      '<h1>name-here</h1>' +
      '<h1>Di 11.08.</h1><table></table>' +
      '<h1>Mi 12.08.</h1><table></table>' +
      '<h1>Do 13.08.</h1><table></table>' +
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

  it('ignores empty rows in line table', function () {
    const str = '<!DOCTYPE html><html><body>' +
      '<h1>Mensa am Adenauerring</h1>' +
      '<h1>Mi 12.08.</h1><table><tr></tr><tr></tr><tr></tr></table>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date(2020, 7, 12))
    expect(obj[0].lines).to.deep.equal([])
  })

  it('parses closed lines', function () {
    const str = '<!DOCTYPE html><html><body>' +
      '<h1>Mensa am Adenauerring</h1>' +
      '<h1>Mi 12.08.</h1><table>' +
      '  <tr><td>Linie 1</td><td><table>' +
      '    <tr><td><div><b>Geschlossen:</b> 01.08.-31.08.</div></td></tr>' +
      '  </table></td></tr>' +
      '  <tr><td>Linie 2</td><td><table>' +
      '    <tr><td><div><b>Geschlossen:</b> 01.08.-31.08.</div></td></tr>' +
      '  </table></td></tr>' +
      '</table>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date(2020, 7, 12))
    expect(obj).to.deep.equal([
      {
        id: 'adenauerring',
        name: 'Mensa am Adenauerring',
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
      '<h1>Mensa am Adenauerring</h1>' +
      '<h1>Mi 12.08.</h1><table>' +
      '  <tr><td>[kœri]werk</td><td><table>' +
      '    <tr><td>[R]</td><td><span><b>Kalb</b> (Sn,Se,We)<span></td><td><span>2,00 &euro;</span></td></tr>' +
      '    <tr><td>[VG]</td><td><span><b>vegan</b> (So,Sn,Se,We)<span></td><td><span>2,00 &euro;</span></td></tr>' +
      '    <tr><td>[VG]</td><td><span><b>Frites</b><span></td><td><span>1,20 &euro;</span></td></tr>' +
      '  </table></td></tr>' +
      '</table>' +
      '</body></html>'
    const obj = parse(str, 'adenauerring', new Date(2020, 7, 12))
    expect(obj).to.deep.equal([
      {
        id: 'adenauerring',
        name: 'Mensa am Adenauerring',
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
})

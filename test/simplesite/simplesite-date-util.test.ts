import assert from 'node:assert'
import * as dateUtil from '../../src/simplesite/simplesite-date-util.js'
import moment from 'moment'

describe('simplesite/simplesite-date-util', function () {
  describe('#getCurrentWeek()', function () {
    it('returns the current ISO week number', function () {
      // this test is kind of useless - but also pretty much free
      assert.strictEqual(dateUtil.getCurrentWeek(), moment().isoWeek())
    })
  })

  describe('#isDateSupported()', function () {
    it('returns true for start of current week', function () {
      // use start of week
      const date = moment().isoWeekday(1).hour(0).minute(0).second(0).millisecond(0).toDate()
      assert.strictEqual(dateUtil.isDateSupported(date), true)
    })

    it('returns false for dates before start of current week', function () {
      // use start of week, then go one millisecond earlier
      const date = moment().isoWeekday(1).hour(0).minute(0).second(0).millisecond(-1).toDate()
      assert.strictEqual(dateUtil.isDateSupported(date), false)
    })

    it('returns false for dates too far into the future', function () {
      // add a few weeks
      const date = moment().add(8, 'weeks').toDate()
      assert.strictEqual(dateUtil.isDateSupported(date), false)
    })
  })

  describe('#convertToWeeks()', function () {
    it('returns a Set', function () {
      assert.ok(dateUtil.convertToWeeks([]) instanceof Set)
    })

    it('supports year-month-date strings', function () {
      const converted = dateUtil.convertToWeeks(['2020-10-25', '2020-06-08', '2020-07-15'])
      assert.deepStrictEqual([...converted], [43, 24, 29])
    })

    it('supports {year, month, day} objects', function () {
      const converted = dateUtil.convertToWeeks([
        { year: 2020, month: 9, day: 25 },
        { year: 2020, month: 5, day: 8 },
        { year: 2020, month: 6, day: 15 }
      ])
      assert.deepStrictEqual([...converted], [43, 24, 29])
    })

    it('supports {year, month, date} objects', function () {
      const converted = dateUtil.convertToWeeks([
        { year: 2020, month: 9, day: 25 },
        { year: 2020, month: 5, day: 8 },
        { year: 2020, month: 6, day: 15 }
      ])
      assert.deepStrictEqual([...converted], [43, 24, 29])
    })

    it('supports JS Date objects', function () {
      const converted = dateUtil.convertToWeeks([
        new Date(2020, 9, 25),
        new Date(2020, 5, 8),
        new Date(2020, 6, 15)
      ])
      assert.deepStrictEqual([...converted], [43, 24, 29])
    })

    it('supports millisecond timestamps', function () {
      const converted = dateUtil.convertToWeeks([
        new Date(2020, 9, 25).getTime(),
        new Date(2020, 5, 8).getTime(),
        new Date(2020, 6, 15).getTime()
      ])
      assert.deepStrictEqual([...converted], [43, 24, 29])
    })
  })
})

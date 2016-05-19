/* global describe, it */

'use strict'

const assert = require('assert')
const fixResult = require('./lib/helper').fixResult

const CalEventFactory = require('../src/CalEventFactory')
const CalEvent = require('../src/CalEvent')
const Equinox = require('../src/Equinox')
const Easter = require('../src/Easter')
const Hebrew = require('../src/Hebrew')
const Hijri = require('../src/Hijri')

describe('#CalEventFactory', function () {
  it('12-03', function () {
    var date = new CalEventFactory({
      fn: 'gregorian',
      month: 12,
      day: 3
    })
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-12-03 00:00:00',
      start: 'thu 2015-12-03 00:00',
      end: 'fri 2015-12-04 00:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('spring equinox', function () {
    var date = new CalEventFactory({
      fn: 'equinox',
      season: 'spring'
    })
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-03-20 00:00:00',
      start: 'fri 2015-03-20 00:00',
      end: 'sat 2015-03-21 00:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('3 days before Easter', function () {
    var date = new CalEventFactory({
      fn: 'easter',
      offset: -3
    })
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-04-02 00:00:00',
      start: 'thu 2015-04-02 00:00',
      end: 'fri 2015-04-03 00:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('15 Nisan 5775', function () {
    var date = new CalEventFactory({
      fn: 'hebrew',
      day: 15,
      month: 1
    })
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-04-04 00:00:00 -0600',
      start: 'fri 2015-04-03 18:00',
      end: 'sat 2015-04-04 18:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('3 Shawwal', function () {
    var date = new CalEventFactory({
      fn: 'islamic',
      day: 3,
      month: 10
    })
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-07-19 00:00:00 -0600',
      start: 'sat 2015-07-18 18:00',
      end: 'sun 2015-07-19 18:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })
})

describe('#CalEvent', function () {
  it('12-03', function () {
    var date = new CalEvent({month: 12, day: 3})
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-12-03 00:00:00',
      start: 'thu 2015-12-03 00:00',
      end: 'fri 2015-12-04 00:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('2015-12-03', function () {
    var date = new CalEvent({year: 2015, month: 12, day: 3})
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-12-03 00:00:00',
      start: 'thu 2015-12-03 00:00',
      end: 'fri 2015-12-04 00:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('2015-12-03 using Date', function () {
    var date = new CalEvent(new Date('2015-12-03 00:00:00'))
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-12-03 00:00:00',
      start: 'thu 2015-12-03 00:00',
      end: 'fri 2015-12-04 00:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('2015-12-03 in 2016', function () {
    var date = new CalEvent({year: 2015, month: 12, day: 3})
    var res = date.inYear(2016).get()
    var exp = []
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('can compare with other event', function () {
    var date = new CalEvent({year: 2015, month: 12, day: 3}).inYear(2015)
    var comp = new CalEvent(new Date('2015-12-03 12:00:00')).inYear(2015)
    var res = date.isEqual(comp)
    assert.strictEqual(res, true)
  })

  it('can compare with other event of different date', function () {
    var date = new CalEvent({year: 2015, month: 12, day: 4}).inYear(2015)
    var comp = new CalEvent(new Date('2015-12-03 12:00:00')).inYear(2015)
    var res = date.isEqual(comp)
    assert.strictEqual(res, false)
  })
})

describe('#Easter', function () {
  it('3 days before Easter', function () {
    var date = new Easter({offset: -3})
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-04-02 00:00:00',
      start: 'thu 2015-04-02 00:00',
      end: 'fri 2015-04-03 00:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('50 days after Orthodox Easter', function () {
    var date = new Easter({offset: 50, type: 'orthodox'})
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-06-01 00:00:00',
      start: 'mon 2015-06-01 00:00',
      end: 'tue 2015-06-02 00:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })
})

describe('#Equinox', function () {
  it('spring equinox', function () {
    var date = new Equinox({season: 'spring'})
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-03-20 00:00:00',
      start: 'fri 2015-03-20 00:00',
      end: 'sat 2015-03-21 00:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('spring equinox in Asia/Tokyo', function () {
    var date = new Equinox({season: 'spring', timezone: 'Asia/Tokyo'})
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-03-21 00:00:00',
      start: 'sat 2015-03-21 00:00',
      end: 'sun 2015-03-22 00:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('3 days after autumn equinox', function () {
    var date = new Equinox({season: 'autumn', offset: 3})
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-09-26 00:00:00',
      start: 'sat 2015-09-26 00:00',
      end: 'sun 2015-09-27 00:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })
})

describe('#Hebrew', function () {
  // hebrew calendar
  it('15 Nisan 5775', function () {
    var date = new Hebrew({
      day: 15,
      month: 1
    })
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-04-04 00:00:00 -0600',
      start: 'fri 2015-04-03 18:00',
      end: 'sat 2015-04-04 18:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('15 Nisan 5776', function () {
    var date = new Hebrew({
      day: 15,
      month: 1
    })
    var res = date.inYear(2016).get()
    var exp = [{
      date: '2016-04-23 00:00:00 -0600',
      start: 'fri 2016-04-22 18:00',
      end: 'sat 2016-04-23 18:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('18 Tevet 5775/ 5776', function () {
    var date = new Hebrew({
      day: 18,
      month: 10
    })
    var res = date.inYear(2015).get()
    var exp = [{
      'date': '2015-01-09 00:00:00 -0600',
      'start': 'thu 2015-01-08 18:00',
      'end': 'fri 2015-01-09 18:00'
    }, {
      date: '2015-12-30 00:00:00 -0600',
      start: 'tue 2015-12-29 18:00',
      end: 'wed 2015-12-30 18:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('18 Tevet in gregorian year 2016', function () {
    var date = new Hebrew({
      day: 18,
      month: 10
    })
    var res = date.inYear(2016).get()
    var exp = []
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })
})

describe('#Hijri', function () {
  // hijri calendar
  it('3 Shawwal', function () {
    var date = new Hijri({
      day: 3,
      month: 10
    })
    var res = date.inYear(2015).get()
    var exp = [{
      date: '2015-07-19 00:00:00 -0600',
      start: 'sat 2015-07-18 18:00',
      end: 'sun 2015-07-19 18:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  // hijri calendar
  it('27 Rabi al-awwal', function () {
    var date = new Hijri({
      day: 27,
      month: 3
    })
    var res = date.inYear(2016).get()
    var exp = [{
      date: '2016-01-07 00:00:00 -0600',
      start: 'wed 2016-01-06 18:00',
      end: 'thu 2016-01-07 18:00'
    }, {
      date: '2016-12-26 00:00:00 -0600',
      start: 'sun 2016-12-25 18:00',
      end: 'mon 2016-12-26 18:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })

  it('27 Rabi al-awwal 1438', function () {
    var date = new Hijri({
      day: 27,
      month: 3,
      year: 1438
    })
    var res = date.inYear(2016).get()
    var exp = [{
      date: '2016-12-26 00:00:00 -0600',
      start: 'sun 2016-12-25 18:00',
      end: 'mon 2016-12-26 18:00'
    }]
    // console.log(fixResult(res))
    assert.deepEqual(fixResult(res), exp)
  })
})

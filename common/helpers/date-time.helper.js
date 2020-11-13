'use strict';

const moment = require('moment');

class DateTimeHelper {
    addMinute(date, minute) {
        return moment(date).add(minute, 'minutes').toDate();
    }

    addDay(date, day) {
        return moment(date).add(day, 'days').toDate();
    }

    addMinuteFromNow(minute) {
        return moment().add(minute, 'minutes').toDate();
    }

    convertToUtc(dateTime) {
        return moment(dateTime).utc().format();
    }
}

module.exports = new DateTimeHelper();
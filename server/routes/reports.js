var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Urls = 'mongodb://localhost:27017/calssweb';

// 日志列表

//判断当前日期为当月第几周
function getMonthWeek(newDate) {
    var Year = newDate.getFullYear();
    var Month = newDate.getMonth() + 1;
    var Day = newDate.getDate();
    console.log(Year)
    console.log(Month)
    console.log(Day)
    var date = new Date(Year, parseInt(Month) - 1, Day), Week = date.getDay(), d = date.getDate();
    return Math.ceil((d + 6 - Week) / 7);
};

//判断当前日期为当年第几周
function getYearWeek(newDate) {
    var Year = newDate.getFullYear();
    var Month = newDate.getMonth() + 1;
    var Day = newDate.getDate();
    console.log(Year)
    console.log(Month)
    console.log(Day)
    var date1 = new Date(Year, parseInt(Month) - 1, Day), date2 = new Date(Year, 0, 1), d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
    return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
};

function check(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    if (dt1.getFullYear() == dt2.getFullYear() && dt1.getMonth() == dt2.getMonth()) return true;
    else return false;
}

function isSameWeek(old, now) {
    var oneDayTime = 1000 * 60 * 60 * 24;
    var old_count = parseInt(new Date(old).getTime() / oneDayTime);
    var now_other = parseInt(new Date(now).getTime() / oneDayTime);
    return parseInt((old_count + 4) / 7) == parseInt((now_other + 4) / 7);
}


router.post('/list', function (req, res, next) {
    var newDate = new Date();
    getMonthWeek(newDate);

})
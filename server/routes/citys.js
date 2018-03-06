var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;
//获取城市列表
router.post('/CityList', function (req, res, next) {
    req.route.path = "/page"; //修改path来设定 对 数据库的操作
    var page = req.body.page || 1;
    var rows = req.body.rows || 10;
    handler(req, res, "city", [{}, {limit: rows, skip: (page - 1) * rows}], function (data, count) {
        var obj = {
            data: data,
            total: count,
            success: "成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
    });
})
//添加城市
router.post('/add', function (req, res, next) {
    var date = new Date();
    req.body.createDate = date.getTime();
    handler(req, res, "city", req.body, function (data) {

        if (data.length == 0) {
            res.end('{"err":"抱歉，添加失败"}');
        } else {
            res.end('{"success":"添加成功"}');
        }
    });
});

router.post('/update', function (req, res, next) {
    var selectors = [
        {"_id": ObjectId(req.body._id)},
        {
            "$set": {
                province: req.body.province, //省
                cityName: req.body.cityName, //市
                areaCode: req.body.areaCode,//区号
                specialty: req.body.specialty,//区号
                GDP: req.body.GDP,//区号
                detail: req.body.detail
            }
        }
    ];
    handler(req, res, "city", selectors, function (data) {
        if (data.length == 0) {
            res.end('{"err":"抱歉，修改失败"}');
        } else {
            res.end('{"success":"修改成功"}');
        }
    });
})

router.post('/delete', function (req, res, next) {
    handler(req, res, "city", {"_id": ObjectId(req.body._id)}, function (data) {
        if (data.length == 0) {
            res.end('{"err":"抱歉，删除失败"}');
        } else {
            var obj = {
                success: "删除成功"
            };
            var str = JSON.stringify(obj);
            res.end(str);
        }
    })
})

router.post('/detail', function (req, res, next) {
    handler(req, res, 'city', {"_id": ObjectId(req.body.id)}, function (data) {
        if (data.length == 0) {
            res.end('{"err":"抱歉，查询失败"}');
        } else {
            var str = JSON.stringify(data);
            res.end(str);
        }
    })
})
module.exports = router;
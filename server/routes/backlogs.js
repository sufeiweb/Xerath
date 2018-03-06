var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Urls = 'mongodb://localhost:27017/calssweb';

//列表
function updateData(id, result) {
    var updataData = function (db, callback) {
        var collection = db.collection('backlog');
        var whereStrs = {"_id": ObjectId(id)};
        var updataStr = {$set: {"backlogStatus": 2}};
        collection.update(whereStrs, updataStr, function (err1, result1) {
            if (err1) {
                console.log('Error' + err1);
                return;
            }
        })
    }
    MongoClient.connect(Urls, function (err, db) {
        console.log('连接成功');
        updataData(db, function (result) {
            console.log(result);
            db.close();
        })
    })
}

router.post('/list', function (req, res, next) {
    var selectData = function (db, callback) {
        var collection = db.collection('backlog');
        var whereStr = {"backlogStatus": req.body.backlogStatus};
        collection.find(whereStr).toArray(function (err, result) {
            if (err) {
                console.log("Error" + err);
                return;
            }
            if (req.body.backlogStatus == 1) {
                var newDate = new Date().getTime();
                for (let i = 0; i < result.length; i++) {
                    console.log(result[i].endTime);
                    console.log(newDate);
                    if (result[i].endTime < newDate) {
                        updateData(result[i]._id, result);
                        result.splice(i, 1);
                    }
                }
            }
            callback(result);
        })
    }

    MongoClient.connect(Urls, function (err, db) {
        console.log('连接成功');
        selectData(db, function (result) {
            // console.log(result);
            res.status(200);
            res.json(result);
        })
    })
})
//取消
router.post('/cancels', function (req, res, next) {
    var updataData = function (db, callback) {
        var collection = db.collection('backlog');
        var whereStrs = {"_id": ObjectId(req.body.id)};
        var updataStr = {$set: {"backlogStatus": 4}};
        collection.update(whereStrs, updataStr, function (err1, result1) {
            if (err1) {
                console.log('Error' + err1);
                return;
            }
            callback(result1)
        })
    }
    MongoClient.connect(Urls, function (err, db) {
        console.log('连接成功');
        updataData(db, function (result) {
            // console.log(result);
            res.status(200);
            res.json(result);
            db.close();
        })
    })
})
//恢复
router.post('/recovers', function (req, res, next) {
    var updataData = function (db, callback) {
        var collection = db.collection('backlog');
        var whereStrs = {"_id": ObjectId(req.body.id)};
        var endTime = new Date().getTime();
        endTime += 6 * 60 * 60 * 1000;
        var updataStr = {
            $set: {
                "backlogStatus": 1,
                "endTime": endTime
            }
        };
        collection.update(whereStrs, updataStr, function (err1, result1) {
            if (err1) {
                console.log('Error' + err1);
                return;
            }
            callback(result1)
        })
    }
    MongoClient.connect(Urls, function (err, db) {
        console.log('连接成功');
        updataData(db, function (result) {
            // console.log(result);
            res.status(200);
            res.json(result);
            db.close();
        })
    })
})
//完成
router.post('/perform', function (req, res, next) {
    var updataData = function (db, callback) {
        var collection = db.collection('backlog');
        var whereStrs = {"_id": ObjectId(req.body.id)};
        var endTime = new Date().getTime();
        var updataStr = {$set: {"backlogStatus": 3, "endTime": endTime}};
        collection.update(whereStrs, updataStr, function (err1, result1) {
            if (err1) {
                console.log('Error' + err1);
                return;
            }
            callback(result1)
        })
    }
    MongoClient.connect(Urls, function (err, db) {
        console.log('连接成功');
        updataData(db, function (result) {
            // console.log(result);
            res.status(200);
            res.json(result);
            db.close();
        })
    })
})
//添加
router.post('/add', function (req, res, next) {
    handler(req, res, "backlog", req.body, function (data) {
        if (data.length == 0) {
            res.end('{"err":"抱歉，添加失败"}');
        } else {
            res.end('{"success":"添加成功"}');
        }
    });
});
//添加备注
router.post('/remarks', function (req, res, next) {
    var updataData = function (db, callback) {
        var collection = db.collection('backlog');
        var whereStrs = {"_id": ObjectId(req.body.id)};
        var updataStrs = [];
        collection.find(whereStrs).toArray(function (err, result) {
            if (err) {
                conole.log('Error:' + err);
                return;
            }
            if (result[0].iptRemark) {
                updataStrs = result[0].iptRemark;
                updataStrs.push({content:req.body.iptRemark,times:new Date().getTime()});
            } else {
                updataStrs.push({content:req.body.iptRemark,times:new Date().getTime()});
            }
            var updataStr = {$set: {"iptRemark": updataStrs}};
            collection.update(whereStrs, updataStr, function (err1, result1) {
                if (err1) {
                    console.log('Error' + err1);
                    return;
                }
                callback(result1)
            })
        })
    }
    MongoClient.connect(Urls, function (err, db) {
        console.log('连接成功');
        updataData(db, function (result) {
            // console.log(result);
            res.status(200);
            res.json({"msg": "success"});
            db.close();
        })
    })
})
//chafan
router.post('/detail', function (req, res, next) {
    handler(req, res, 'backlog', {"_id": ObjectId(req.body.id)}, function (data) {
        if (data.length == 0) {
            res.end('{"err":"抱歉，查询失败"}');
        } else {
            var str = JSON.stringify(data);
            res.end(str);
        }
    })
})
module.exports = router;
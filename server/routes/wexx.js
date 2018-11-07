var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Urls = 'mongodb://localhost:27017/xerath';
//添加
router.post('/add', function(req, res, next) {
    MongoClient.connect(Urls,function (err,db) {
        console.log("连接成功");
        selectData(db,function (result) {
            res.status(200);
            res.json(result);
            db.close();
        })
    })

    var selectData=function (db,callback) {
        var collection = db.collection('wexx');
        var whereStr = {"logisticsNo":req.body.logisticsNo};
        var updateOBj = [];
        collection.find(whereStr).toArray(function (err,result) {
            if(err){
                console.log("Error:"+err);
                return;
            }
            if(result[0].logisticsList){
                var str = [];
                str.push(...result[0].logisticsList);
                str.push(req.body.logisticsList);
                updateOBj = str;
            }else {
                var obj = [];
                obj.push(req.body.logisticsList)
                updateOBj = obj;
            }
            var updateStr = {"$set":{
                    "logisticsList":updateOBj,
                }
            };
            collection.update(whereStr,updateStr,function (err,result) {
                if(err){
                    console.log("Error:"+err);
                    return;
                }
                callback(result);
            })
        })
    }
});
//chafan
router.post('/detail',function (req,res,next) {
    var whereStr = {"logisticsNo":req.body.logisticsNo};
    handler(req,res,'wexx',whereStr,function (data) {
        if(data.length==0){
            res.end('{"err":"抱歉，查询失败"}');
        }else{
            var str = JSON.stringify(data);
            res.end(str);
        }
    })
})
module.exports = router;
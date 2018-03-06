var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId;

//获取列表
router.post('/pjList',function (req,res,next) {
    req.route.path = "/page"; //修改path来设定 对 数据库的操作
    var page = req.body.page || 1;
    var rows = req.body.rows || 10;
    handler(req, res, "project", [{},{limit: rows, skip:(page-1)*rows}] ,function(data,count){
        var obj = {
            data:data,
            total:count,
            success:"成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
    });
})
//添加
router.post('/add', function(req, res, next) {
    var date = new Date();
    req.body.createDate = date.getTime();
    handler(req, res, "project", req.body,function(data){

        if(data.length==0){
            res.end('{"err":"抱歉，添加失败"}');
        }else{
            res.end('{"success":"添加成功"}');
        }
    });
});
//详情
router.post('/detail',function (req,res,next) {
    handler(req,res,'project',{"_id" : ObjectId(req.body.id)},function (data) {
        if(data.length==0){
            res.end('{"err":"抱歉，查询失败"}');
        }else{
            var str = JSON.stringify(data);
            res.end(str);
        }
    })
})

router.post('/update',function(req,res,next){
    var selectors = [
        {"_id":ObjectId(req.body._id)},
        {"$set":{
            editTime:req.body.editTime,
            editTitle:req.body.editTitle,
            editDescription:req.body.editDescription,
            editTech:req.body.editTech,
            editTechDT:req.body.editTechDT,
            editDuty:req.body.editDuty,
            editExpect:req.body.editExpect
        }
        }
    ];
    handler(req, res, "project", selectors,function(data){
        if(data.length==0){
            res.end('{"err":"抱歉，修改失败"}');
        }else{
            res.end('{"success":"修改成功"}');
        }

    });
})
module.exports = router;
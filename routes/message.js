/**
 * Created by Administrator on 2017/4/16.
 */
var express=require('express');
var router=express.Router();
var request=require('request');

var token='';

request.get('https://api.followbee.cn/index.php', {
    json: true
}, function (err, rest, body) {
    token=body.data.token;
});

router.get('/', function(req, res, next){
    request.get('https://api.followbee.cn/api.php/message?token='+token+'&page_size=10000&type=1', {
        json: true
    }, function (err, rest, body) {
        var data=body.data.data_list;
        if (!data) {
            data=[];
        }
        res.render('message', {
            data:data
        });
    });
});

router.get('/:id', function(req, res){
    var id=req.params.id;

    request.get('https://api.followbee.cn/api.php/message/'+id+'?token='+token, {
        json: true
    }, function (err, rest, body) {
        var data=body.data;
        if (!data) {
            data='';
        }
        res.render('detail-message', {data:data, title:'œÍ«È“≥√Ê'});
    });
});

module.exports=router;
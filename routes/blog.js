/**
 * Created by Administrator on 2017/4/16.
 */
var express = require('express');
var request = require('request');
var router = express.Router();

var token='';

request.get('https://api.followbee.cn/index.php', {
    json: true
}, function (err, rest, body) {
    token=body.data.token;
});

router.get('/', function(req, res){
    request.get('https://api.followbee.cn/api.php/pavilion/recent?token='+token+'&page_size=1000', {
        json: true
    }, function (err, rest, body) {
        var data=body.data.data_list;
        res.render('blog', {
            data:data
        });
    });

});

router.get('/:id', function(req, res){
    var id=req.params.id;

    request.get('https://api.followbee.cn/api.php/pavilion/detail?token='+token+'&id='+id, {
        json: true
    }, function (err, rest, body) {
        var data=body.data;
        res.render('detail', {data:data, title:'详情页面'});
    });
});

module.exports=router;
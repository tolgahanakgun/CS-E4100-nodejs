const express = require('express');
const router = express.Router();
var app = express();
var fs = require("fs");
var request=require('request');

router.get('/calc/:operand', (req, res, next) => {
    result_message = 0.0;
    if(req.param('first') == null && req.param('second')==null){
        result_message = 'Missing both parameters'
    } else if(req.param('first')==null){
        result_message = 'Missing first required parameter';
    } else if(req.param('second')==null){
        result_message = 'Missing second required parameter';
    } else {
        var first = parseInt(req.param('first'));
        var second = parseInt(req.param('second'));
        switch(req.params.operand){
            case 'add':
                result_message = (first+second).toFixed(3);
                break;
            case 'sub':
                result_message = (first-second).toFixed(3);
                break;
            case 'div':
                result_message = (first/second).toFixed(3);
                break;
            case 'mul':
                result_message = (first*second).toFixed(3);
                break;
        }
    }
    res.status(200).json({
        result: result_message
    });
});

router.get('/vappu/gettime', (req, res, next) => {
    // Vappu time 01.05.2019 00:00:00
    var vappu = new Date(2019, 4, 1, 0, 0, 0, 0);
    res.status(200).json({
        message: Math.floor((vappu-now)/1e3)
    });
});

router.get('/images', (req, res, next) => {
    var images = JSON.parse(fs.readFileSync('images.json', 'utf8'))
    var o = {};
    for (var i = 0; i < images.length; i++) {
        request.get('http://localhost'+images[i].url, options, function (err, res, body) {
            if (res.statusCode == 200) {
                var contentLength = res.headers['Content-Length']
                var contentType = res.headers['Content-Type']
                var contentName = res.headers['Content-Disposition']
                var data = {
                    name: contentName+'.'+contentType.split('/').toLowerCase(),
                    type: contentType.split('/')[1].toUpperCase(),
                    size: (contentLength/1000.0).toFixed(3)
                };
                o.push(data)
            };
        });
    }
    res.status(200).json(o)
});

app.use('/', router);

module.exports = app;

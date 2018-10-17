const express = require('express');
const router = express.Router();
var app = express();

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
                result_message = Math.round( (first-second) * 1e3 ) / 1e3;
                break;
            case 'sub':
                result_message = Math.round( (first-second) * 1e3 ) / 1e3;
                break;
            case 'div':
                result_message = Math.round( (first/second) * 1e3 ) / 1e3;
                break;
            case 'mul':
                result_message = Math.round( (first*second) * 1e3 ) / 1e3;
                break;
        }
    }
    res.status(200).json({
        message: result_message
    });
});

router.get('/vappu/gettime', (req, res, next) => {
    // Vappu time 01.05.2019 00:00:00
    var vappu = new Date(2019, 4, 1, 0, 0, 0, 0);
    res.status(200).json({
        message: Math.floor((vappu-now)/1e3)
    });
});

app.use('/', router);

module.exports = app;

/**
 * HW1 ROUTER
 */


var express = require('express');
var router = express.Router();
var request = require('request');



router.get('/', function (req, res, next) {
    res.send("Route is working, please enter in a word");
})




router.get('/:word',function (req,res,next) {
        let theWord = req.params.word;
        let lenWord = theWord.length;
        let json = JSON.stringify({string: theWord, length: lenWord});
        res.send(json);
    });

router.post('/', function (req,res, next) {
        let newWord = req.body.word;
        let lenWord = newWord.length;
        let json = JSON.stringify({string: newWord, length: lenWord});
        res.send(json)

    });
        

module.exports = router;

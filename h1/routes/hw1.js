/**
 * HW1 ROUTER
 */


var express = require('express');
var router = express.Router();
var request = require('request');


/* GET Request for hw1 .
router.get('/', function (req, res, next) {
    res.send("Route is working");
})

*/


router.route('/:word')
    .get(function (req,res) {
        let theWord = req.params.word;
        let lenWord = theWord.length;
        let json = JSON.stringify({string: theWord, length: lenWord});
        res.send(json);
    })
    .post(function (req,res) {
        let newWord = req.body.word;
       // let lenWord = newWord.length;
        let json = JSON.stringify({string: newWord});
        console.log(newWord)
        res.send(json)

    });
        

module.exports = router;


/**
 * HW 2 CS 591 SA1
 *
 */


var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hw2')
const db = mongoose.connection
db.once('open', function () {
    console.log('Connection successful.')
})
const Schema = mongoose.Schema
const wordSchema = new Schema({
    wordString: String,
    wordLength: String,
})

const Word = mongoose.model('Word', wordSchema)


//FIRST GET REQUEST.
//CHECKS TO SEE IF THE WORD IS IN THE DB, IF NOT: ADDS IT, IF SO: RETURNS RESULT.
router.get('/:word',function (req,res,next) {
    let newWord = req.params.word;
    Word.find({wordString: newWord}, function (err, results) {
    }).then(function (results) {
        if (results.length !=0) {
            console.log("ALREADY IN DB" )
            res.json(results)
        }
        else {
            let word = new Word(
                {
                    wordString: newWord,
                    wordLength: newWord.length,
                })
            word.save()
            console.log("JUST ADDED TO DB")
            res.send(word)
        }
    });
});

//RETURNS ALL ENTRIES IN THE DATABASE. DOES A FIND ALL
router.get('/', function (req,res,next) {
    Word.find({}, function (err, results) {
        console.log(results)
    }).then(function(results) {
        res.json(results);
    })
        .catch(function(err) {
        console.log(err)

        next()
    })
});


//DELETE Delete the specified user
router.delete('/:word', function (req, res, next) {
    let newWord = req.params.word;
    Word.find({wordString: newWord}, function (err, result) {
    }).then(function (results) {
        if (results != 0) {
            Word.remove({wordString: newWord}, function (err, result) {
            })
            res.json({message: 'Successfully Deleted User'});
        }
        else{
            res.json({message: 'String not found'});
        }

    })
});






//USING TO DO CHECKS IF IN DB OR NOT
router.post('/', function (req,res, next) {
    let newWord = req.body.word;
    if(newWord == undefined || newWord.length ==0){
        res.json({message: 'Please Enter A String'});
    }
    else{
        Word.find({wordString: newWord}, function (err, results) {
        }).then(function (results) {
            if (results.length !=0) {
                console.log("ALREADY IN DB" )
                res.json(results)
            }

            else {
                let word = new Word(
                    {
                        wordString: newWord,
                        wordLength: newWord.length,
                    })
                word.save()
                console.log("JUST ADDED TO DB")
                res.send(word)
            }
        });
    }

});

    /*TEMPLATE
     router.post('/', function (req,res, next) {
     let newWord = req.body.word;
     console.log(newWord)
     let word = new Word(
     {
     wordString: newWord,
     wordLength: newWord.length,
     })
     word.save()
     res.send(word)

     });
     */



module.exports = router;

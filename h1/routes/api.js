
/**
 * CAVEMAN
 *
 */


var express = require('express');
var router = express.Router();
var request = require('request');
const Eat = require('../config/Twitter_config')
const async = require('async')
var Postmates = require('postmates');


var postmates = new Postmates('yourCustomerId', 'yourAPIkey');


//Helper for authorization
const authorized = require('./authCheck')


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/project')
const db = mongoose.connection
db.once('open', function () {
    console.log('Connection successful.')
})

const Schema = mongoose.Schema
const foodSchema = new Schema({
    cuisine: String,
    address: String,

})

const order = mongoose.model('order', foodSchema)



//RETURNS ALL INFO ABOUT USER ACCOUNT

//NEED TO GET TO DISPLAY ONLY FOOD AND DRINKS
router.get('/:user',function (req,res,next) {
    let newUser = req.params.user
    order.find({username: newUser}, function (err, results) {
        res.json(results);
    });
});


//POST METHOD JUST ADDS TO THE DATABASE
router.post('/db', function (req,res, next) {
    aPerson = new order(
        req.body
    )
    console.log(body)
    aPerson.save(function (err) {
        if (err) {
            res.send(err)
        }
        //send back the new person
        else {
            res.send(aPerson)
        }
    })
})



var lat = []
var long = []
var restName = []

router.get('/', function (req,res,next) {
    const options = { method: 'GET',
    url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search',
    qs:
        {   'method': 'both',
            'search': 'japanese',
            'street-address': 'Boston, MA 02215'},
    headers:
        { 'X-Access-Token': Eat.eatAuth.CONSUMER_KEY} };

request(options, function (error, response, body) {
    if (error) throw new Error(error);


    let r = JSON.parse(response.body)
    r.restaurants.forEach( function(restaurants) {
        lat.push(restaurants.latitude)
        long.push(restaurants.longitude)
        restName.push(restaurants.name)
    })


})

});

router.post('/postmates', function (req,res,next) {
    const options = { method: 'GET',
        url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search',
        qs:
            {   'method': 'both',
                'search': 'japanese',
                'street-address': 'Boston, MA 02215'},
        headers:
            { 'X-Access-Token': Eat.eatAuth.CONSUMER_KEY} };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);


        let r = JSON.parse(response.body)
        r.restaurants.forEach( function(restaurants) {
            lat.push(restaurants.latitude)
            long.push(restaurants.longitude)
            restName.push(restaurants.name)
        })


    })

});

var delivery = {
    pickup_address: r.restaurants.streetadress,
    dropoff_address: r.restaurnts.homeaddress
};

postmates.quote(delivery, function(err, res) {
     return res.body.fee; // 799
});


















module.exports = router;




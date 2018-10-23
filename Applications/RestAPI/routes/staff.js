const express = require('express');
const route = express.Router();
const userCollection = require('mongoose').model('user');

route.get('/', (req, res) => {
    userCollection.find((err, result) => {
        if (err) throw err;
        
        res.status(201).json(result);
    })
});


module.exports = route;
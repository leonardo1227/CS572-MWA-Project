const express = require('express');
const route = express.Router();
const userCollection = require('mongoose').model('user');
const userModel = require('../modules/dbconnection/models').user()
const encryptation = require("../modules/encryptation");
const cors = require("cors");
route.use(express.json())
route.use(cors());

route.get('/', (req, res) => {
    userCollection.find((err, result) => {
        if (err) throw err;

        res.status(201).json(result);
    })
});

route.post('/', (req, res) => {
    const content = req.body;
    console.log('------------------------------------------')

    content.password = encryptation.crypter(content.password);

    console.log(content)
    userModel.createUser(content, result => {
        console.log('2222')
        res.json({success:1});
    })
});


module.exports = route;
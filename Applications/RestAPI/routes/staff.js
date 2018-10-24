const express = require('express');
const route = express.Router();
const userCollection = require('mongoose').model('user');
const userModel = require('../modules/dbconnection/models').user()
const encryptation = require("../modules/encryptation");
const email = require("../modules/email");
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
    const reset = req.query.reset;
    if (reset) {
        userModel.reset(result => {
            res.json(result);
        })
        return;
    }


    let htmlbody = `<h3>Welcome ${content.name} </h3> 
        This is the Administration System of <strong>AEL CSExam System</strong>
        <br>
        You can Sign In into the system with the below credentials:<br>
        Email: ${content.email} <br>
        Password: ${content.password}
        <h2><a href="http://localhost:${process.env.SERVER_PORT}/login">Login</a></h2>
        <br>
        Please change your password soon as possible after you Signed In into the system`;

    email.sendEmail(content.email, "Welcome to AEL CSExam System", htmlbody);
    content.password = encryptation.crypter(content.password);


    userModel.createUser(content, result => {
        res.json({ success: 1 });
    })
});

route.patch('/', (req, res) => {
    const userId = req.body.id;
    const value = req.body.value;
    userModel.changeStatus(userId, value, result => {
        res.json(result)
    })
});


module.exports = route;
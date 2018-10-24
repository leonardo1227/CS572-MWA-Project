const express = require('express');
const cors = require("cors");
const route = express.Router();
const questionCollection = require('mongoose').model('question');
const questionDB = require('../modules/dbconnection/models').question();
route.use(express.json())
route.use(cors());

route.get('/', (request, response) => {
    questionCollection.count().exec(function (err, count) {

    });
});

route.get('/active', (request, response) => {
    questionCollection.find({ "actived": true }, (err, docs) => {
        response.json(docs);
    });
})

route.post('/', (request, response) => {
    var question = request.body.question;
    var isActive = request.body.actived;

    questionDB.insertQuestion(question, isActive, (result) => {
        response.json(result);
    });
});

route.put('/:id/:actived', (request, response) => {
    var questionId = request.params.id;
    var isActive = request.params.actived;
    console.log("updating question with id: " + questionId + " and question's status will be: " + isActive);
    questionCollection.findByIdAndUpdate(id, { "actived": isActive });
    response.send(questionId + isActive);
})

module.exports = route;
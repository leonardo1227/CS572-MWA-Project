const express = require('express');
const cors = require("cors");
const route = express.Router();
const questionCollection = require('mongoose').model('question');
const questionDB = require('../modules/dbconnection/models').question();
route.use(express.json())
route.use(cors());

route.get('/', (request,response)=>{
    questionCollection.count().exec(function(err,count){
        //get 3 random entry
        var doc = questionCollection.aggregate(
            [ { $sample: { size: 3 } } ]
         ).then(result=>
            { for(let o of result){
                console.log("result : " + o.problemStatement)
            }
            response.json(result);
        })
        });
});

route.get('/active',(request,response) =>{
    questionCollection.find({"actived": true},(err,docs)=>{
        console.log(docs);
        response.send(docs);
    });
    // questionDB.findOnlyActived((err,result)=>{
    //     console.log(result)
    // });
})

route.post('/',(request,response) => {
    console.log(request.body)
    var question = request.body.question;
    var isActive = request.body.actived;
    console.log("question is: " + question," isActive is: " + isActive);
    questionCollection.insertMany({"problemStatement": question,"actived":isActive},(err)=>{
        response.json(question + " " + isActive);
    });
});

route.put('/:id/:actived',(request,response)=>{
    var questionId = request.params.id;
    var isActive = request.params.actived;
    console.log("updating question with id: " + questionId + " and question's status will be: " + isActive);
    questionCollection.findByIdAndUpdate(id,{"actived" : isActive});
    response.send(questionId + isActive);
})

module.exports = route;
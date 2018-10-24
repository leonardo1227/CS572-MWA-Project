const express = require('express');
const route = express.Router();
const mongoose = require('mongoose')
const cors = require("cors");
route.use(express.json())
route.use(cors());

route.get('/', (req, res) => {
    res.json({ test: "OKKKKKK" });
});
route.get('/:appId/:id', (req, res) => {
    const appId = req.params.appId;
    const examId = req.params.id;
    mongoose.model('applicationProcess').findById(appId, (err, data1) => {
        if (err) throw err;
        const exam = data1.exams.filter(x => x._id == examId)[0]
        res.status(201).json(exam);
    });
});

route.post('/progress/:appId/:examId/:questionId', (req, res) => {
    const appId = req.params.appId;
    const examId = req.params.examId;
    const questionId = req.params.questionId;
    const reset = req.query.reset;
    const progress = req.body;
    mongoose.model('applicationProcess').findById(appId, (err, data1) => {
        if (err) throw err;
        const question = data1.exams.filter(x => x._id == examId)[0].questions.filter(x => x._id == questionId)[0]

        if (reset) {
            question.snapshots.splice(0, question.snapshots.length)
        } else {
            let firstIndex = 0;
            if (question.snapshots && question.snapshots.length > 0) {
                firstIndex = question.snapshots.length - 1;
            }
            question.snapshots.push(...progress);

            for (let i = firstIndex + 1; i < question.snapshots.length; i++) {
                const prev = question.snapshots[i - 1];
                const obj = question.snapshots[i];
                const prevTime = prev['time'];
                const currentTime = obj['time'];
                prev['duration'] = currentTime - prevTime;
            }
        }
        data1.save().then(result => {
            res.status(201).json(result);
        })
    })
});


module.exports = route;
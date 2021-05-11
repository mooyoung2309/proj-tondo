const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const spawn = require('child_process').spawn;
// const fs = require('fs');


//=================================
//             Comment
//=================================


// take comments mongoDB
router.post('/analyzeComment', (req, res) => {
    Comment.findOne({ channelId: req.body.id })
        .exec((err, comments) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ comments })
        })

});

// run python create comments -> save comments mongoDB
router.post('/createComment', (req, res) => {
    // console.log(req.body.id);
    const pythonProcess = spawn('python', ['test/predict_by_url.py', String(req.body.id)]);
    // const pythonProcess = spawn('python', ['test/test.py']);

    var result = '';

    pythonProcess.stdout.on('data', function(data) { 
        result += data.toString();
    });

    pythonProcess.stdout.on('end', () => {
        console.log(result)
        result = result.substring(result.indexOf('{'));

        // fs.writeFileSync("target.txt", '\ufeff' + result, {encoding: 'utf8'});
        // JSON.parser
        // console.log("JSON.parse-----------------------------------------------")
        var jsonParseResult = JSON.parse(result)
        // console.log(jsonParseResult)
        // console.log(jsonParseResult[req.body.id]['info'])
        // console.log(typeof(result))

        const comment = new Comment({    
                channelId: req.body.id,
                info: jsonParseResult[req.body.id]['info'],
                badComments: jsonParseResult[req.body.id]['bad_comments'],
            })

        comment.save((err, doc) => {
            if(err) {
                return res.json({ success: false, err });
            } else {
                console.log("save성공");
                return res.status(200).json({
                    comments: comment
                });
            } 
                
        })
    });

    pythonProcess.stderr.on('data', function(data) { console.log(data.toString()); });

});


module.exports = router;

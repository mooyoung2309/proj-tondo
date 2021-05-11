const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const spawn = require('child_process').spawn;
const fs = require('fs');


//=================================
//             Comment
//=================================


router.post('/analyzeComment', (req, res) => {
    Comment.findOne({ "url": req.body.url })
        .exec((err, comment) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, comment })
        })

});

router.post('/createComment', (req, res) => {
    console.log(req.body.url);
    const pythonProcess = spawn('python', ['test/predict_by_url.py', String(req.body.url)]);
    // const pythonProcess = spawn('python', ['test/test.py']);
    var result = '';
    pythonProcess.stdout.on('data', function(data) { 
        result += data.toString();
    });

    pythonProcess.stdout.on('end', () => {
        console.log(result)
        result = result.substring(result.indexOf('{'));

        //fs.writeFileSync("target.txt", '\ufeff' + result, {encoding: 'utf8'});
        JSON.parser
        console.log("JSON.parse-----------------------------------------------")
        var jsonParseResult = JSON.parse(result)
        console.log(jsonParseResult)
        console.log(jsonParseResult['r0mgs7YoeCc']['info'])
        console.log(typeof(result))
    });

    //pythonProcess.stderr.on('data', function(data) { console.log(data.toString()); });
});

router.post('/testPush', (req, res) => {
    const comment = new Comment({    
        channelId: "test",
        badComments: ["comment1", "comment2"]

        })
    comment.save((err, doc) => {
        if(err) {
            return res.json({ success: false, err });
        } else {
            console.log("save성공");
            return res.status(200).json({
                success: true
            });
        
        } 
            
    })
    console.log("안녕");
});

// Video.findOne({ "_id" : req.body.videoId })
// .populate('writer')
// .exec((err, videoDetail) => {
//     if(err) return res.status(400).send(err)
//     return res.status(200).json({ success: true, videoDetail })
// })

module.exports = router;

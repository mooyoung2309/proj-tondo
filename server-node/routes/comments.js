const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================


router.post('/analyzeComment', (req, res) => {
    console.log(req.body.url);
    Comment.findOne({ "url": req.body.url })
        .exec((err, comment) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, comment })
        })

});

router.post('/createComment', (req, res) => {
    console.log("create commments post");

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

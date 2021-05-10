const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================


router.post('/getComments', (req, res) => {
    // console.log(req)
    // Comment.findOne({ channelId: req.body.channelId })
    //     .exec((err, comment) => {
    //         if (!comment)
    //             return res.json({
    //                 success: false,
    //                 message: "channelId not found"
    //             })
    //         return res.status(200).json({ success: true, comment })
    // });
});

router.post('/testPush', (req, res) => {

    console.log("안녕");
});

module.exports = router;

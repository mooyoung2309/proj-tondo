const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================


router.post('/getComments', (req, res) => {
    User.find((err, user) => {
        if(!user)
            return res.json({
                success: false,
                message: user
            })
        return res.status(200).json({ success: true, user })
    })

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

    
    // let testjson =  {
    //     channelId: 'test1',
    //     badComments: [
    //         'test1', 'test2'
    //     ]
    // }
    // const comment = new Comment(testjson);
    // console.log(req);
    // comment.save((err, doc) => {
    //     if (err) return res.json({ success: false, err });
    //     return res.status(200).json({
    //         success: true
    //     });
    // });
});

module.exports = router;

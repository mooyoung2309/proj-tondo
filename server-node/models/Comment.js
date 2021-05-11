const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    channelId: {
        type: String,
        maxlength:50,
    },
    info: { },
    badComments: { },
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }
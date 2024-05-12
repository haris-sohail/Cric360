const mongoose = require("mongoose")

const DiscussionSchema = new mongoose.Schema({
    id: String,
    username: String,
    title: String,
    text: String,
    upvotes: Number,
    downvotes: Number,
    comments: [{
        postedBy: String,
        text: String
    }]
});

const DiscussionModel = mongoose.model("Discussions", DiscussionSchema)

module.exports = DiscussionModel
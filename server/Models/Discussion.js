const mongoose = require("mongoose")

const DiscussionSchema = new mongoose.Schema({
    username: String,
    title: String,
    text: String,
    upvotes: Number,
    downvotes: Number,
    comments: [String]
});

const DiscussionModel = mongoose.model("Discussions", DiscussionSchema)

module.exports = DiscussionModel
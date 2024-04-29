const mongoose = require("mongoose")

const TeamSchema = new mongoose.Schema({
    captain: String,
    name: String,
    logo: Buffer,
    location: String
});

const DiscussionModel = mongoose.model("Teams", TeamSchema)

module.exports = DiscussionModel
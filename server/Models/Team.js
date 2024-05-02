const mongoose = require("mongoose")

const TeamSchema = new mongoose.Schema({
    id: String,
    captain_username: String,
    name: String,
    logo: {
        type: String, default: '../public/Images/default-team.png'
    },
    location: String,
    matchesPlayed: {
        type: Number, default: 0
    },
    matchesWon: {
        type: Number, default: 0
    },
    matchesDrawn: {
        type: Number, default: 0
    },
    matchesLost: {
        type: Number, default: 0
    },
    battingAvg: {
        type: Number, default: 0
    }
});

const TeamModel = mongoose.model("Teams", TeamSchema)

module.exports = TeamModel
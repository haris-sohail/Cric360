const mongoose = require("mongoose")

const PlayerSchema = new mongoose.Schema({
    username: String,
    isCaptain: {
        type: Boolean,
        default: "false"
    },
    teamName: {
        type: String,
        default: ""
    },
    leaderBoardRank: Number,
    battingAvg: {
        type: Number,
        default: 0
    },
    captainOf: String,
    noMatches: {
        type: Number,
        default: 0
    },
    runsScored: {
        type: Number,
        default: 0
    },
    hundreds: {
        type: Number,
        default: 0
    },
    fifties: {
        type: Number,
        default: 0
    },
    sixes: {
        type: Number,
        default: 0
    },
    fours: {
        type: Number,
        default: 0
    },
    SR: {
        type: Number,
        default: 0
    },
    economy: {
        type: Number,
        default: 0
    },
    ballsFaced: {
        type: Number,
        default: 0
    },
    ballsBowled: {
        type: Number,
        default: 0
    },
    oversBowled: {
        type: Number,
        default: 0
    },
    runsConceded: {
        type: Number,
        default: 0
    },
    wicketsTaken: {
        type: Number,
        default: 0
    }
});

const PlayerModel = mongoose.model("Players", PlayerSchema)

module.exports = PlayerModel
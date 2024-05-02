const mongoose = require("mongoose")

const MatchSchema = new mongoose.Schema({
    id: String,
    startingAt: Date,
    venue: String,
    format: String,
    teamA: String,
    teamB: String,
    umpire_username: String,
    teamA_wicketsTaken: {
        type: Number,
        default: 0
    },
    teamA_runsScored: {
        type: Number,
        default: 0
    },
    teamA_oversBowled: {
        type: Number,
        default: 0
    },
    teamA_no4s: {
        type: Number,
        default: 0
    },
    teamA_no6s: {
        type: Number,
        default: 0
    },
    teamA_extras: {
        type: Number,
        default: 0
    },
    
    teamB_wicketsTaken: {
        type: Number,
        default: 0
    },
    teamB_runsScored: {
        type: Number,
        default: 0
    },
    teamB_oversBowled: {
        type: Number,
        default: 0
    },
    teamB_no4s: {
        type: Number,
        default: 0
    },
    teamB_no6s: {
        type: Number,
        default: 0
    },
    teamB_extras: {
        type: Number,
        default: 0
    },
    teamWon: {
        type: String,
        default: 0
    },
    teamLost: {
        type: String,
        default: 0
    },
    wonByWickets: {
        type: Number,
        default: 0
    },
    wonByRuns: {
        type: Number,
        default: 0
    },
    isLive: {
        type: Boolean,
        default: false
    },
});

const MatchModel = mongoose.model("Matches", MatchSchema)

module.exports = MatchModel
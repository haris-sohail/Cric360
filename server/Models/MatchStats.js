const mongoose = require("mongoose")

const MatchStatsSchema = new mongoose.Schema({
    id: String,
    match_date: Date,
    teamA: String,
    teamB: String,
    tossWinner: String,
    tossDecision: String,
    innings: [
        {
            teamName: String,
            totalRuns: {
                type: Number,
                default: 0
            },
            wickets: {
                type: Number,
                default: 0
            },
            overs: {
                type: Number,
                default: 0
            },
            balls: {
                type: Number,
                default: 0
            },
            extras: {
                type: Number,
                default: 0
            },
            bowlers: [
                {
                    name: String,
                    overs: {
                        type: Number,
                        default: 0
                    },
                    wickets: {
                        type: Number,
                        default: 0
                    },
                    runs: {
                        type: Number,
                        default: 0
                    },
                    economy: {
                        type: Number,
                        default: 0
                    }
                }
            ],
            batsmen: [
                {
                    name: String,
                    runs: {
                        type: Number,
                        default: 0
                    },
                    balls: {
                        type: Number,
                        default: 0
                    },
                    fours: {
                        type: Number,
                        default: 0
                    },
                    sixes: {
                        type: Number,
                        default: 0
                    }
                }
            ]
        }
    ],
    result: String,
    winningTeam: String,
    losingTeam: String
});

const MatchStatsModel = mongoose.model("MatchStats", MatchStatsSchema)

module.exports = MatchStatsModel
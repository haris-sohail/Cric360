const express = require('express');
const MatchStatsModel = require("../Models/MatchStats");
const router = express.Router();
const uuid = require('uuid');

router.post('/createMatchStats', (req, res) => {
    const { tossWonBy, electedTo, tossLostBy } = req.body;

    MatchStatsModel.create({
        id: uuid.v4(),
        tossWinner: tossWonBy,
        tossDecision: electedTo
    })
        .then(MatchStats => res.json(MatchStats))
        .catch(err => res.json(err))
});

router.post('/updateTotalRuns', (req, res) => {
    let id = req.body.matchStatsID
    let runs = req.body.totalRuns
    let inningNo = req.body.inningNo

    let updateObject = {};
    updateObject['innings.' + inningNo + '.totalRuns'] = runs;

    MatchStatsModel.findOneAndUpdate(
        { id: id },
        { $set: updateObject },
        { new: true }
    )
        .then(MatchStats => res.json(MatchStats))
        .catch(err => res.json(err))
});

router.post('/updateWickets', (req, res) => {
    let id = req.body.matchStatsID
    let wickets = req.body.wickets
    let inningNo = req.body.inningNo

    let updateObject = {};
    updateObject['innings.' + inningNo + '.wickets'] = wickets;

    MatchStatsModel.findOneAndUpdate(
        { id: id },
        { $set: updateObject },
        { new: true }
    )
        .then(MatchStats => res.json(MatchStats))
        .catch(err => res.json(err))
});

router.post('/updateBalls', (req, res) => {
    let id = req.body.matchStatsID
    let balls = req.body.balls
    let inningNo = req.body.inningNo

    let updateObject = {};
    updateObject['innings.' + inningNo + '.balls'] = balls;

    MatchStatsModel.findOneAndUpdate(
        { id: id },
        { $set: updateObject },
        { new: true }
    )
        .then(MatchStats => res.json(MatchStats))
        .catch(err => res.json(err))
});

router.post('/updateOvers', (req, res) => {
    let id = req.body.matchStatsID
    let overs = req.body.overs
    let inningNo = req.body.inningNo

    let updateObject = {};
    updateObject['innings.' + inningNo + '.overs'] = overs;

    MatchStatsModel.findOneAndUpdate(
        { id: id },
        { $set: updateObject },
        { new: true }
    )
        .then(MatchStats => res.json(MatchStats))
        .catch(err => res.json(err))
});

module.exports = router;
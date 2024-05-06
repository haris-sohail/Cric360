const express = require('express');
const MatchStatsModel = require("../Models/MatchStats");
const router = express.Router();
const uuid = require('uuid');

router.post('/createMatchStats', (req, res) => {
    const { tossWonBy, electedTo, tossLostBy } = req.body;

    MatchStatsModel.create({
        id: uuid.v4(),
        teamA: tossWonBy,
        teamB: tossLostBy,
        tossWinner: tossWonBy,
        tossDecision: electedTo,
        innings: [
            { teamName: tossWonBy },
            { teamName: tossLostBy }
        ],
        startingAt: Date.now()
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

router.post('/updateRunsScoredBatsman', (req, res) => {
    let id = req.body.matchStatsID
    let runsScored = req.body.runsScored
    let inningNo = req.body.inningNo
    let batsmanNumber = req.body.batsmanNumber

    let updateObject = {};
    updateObject['innings.' + inningNo + '.batsmen.' + batsmanNumber + '.runs'] = runsScored;

    MatchStatsModel.findOneAndUpdate(
        { id: id },
        { $set: updateObject },
        { new: true }
    )
        .then(MatchStats => res.json(MatchStats))
        .catch(err => res.json(err))
});

router.post('/updateBatsmanName', (req, res) => {
    let id = req.body.matchStatsID
    let batsmanName = req.body.batsman
    let inningNo = req.body.inningNo
    let batsmanNumber = req.body.batsmanNumber

    let updateObject = {};
    updateObject['innings.' + inningNo + '.batsmen.' + batsmanNumber + '.name'] = batsmanName;

    MatchStatsModel.findOneAndUpdate(
        { id: id },
        { $set: updateObject },
        { new: true }
    )
        .then(MatchStats => res.json(MatchStats))
        .catch(err => res.json(err))
});

router.post('/updateBallsFaced', (req, res) => {
    let id = req.body.matchStatsID
    let ballsFaced = req.body.ballsFaced
    let inningNo = req.body.inningNo
    let batsmanNumber = req.body.batsmanNumber

    let updateObject = {};
    updateObject['innings.' + inningNo + '.batsmen.' + batsmanNumber + '.balls'] = ballsFaced;

    MatchStatsModel.findOneAndUpdate(
        { id: id },
        { $set: updateObject },
        { new: true }
    )
        .then(MatchStats => res.json(MatchStats))
        .catch(err => res.json(err))
});

router.post('/updateExtras', (req, res) => {
    let id = req.body.matchStatsID
    let inningNo = req.body.inningNo
    let extras = req.body.extras

    let updateObject = {};
    updateObject['innings.' + inningNo + '.extras'] = extras;

    MatchStatsModel.findOneAndUpdate(
        { id: id },
        { $set: updateObject },
        { new: true }
    )
        .then(MatchStats => res.json(MatchStats))
        .catch(err => res.json(err))
});

router.post('/createBowler', async (req, res) => {
    const { matchStatsID, inningNo, bowler } = req.body;

    const match = await MatchStatsModel.findOne({ id: matchStatsID });

    const inning = match.innings[inningNo];

    // Add bowler to the inning
    inning.bowlers.push({
        name: bowler,
        overs: 0,
        wickets: 0,
        runs: 0,
        economy: 0
    });

    // Save the updated match
    await match.save();

    res.json(match)
})


module.exports = router;
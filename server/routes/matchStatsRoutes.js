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

    // Check if bowler already exists
    const existingBowler = inning.bowlers.find(existingBowler => existingBowler.name === bowler);
    if (existingBowler) {
        return res.status(200).json();
    }

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

router.post('/updateBallsBowled', async (req, res) => {
    try {
        let id = req.body.matchStatsID
        let inningNo = req.body.inningNo
        let ballsBowled = req.body.ballsBowled
        let bowlerName = req.body.bowler

        const match = await MatchStatsModel.findOne({ id: id });

        if (!match) {
            return res.status(404).json({ error: "Match not found." });
        }

        const inning = match.innings[inningNo];

        const bowlerToUpdate = inning.bowlers.find(bowler => bowler.name === bowlerName);

        if (!bowlerToUpdate) {
            return res.status(404).json({ error: "Bowler not found in the specified inning." });
        }

        bowlerToUpdate.balls = ballsBowled

        await match.save()

        res.json(match)
    }
    catch (err) {
        res.json(err)
    }
});

router.post('/updateOversBowled', async (req, res) => {
    try {
        let id = req.body.matchStatsID
        let inningNo = req.body.inningNo
        let oversBowled = req.body.oversBowled
        let bowlerName = req.body.bowler

        const match = await MatchStatsModel.findOne({ id: id });

        if (!match) {
            return res.status(404).json({ error: "Match not found." });
        }

        const inning = match.innings[inningNo];

        const bowlerToUpdate = inning.bowlers.find(bowler => bowler.name === bowlerName);

        if (!bowlerToUpdate) {
            return res.status(404).json({ error: "Bowler not found in the specified inning." });
        }

        bowlerToUpdate.overs = oversBowled
        bowlerToUpdate.balls = 0

        await match.save()

        res.json(match)
    }
    catch (err) {
        res.json(err)
    }
});

router.post('/updateRunsConceded', async (req, res) => {
    try {
        let id = req.body.matchStatsID
        let inningNo = req.body.inningNo
        let runsConceded = req.body.runsConceded
        let bowlerName = req.body.bowler

        const match = await MatchStatsModel.findOne({ id: id });

        if (!match) {
            return res.status(404).json({ error: "Match not found." });
        }

        const inning = match.innings[inningNo];

        const bowlerToUpdate = inning.bowlers.find(bowler => bowler.name === bowlerName);

        if (!bowlerToUpdate) {
            return res.status(404).json({ error: "Bowler not found in the specified inning." });
        }

        bowlerToUpdate.runs = runsConceded

        await match.save()

        res.json(match)
    }
    catch (err) {
        res.json(err)
    }
});

router.post('/updateWicketsBowler', async (req, res) => {
    try {
        let id = req.body.matchStatsID
        let inningNo = req.body.inningNo
        let wickets = req.body.wickets
        let bowlerName = req.body.bowler

        const match = await MatchStatsModel.findOne({ id: id });

        if (!match) {
            return res.status(404).json({ error: "Match not found." });
        }

        const inning = match.innings[inningNo];

        const bowlerToUpdate = inning.bowlers.find(bowler => bowler.name === bowlerName);

        if (!bowlerToUpdate) {
            return res.status(404).json({ error: "Bowler not found in the specified inning." });
        }

        bowlerToUpdate.wickets = wickets

        await match.save()

        res.json(match)
    }
    catch (err) {
        res.json(err)
    }
});

router.post('/updateBowlerEconomy', async (req, res) => {
    try {
        let id = req.body.matchStatsID
        let inningNo = req.body.inningNo
        let economy = req.body.economy
        let bowlerName = req.body.bowler

        const match = await MatchStatsModel.findOne({ id: id });

        if (!match) {
            return res.status(404).json({ error: "Match not found." });
        }

        const inning = match.innings[inningNo];

        const bowlerToUpdate = inning.bowlers.find(bowler => bowler.name === bowlerName);

        if (!bowlerToUpdate) {
            return res.status(404).json({ error: "Bowler not found in the specified inning." });
        }

        bowlerToUpdate.economy = economy

        await match.save()

        res.json(match)
    }
    catch (err) {
        res.json(err)
    }
});

router.post('/getBowlerStats', async (req, res) => {
    try {
        let id = req.body.matchStatsID
        let inningNo = req.body.inningNo
        let bowlerName = req.body.bowler

        const match = await MatchStatsModel.findOne({ id: id });

        const inning = match.innings[inningNo];

        const bowler = inning.bowlers.find(bowler => bowler.name === bowlerName);

        res.json(bowler)
    }
    catch (err) {
        res.json(err)
    }
});




module.exports = router;
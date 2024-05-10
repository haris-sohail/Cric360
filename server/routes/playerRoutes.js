const express = require('express');
const PlayerModel = require("../Models/Player");
const router = express.Router();

router.post('/createPlayer', (req, res) => {
    PlayerModel.create(req.body)
        .then(players => res.json(players))
        .catch(err => res.json(err))
});

router.post('/makeCaptain', (req, res) => {
    PlayerModel.findOneAndUpdate({ username: req.body.username }, { isCaptain: true }, { new: true })
        .then(player => { res.json(player) })
        .catch(err => res.json(err))
});

router.post('/changeTeamName', (req, res) => {
    PlayerModel.findOneAndUpdate({ username: req.body.username }, { teamName: req.body.teamName }, { new: req.body.teamName })
        .then(player => { res.json(player) })
        .catch(err => res.json(err))
});

router.post('/getPlayer', (req, res) => {
    PlayerModel.findOne({ username: req.body.username })
        .then(player => { res.json(player) })
        .catch(err => res.json(err))
});

router.post('/getPlayersOfTeam', (req, res) => {
    const teamName = req.body.teamName;
    PlayerModel.find({ teamName: { $regex: new RegExp(teamName, 'i') } })
        .then(players => {
            res.json(players);
        })
        .catch(err => {
            res.json(err);
        });
})

router.post('/incrementNoMatches', (req, res) => {
    const username = req.body.username

    PlayerModel.findOneAndUpdate(
        { username: username },
        { $inc: { noMatches: 1 } },
        { new: true }
    )
        .then(player => { res.json(player) })
        .catch(err => { res.json(err) })
})

router.post('/updateRunsScored', (req, res) => {
    const username = req.body.username
    const runs = req.body.buttonPressed

    PlayerModel.findOneAndUpdate(
        { username: username },
        { $inc: { runsScored: runs } },
        { new: true }
    )
        .then(player => { res.json(player) })
        .catch(err => { res.json(err) })
})

router.post('/updateBallsFacedPlayer', (req, res) => {
    const username = req.body.batsman
    const ballsFaced = req.body.ballsFaced

    PlayerModel.findOneAndUpdate(
        { username: username },
        { $inc: { ballsFaced: 1 } },
        { new: true }
    )
        .then(player => { res.json(player) })
        .catch(err => { res.json(err) })
})

router.post('/updateBattingAvgPlayer', (req, res) => {
    const username = req.body.batsman
    const buttonPressed = parseInt(req.body.buttonPressed)
    const ballsFaced = req.body.ballsFacedVal

    // find old batting avg
    let oldBattingAvg;

    PlayerModel.findOne({ username: username })
        .then(player => {
            oldBattingAvg = player.battingAvg

            PlayerModel.findOneAndUpdate(
                { username: username },
                { battingAvg: (oldBattingAvg * (ballsFaced - 1) + buttonPressed) / ballsFaced },
                { new: true }
            )
                .then(player => { res.json(player) })
                .catch(err => { res.json(err) })
        })
        .catch(err => { res.json(err) })
})



module.exports = router;

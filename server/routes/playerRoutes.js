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



module.exports = router;

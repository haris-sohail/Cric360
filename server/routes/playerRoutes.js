const express = require('express');
const PlayerModel = require("../Models/Player");
const router = express.Router();

router.post('/createPlayer', (req, res) => {
    PlayerModel.create(req.body)
        .then(players => res.json(players))
        .catch(err => res.json(err))
});

router.post('/getTeam', (req, res) => {
    PlayerModel.findOne({ username: req.body.username })
        .then(player => res.json(player))
        .catch(err => res.json(err))
});

module.exports = router;

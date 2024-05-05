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

module.exports = router;
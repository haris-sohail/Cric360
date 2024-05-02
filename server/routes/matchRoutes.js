const express = require('express');
const MatchModel = require("../Models/Match");
const router = express.Router();
const uuid = require('uuid');

router.post('/createMatch', (req, res) => {
    const { startingAt, venue, format, teamName } = req.body;
    
    MatchModel.create({
        id: uuid.v4(),
        startingAt: startingAt,
        venue: venue,
        format: format,
        teamA: teamName
    })
        .then(Matches => res.json(Matches))
        .catch(err => res.json(err))
});

module.exports = router;

const express = require('express');
const MatchModel = require("../Models/Match");
const router = express.Router();

router.post('/createMatch', (req, res) => {
    const { startingAt, venue, format, teamName } = req.body;
    
    MatchModel.create({
        startingAt: startingAt,
        venue: venue,
        format: format,
        teamA: teamName
    })
        .then(Matches => res.json(Matches))
        .catch(err => res.json(err))
});

module.exports = router;

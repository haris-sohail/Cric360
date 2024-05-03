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

router.post('/getMatches', (req, res) => {
    MatchModel.find()
        .then(matches => res.json(matches))
        .catch(err => { res.json(err) })
})

router.post('/getMatch', (req, res) => {
    MatchModel.findOne({id: req.body.id})
        .then(match => res.json(match))
        .catch(err => { res.json(err) })
})

router.post('/setTeamB', (req, res) => {
    const { details } = req.body

    //{ username: req.body.username }, { teamName: req.body.teamName }, { new: req.body.teamName }
    MatchModel.findOneAndUpdate({id: details[0]}, {teamB: details[1]}, {new: details[1]})
        .then(match => res.json(match))
        .catch(err => { res.json(err) })
})

// to be moved to teamRoutes.js:
const TeamModel = require("../Models/Team");
router.post('/getTeamLogo', (req, res) => {
    const { team } = req.body

    TeamModel.findOne({ name: { $regex: team[0], $options: 'i' } })
        .then(team => { res.json(team) })
        .catch(err => { res.json(err) })
});

module.exports = router;
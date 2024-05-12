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

router.post('/joinTeam', async (req, res) => {
    try {
        console.log(req.body);
      const { username, teamName } = req.body;
  
      const player = await PlayerModel.findOne({ username });
  
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }
  
      player.teamName = teamName;
      await player.save();
  
      return res.status(200).json({ message: 'Player joined team successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;

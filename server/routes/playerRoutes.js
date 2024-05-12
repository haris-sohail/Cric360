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

router.post('/updateBattingAvgAndSRPlayer', (req, res) => {
    const username = req.body.batsman
    let buttonPressed = req.body.buttonPressed
    const ballsFaced = req.body.ballsFacedVal

    if (buttonPressed == 'MISS') {
        buttonPressed = 0
    }
    let oldSR;
    let runsScored
    let noMatches

    PlayerModel.findOne({ username: username })
        .then(player => {
            oldSR = player.SR / 100
            oldBattingAvg = player.battingAvg
            noMatches = player.noMatches
            runsScored = player.runsScored

            PlayerModel.findOneAndUpdate(
                { username: username },
                {
                    SR: (100 * (oldSR * (ballsFaced - 1) + buttonPressed) / ballsFaced),
                    battingAvg: runsScored / noMatches
                },
                { new: true }
            )
                .then(player => { res.json(player) })
                .catch(err => { res.json(err) })

        })
        .catch(err => { res.json(err) })
})

router.post('/updateBallsBowledBowler', (req, res) => {
    const username = req.body.bowler;
    const ballsBowled = req.body.ballsBowled;

    if (ballsBowled == 6) {
        PlayerModel.findOneAndUpdate(
            { username: username },
            {
                ballsBowled: ballsBowled,
                $inc: { oversBowled: 1 }
            },
            { new: true }
        )
            .then(player => { res.json(player) })
            .catch(err => { res.json(err) })
    }
    else {
        PlayerModel.findOneAndUpdate(
            { username: username },
            { ballsBowled: ballsBowled },
            { new: true }
        )
            .then(player => { res.json(player) })
            .catch(err => { res.json(err) })
    }
})


router.post('/incrementOversBowled', (req, res) => {
    const username = req.body.bowler

    PlayerModel.findOneAndUpdate(
        { username: username },
        { $inc: { oversBowled: 1 } },
        { new: true }
    )
        .then(player => { res.json(player) })
        .catch(err => { res.json(err) })
})

router.post('/incrementWickets', (req, res) => {
    const username = req.body.bowler

    PlayerModel.findOneAndUpdate(
        { username: username },
        { $inc: { wicketsTaken: 1 } },
        { new: true }
    )
        .then(player => { res.json(player) })
        .catch(err => { res.json(err) })
})

router.post('/updateRunsConceded', (req, res) => {
    const username = req.body.bowler
    let buttonPressed = req.body.buttonPressed

    if (buttonPressed == 'WD') {
        buttonPressed = 1
    }

    PlayerModel.findOneAndUpdate(
        { username: username },
        { $inc: { runsConceded: buttonPressed } },
        { new: true }
    )
        .then(player => { res.json(player) })
        .catch(err => { res.json(err) })
})

router.post('/getAllPlayers', (req, res) => {
    PlayerModel.find()
        .then(players => { res.json(players) })
        .catch(err => res.json(err))
});


module.exports = router;

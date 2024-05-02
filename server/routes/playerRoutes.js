const express = require('express');
const PlayerModel = require("../Models/Player");
const router = express.Router();

router.post('/createPlayer', (req, res) => {
    PlayerModel.create(req.body)
        .then(players => res.json(players))
        .catch(err => res.json(err))
});

module.exports = router;

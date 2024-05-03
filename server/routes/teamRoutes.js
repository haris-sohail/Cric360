const express = require('express');
const TeamModel = require("../Models/Team");
const router = express.Router();
const uuid = require('uuid');
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/registerTeam', upload.single('teamLogo'), (req, res) => {
    if (req.file) {
        TeamModel.create({
            id: uuid.v4(),
            captain_username: req.body.captainUsername,
            logo: req.file.filename,
            location: req.body.teamLocation,
            name: req.body.teamName
        })
            .then(teams => res.json(teams))
            .catch(err => res.json(err))
    }
    else { // no team logo entered
        TeamModel.create({
            id: uuid.v4(),
            captain_username: req.body.captainUsername,
            location: req.body.teamLocation,
            name: req.body.teamName
        })
            .then(teams => res.json(teams))
            .catch(err => res.json(err))
    }
})


router.get('/getTeams', async (req, res) => {
    try {
        const teams = await TeamModel.find();
        res.status(200).json({ Teams: teams });
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});


module.exports = router;
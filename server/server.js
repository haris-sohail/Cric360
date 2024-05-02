const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require('multer')
const path = require('path')

const TeamModel = require("./Models/Team")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Cric360");


const userRoutes = require('./routes/userRoutes');
const discussionRoutes = require('./routes/discussionRoutes');

app.use('/user', userRoutes);
app.use('/discussion', discussionRoutes);



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

app.post('/registerTeam', upload.single('teamLogo'), (req, res) => {
  if (req.file) {
    TeamModel.create({
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
      captain_username: req.body.captainUsername,
      location: req.body.teamLocation,
      name: req.body.teamName
    })
      .then(teams => res.json(teams))
      .catch(err => res.json(err))
  }
})



app.listen(3001, () => {
  console.log("Server is running")
})
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require('multer')
const path = require('path')

const UserModel = require("./Models/User")
const DiscussionModel = require("./Models/Discussion")
const TeamModel = require("./Models/Team")
const uuid = require('uuid');

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Cric360");


const userRoutes = require('./routes/userRoutes');

app.use('/user', userRoutes);

app.post('/postDiscussion', (req, res) => {
  DiscussionModel.create(
    {
      id: uuid.v4(),
      title: req.body.title,
      username: req.body.username,
      text: req.body.text,
      comments: req.body.comments,
      upvotes: req.body.upvotes,
      downvotes: req.body.downvotes
    }
  )
    .then(discussions => res.json(discussions))
    .catch(err => res.json(err))
})

app.post('/getDiscussions', (req, res) => {
  DiscussionModel.find()
    .then(discussions => res.json(discussions))
    .catch(err => res.json(err))
})

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

app.post('/upvote', (req, res) => {
  let discussion_id = req.body.discussionId;

  DiscussionModel.findOneAndUpdate(
    { id: discussion_id }, { $inc: { upvotes: 1 } },
    { returnOriginal: false }
  )
    .then(discussion => res.json(discussion))
    .catch(err => res.json(err))
})

app.post('/downvote', (req, res) => {
  let discussion_id = req.body.discussionId;

  DiscussionModel.findOneAndUpdate(
    { id: discussion_id }, { $inc: { downvotes: 1 } },
    { returnOriginal: false }
  )
    .then(discussion => res.json(discussion))
    .catch(err => res.json(err))
})

app.post('/getUpvotes', (req, res) => {
  let discussion_id = req.body.discussionId;

  DiscussionModel.findOne({ id: discussion_id })
    .then(discussion => res.json(discussion.upvotes))
    .catch(err => res.json(err))
})

app.post('/getDownvotes', (req, res) => {
  let discussion_id = req.body.discussionId;

  DiscussionModel.findOne({ id: discussion_id })
    .then(discussion => res.json(discussion.downvotes))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
  console.log("Server is running")
})
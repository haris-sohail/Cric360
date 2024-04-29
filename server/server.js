const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./Models/User")
const DiscussionModel = require("./Models/Discussion")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Cric360");


app.post('/register', (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/getUser', (req, res) => {
  UserModel.findOne({ username: req.body.username })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.post('/getEmail', (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then(email => res.json(email))
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
  UserModel.findOne({ username: req.body.username, password: req.body.password })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.post('/postDiscussion', (req, res) => {
  DiscussionModel.create(req.body)
    .then(discussions => res.json(discussions))
    .catch(err => res.json(err))
})

app.post('/getDiscussions', (req, res) => {
  DiscussionModel.find()
    .then(discussions => res.json(discussions))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
  console.log("Server is running")
})
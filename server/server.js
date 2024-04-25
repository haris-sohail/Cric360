const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./Models/User")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Cric360");


app.post('/register', (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser', (req, res) => {
  UserModel.find(req.body.username)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getEmail', (req, res) => {
  UserModel.find(req.body.email)
    .then(email => res.json(email))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
  console.log("Server is running")
})
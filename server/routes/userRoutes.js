const express = require('express');
const UserModel = require("../Models/User");
const router = express.Router();

router.post('/register', (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

router.post('/getUser', (req, res) => {
  UserModel.findOne({ username: req.body.username })
    .then(user => res.json(user))
    .catch(err => res.json(err))
});

router.post('/getEmail', (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then(email => res.json(email))
    .catch(err => res.json(err))
});

router.post('/login', (req, res) => {
  UserModel.findOne({ username: req.body.username, password: req.body.password })
    .then(user => res.json(user))
    .catch(err => res.json(err))
});

module.exports = router;

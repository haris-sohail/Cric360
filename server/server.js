const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors(
  {
    origin: ["https://cric360.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
))

app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  res.json("Welcome to Cric360-api")
})

const userRoutes = require('./routes/userRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');
const matchRoutes = require('./routes/matchRoutes');
const matchStatsRoutes = require('./routes/matchStatsRoutes');

app.use('/user', userRoutes);
app.use('/discussion', discussionRoutes);
app.use('/team', teamRoutes);
app.use('/player', playerRoutes);
app.use('/match', matchRoutes);
app.use('/matchStats', matchStatsRoutes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
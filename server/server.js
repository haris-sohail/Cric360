const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Cric360");


const userRoutes = require('./routes/userRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const teamRoutes = require('./routes/teamRoutes');

app.use('/user', userRoutes);
app.use('/discussion', discussionRoutes);
app.use('/team', teamRoutes);


app.listen(3001, () => {
  console.log("Server is running")
})
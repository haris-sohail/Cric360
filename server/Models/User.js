const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const UserModel = mongoose.model("Users", UserSchema)

module.exports = UserModel
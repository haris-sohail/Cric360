const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String
})

const UserModel = mongoose.model("Users", UserSchema)

module.exports = UserModel
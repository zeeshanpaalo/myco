const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId

const User = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
})

const UserModel = mongoose.model('User', User)

module.exports = {
  UserModel,
}

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  latitude: String,
  longitude: String,
});

module.exports = mongoose.model('User', UserSchema);

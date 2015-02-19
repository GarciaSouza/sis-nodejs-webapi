var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var PersonSchema = new Schema({
  family_name: String,
  given_name: String,
  birth_date: Date,
  gender: String,
  email: String,
  phone: String,
  country: String,
  state: String,
  city: String,
  address: String,
  zip: String,
});

module.exports = mongoose.model('Person', PersonSchema);
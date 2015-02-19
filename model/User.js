var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto')

var UserSchema = new Schema({
  username: String,
  password_hash: String,
  admin: Boolean,
  perms: Array
}, { collection: 'users' });

UserSchema.methods.validPassword = function UserModelValidPassword (password) {
  return this.password_hash == crypto.createHash('sha512').update(password).digest('hex');
}

UserSchema.methods.changePassword = function UserModelChangePassword (password) {
  this.password_hash = crypto.createHash('sha512').update(password).digest('hex');
}

module.exports = mongoose.model('User', UserSchema);
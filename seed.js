var config = require('config'),
    mongoose = require('mongoose'),
    User = require('./model/User')

mongoose.connect(config.db);

User.remove({}, function(err){
  throw err;
});

var firstUser = new User();

firstUser.username = 'admin';
firstUser.admin = true;
firstUser.changePassword('123123');

firstUser.save(function(err){
  throw err;
});

mongoose.disconnect(function(){
  process.exit(0);
});
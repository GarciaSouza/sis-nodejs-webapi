var User = require('../model/User'),
    passport = require('passport')

module.exports.createApi = function UserCreateApi(server) {
  server.get('/user/perms', function(req, res, next){
    res.send(req.user.perms);
    next();
  });
}
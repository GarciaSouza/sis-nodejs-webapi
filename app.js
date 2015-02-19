var restify = require('restify'),
    config = require('config'),
    mongoose = require('mongoose'),
    api = require('./api'),
    cors_config = require('./config/cors_config'),
    passport_config = require('./config/passport_config')

var server = restify.createServer({
  name: 'sis webapi',
  version: '1.0.0'
});

mongoose.connect(config.db);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser({mapParams:false}));
server.use(restify.bodyParser({mapParams:false}));

cors_config(server);
passport_config(server);

api.Course.createApi(server);
api.Discipline.createApi(server);
api.Student.createApi(server);
api.Teacher.createApi(server);
api.User.createApi(server);

server.listen(config.port, function(){
  console.log('%s listenning at %s', server.name, server.url);
});

process.on('SIGINT', function() {
  mongoose.disconnect(function(){
    process.exit(0);
  });
});
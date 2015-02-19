var restify = require('restify')

module.exports = function CORSConfig(server) {
  restify.CORS.ALLOW_HEADERS.push('authorization');
  server.use(restify.CORS());
}
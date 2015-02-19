var assert = require("assert"),
    config = require('config'),
    mongoose = require('mongoose'),
    restify = require('restify'),
    client = restify.createJsonClient({url: 'http://localhost:' + config.port}),
    Course = require('../../model/Course'),
    fork = require('child_process').fork,
    sis_webapi_app = null,
    node_reseed = null,
    theDoc = null

mongoose.connect(config.db);

function cleanDb() {
  Course.remove({}, function(err){
    if (err) throw err;
  })
}

describe('SIS Web Api', function(){
  before(function(){
    cleanDb();
    node_reseed = fork('./seed');
    sis_webapi_app = fork('./app');
  })

  after(function(){
    sis_webapi_app.kill('SIGINT');
  })

  describe('#server.get(\'/courses\')', function(){
    it('should return empty array when there\'s no item', function(done){
      var options = {
        path: '/courses',
        headers: {
          'Authorization': 'Basic YWRtaW46MTIzMTIz'
        }
      }

      client.get(options, function(err, req, res, obj){
        var obj = JSON.parse(res.body);
        assert.ifError(err);
        assert.equal(true, obj instanceof Array);
        assert.equal(0, obj.length);
        done();
      })
    })
  })

  describe('#server.post(\'/courses\')', function(){
    it('should return 201 code and the new doc when sucessfully created', function(done){
      var options = {
        path: '/courses',
        headers: {
          'Authorization': 'Basic YWRtaW46MTIzMTIz'
        }
      };

      var aNewCourse = {
        name: 'Programming in JavaScript'
      };

      client.post(options, aNewCourse, function(err, req, res, obj){
        theDoc = JSON.parse(res.body);
        assert.ifError(err);
        assert.equal(res.statusCode, 201);
        assert.equal(theDoc instanceof Object, true);
        done();
      })
    })
  })

  describe('#server.put(\'/courses/:id\')', function(){
    it('should return updated doc when sucessfully updated', function(done){
      var newName = 'Programming in JavaScript, am constructive aprouch';

      var updatedCourse = {
        name: newName
      };

      var options = {
        path: '/courses/' + theDoc._id,
        headers: {
          'Authorization': 'Basic YWRtaW46MTIzMTIz'
        }
      };

      client.put(options, updatedCourse, function(err, req, res, obj){
        assert.ifError(err);
        theDoc = JSON.parse(res.body);
        assert.equal(theDoc.name, newName);
        done();
      })
    })
  })

  describe('#server.del(\'/courses/:id\')', function(){
    it('should return 204 code when sucessfully deleted', function(done){
      var options = {
        path: '/courses/' + theDoc._id,
        headers: {
          'Authorization': 'Basic YWRtaW46MTIzMTIz'
        }
      };

      client.del(options, function(err, req, res, obj){
        assert.ifError(err);
        assert.equal(res.statusCode, 204);
        done();
      })
    })
  })
})
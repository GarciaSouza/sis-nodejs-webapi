var Course = require('../model/Course');

module.exports.createApi = function CourseCreateApi(server) {
  server.get('/course', function(req, res, next){
    Course.find(function(err, data){
      if (err)
        res.send(err);
      else
        res.send(data);
      next();
    });
  });

  server.post('/course', function(req, res, next){
    var newCourse = new Course(req.body);
    newCourse.save(function(err, newDoc){
      if (err)
        res.send(err);
      else if (!newDoc)
        res.send(400);
      else
        res.send(201, newDoc);
      next();
    });
  });

  server.get('/course/:id', function(req, res, next){
    Course.findById(req.params.id, function(err, doc){
      if (err)
        res.send(err);
      else if (!doc)
        res.send(404);
      else
        res.send(doc);
      next();
    });
  });

  server.put('/course/:id', function(req, res, next){
    Course.findByIdAndUpdate(req.params.id, req.body, function(err, updatedDoc){
      if (err)
        res.send(err);
      else if (!updatedDoc)
        res.send(404);
      else
        res.send(updatedDoc);
      next();
    });
    next();
  });

  server.del('/course/:id', function(req, res, next){
    Course.findByIdAndRemove(req.params.id, function(err){
      if (err)
        res.send(err);
      else
        res.send(204);
      next();
    });
    next();
  });
};
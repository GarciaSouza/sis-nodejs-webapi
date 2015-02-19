var Teacher = require('../model/Teacher');

module.exports.createApi = function TeacherCreateApi(server) {
  server.get('/teacher', function(req, res, next){
    Teacher.find(function(err, data){
      if (err)
        res.send(err);
      else
        res.send(data);
      next();
    });
  });

  server.post('/teacher', function(req, res, next){
    var newTeacher = new Teacher(req.body);
    newTeacher.save(function(err, newDoc){
      if (err)
        res.send(err);
      else if (!newDoc)
        res.send(400);
      else
        res.send(201, newDoc);
      next();
    });
  });

  server.get('/teacher/:id', function(req, res, next){
    Teacher.findById(req.params.id, function(err, doc){
      if (err)
        res.send(err);
      else if (!doc)
        res.send(404);
      else
        res.send(doc);
      next();
    });
  });

  server.put('/teacher/:id', function(req, res, next){
    Teacher.findByIdAndUpdate(req.params.id, req.body, function(err, updatedDoc){
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

  server.del('/teacher/:id', function(req, res, next){
    Teacher.findByIdAndRemove(req.params.id, function(err){
      if (err)
        res.send(err);
      else
        res.send(204);
      next();
    });
    next();
  });
};
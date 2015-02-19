var Student = require('../model/Student');

module.exports.createApi = function StudentsCreateApi(server) {
  server.get('/students', function(req, res, next){
    Student.find(function(err, data){
      if (err)
        res.send(err);
      else
        res.send(data);
      next();
    });
  });

  server.post('/students', function(req, res, next){
    var newStudent = new Student(req.body);
    newStudent.save(function(err, newDoc){
      if (err)
        res.send(err);
      else if (!newDoc)
        res.send(400);
      else
        res.send(201, newDoc);
      next();
    });
  });

  server.get('/students/:id', function(req, res, next){
    Student.findById(req.params.id, function(err, doc){
      if (err)
        res.send(err);
      else if (!doc)
        res.send(404);
      else
        res.send(doc);
      next();
    });
  });

  server.put('/students/:id', function(req, res, next){
    Student.findByIdAndUpdate(req.params.id, req.body, function(err, updatedDoc){
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

  server.del('/students/:id', function(req, res, next){
    Student.findByIdAndRemove(req.params.id, function(err){
      if (err)
        res.send(err);
      else
        res.send(204);
      next();
    });
    next();
  });
};
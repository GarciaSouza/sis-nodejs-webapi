[
  'Course',
  'Discipline',
  'Student',
  'Teacher',
  'User'
].forEach(function(a){
  module.exports[a] = require('./'+a);
});
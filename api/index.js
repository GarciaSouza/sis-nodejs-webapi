[
  'Courses',
  'Disciplines',
  'Students',
  'Teachers'
].forEach(function(a){
  module.exports[a] = require('./'+a);
});
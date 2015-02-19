var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var CourseSchema = new Schema({
  name: String
}, { collection: 'courses' });

module.exports = mongoose.model('Course', CourseSchema);
var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    PersonSchema = require('./Person').schema,
    Schema = mongoose.Schema

var TeacherSchema = PersonSchema.extend({
}, { collection: 'teachers' });

module.exports = mongoose.model('Teacher', TeacherSchema);
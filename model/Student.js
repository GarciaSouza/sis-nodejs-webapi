var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    PersonSchema = require('./Person').schema,
    Schema = mongoose.Schema

var StudentSchema = PersonSchema.extend({
}, { collection: 'students' });

module.exports = mongoose.model('Student', StudentSchema);
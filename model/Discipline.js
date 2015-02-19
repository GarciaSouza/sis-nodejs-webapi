var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var DisciplineSchema = new Schema({
  name: String
}, { collection: 'disciplines' });

module.exports = mongoose.model('Discipline', DisciplineSchema);
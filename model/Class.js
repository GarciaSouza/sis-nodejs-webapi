var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var ClassSchema = new Schema({
  year: Number,
  teacher_id: ObjectId,
  course_id: ObjectId,
  students_ids: Array,
  disciplines_ids: Array
}, { collection: 'class' });

module.exports = mongoose.model('Class', ClassSchema);
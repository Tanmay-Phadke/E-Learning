const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    notes: { type: String },
    files: [{ type: String }],
    course: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
  },
  { timestamps: true }
);

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;

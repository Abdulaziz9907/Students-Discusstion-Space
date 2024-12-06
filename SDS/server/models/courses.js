// models/courses.js
const mongoose = require('mongoose');

// Define the schema for courses
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,  // Ensures courseName is required
  },
  courseId: {
    type: String,
    required: true,  // Ensures courseId is required
    unique: true,    // Ensures courseId is unique
  },
});

// Create the model using the schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

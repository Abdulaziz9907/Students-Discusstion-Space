const mongoose = require('mongoose');

// Define the schema for ratings
const ratingSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: false, // Comment is optional
  },
  value: {
    type: Number,
    required: true, // Ensures rating value is required
    min: 1,         // Minimum value for a rating
    max: 5,         // Maximum value for a rating
  },
  user: {
    type: String,
    required: true, // Ensures user identifier is required
  },
  timestamp: {
    type: Date,
    default: Date.now, // Defaults to the current date and time
  },
});

// Define the schema for courses
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    unique: true,
    required: true, // Ensures courseName is required
  },
  courseId: {
    type: String,
    required: true, // Ensures courseId is required
    unique: true,   // Ensures courseId is unique
  },
  courseRating: {
    type: Number,
    default: 0,    // Defaults to 0 (no ratings yet)
  },
  ratings: [ratingSchema], // Embed the ratings array
});

// Middleware to update courseRating whenever a new rating is added
courseSchema.methods.addRating = function (rating) {
  this.ratings.push(rating);
  const total = this.ratings.reduce((sum, r) => sum + r.value, 0);
  this.courseRating = total / this.ratings.length;
  return this.save();
};

// Create the model using the schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

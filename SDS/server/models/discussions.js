// models/discussions.js
const mongoose = require('mongoose');

// Define the schema for discussions
const discussionSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,  // Ensures courseId is required
  },
  courseName: {
    type: String,
    required: true,  // Ensures courseName is required
  },
  user: {
    type: String,
    required: true,  // Ensures user is required (could be a username or email)
  },
  content: {
    type: String,
    required: true,  // Ensures content is required
  },
}, {
  timestamps: true,  // Adds createdAt and updatedAt fields automatically
});

// Create the model using the schema
const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;

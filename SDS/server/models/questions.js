
const mongoose = require('mongoose');

// Define the schema for replies
const replySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true, // The user who made the reply
  },
  content: {
    type: String,
    required: true, // The content of the reply
  },
  votes: {
    type: Number,
    default: 0, // Tracks the net votes on the reply
  },
  userVotes: {
    type: Map,
    of: String, // Tracks if a user voted 'up' or 'down'
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Extend the schema for questions
const questionSchema = new mongoose.Schema({
  courseId: {
    type: String,
     // Ensures courseId is required
  },
  courseName: {
    type: String,
    required: true, // Ensures courseName is required
  },
  user: {
    type: String,
    required: true, // The user who initiated the discussion
  },
  content: {
    type: String,
    required: true, // The content of the discussion
  },
  replies: [replySchema], // Embed the replies schema
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the model using the schema
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;

// app.js or server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/users");
const CourseModel = require("./models/courses"); // Assuming you have a courses model
const DiscussionModel = require("./models/discussions"); // Import the Discussion model

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas (replace with your connection string)
mongoose.connect("mongodb+srv://teamUser:teamPassword@cluster0.ehkp1.mongodb.net/SDSDB?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST route to create a new discussion
app.post('/add-discussion', async (req, res) => {
  try {
    const { courseId, courseName, user, content } = req.body;

    // Create a new discussion
    const newDiscussion = new DiscussionModel({
      courseId,
      courseName,
      user,
      content,
    });

    // Save the discussion to the database
    await newDiscussion.save();

    res.status(201).json({ message: "Discussion added successfully", discussion: newDiscussion });
  } catch (error) {
    res.status(500).json({ message: "Error adding discussion", error: error.message });
  }
});

// GET route to fetch all discussions
app.get('/discussions', async (req, res) => {
  try {
    const discussions = await DiscussionModel.find();
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discussions", error: error.message });
  }
});

// Listen on port 3002
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

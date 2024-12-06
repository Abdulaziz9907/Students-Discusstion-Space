const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UsersModel=require("./models/users");

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


  app.post('/login',(req,res)=>{

    const {userName, password} = req.body;
    UsersModel.findOne({userName: userName}).then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }
            else{
                res.json("incorrectPass")
            }
        }
        else{
            res.json("UsernotExist")
        }
    })

})

app.post('/signup', async (req, res) => {
    try {
        const existingUser = await UsersModel.findOne({ userName: req.body.userName });
        
        if (existingUser) {
            return res.json("Username already exists");

        }

        const newUser = await UsersModel.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.json(err.message);
    }
});



// POST route to create a new discussion
app.post('/add-discussion', async (req, res) => {
  try {
    const { courseId, courseName, user, content, id } = req.body;

    // If the ID is not provided, generate a random one
    const discussionId = id || Math.random().toString(36).substring(7); // Random ID generation

    // If the courseId is not provided, generate a random one
    const generatedCourseId = courseId || Math.random().toString(36).substring(7); // Random Course ID generation

    // Create a new discussion
    const newDiscussion = new DiscussionModel({
      id: discussionId, // Use the provided or generated ID
      courseId: generatedCourseId, // Use the provided or generated Course ID
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

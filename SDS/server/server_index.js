const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UsersModel = require("./models/users");
const DiscussionModel = require("./models/discussions");
const QuestionModel = require('./models/questions');
const Courses = require("./models/courses");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://teamUser:teamPassword@cluster0.ehkp1.mongodb.net/SDSDB?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Login Route
app.post('/login', (req, res) => {
  const { userName, password } = req.body;
  UsersModel.findOne({ userName: userName }).then(user => {
    if (user) {
      res.json(user.password === password ? "Success" : "incorrectPass");
    } else {
      res.json("UsernotExist");
    }
  });
});

// Signup Route
app.post('/signup', async (req, res) => {
  try {
    const existingUser = await UsersModel.findOne({ userName: req.body.userName });
    if (existingUser) return res.json("Username already exists");

    const newUser = await UsersModel.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.json(err.message);
  }
});

// Add a New Discussion
app.post('/add-discussion', async (req, res) => {
  try {
    const { courseId, courseName, user, content } = req.body;
    const newDiscussion = new DiscussionModel({ courseId, courseName, user, content });
    await newDiscussion.save();
    res.status(201).json({ message: "Discussion added successfully", discussion: newDiscussion });
  } catch (error) {
    res.status(500).json({ message: "Error adding discussion", error: error.message });
  }
});

// Get All Discussions

app.get('/discussions', async (req, res) => {
  try {
    const { courseName } = req.query; // Get courseName from query parameters
    const discussions = courseName
      ? await DiscussionModel.find({ courseName }) // Filter discussions by courseName if provided
      : await DiscussionModel.find(); // Fetch all discussions if no courseName is provided

    res.status(200).json(discussions); // Send the discussions in the response
  } catch (error) {
    res.status(500).json({ message: "Error fetching discussions", error: error.message });
  }
});



// GET route to fetch a specific discussion by ID
app.get('/discussion/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract discussion ID from route params
    const discussion = await DiscussionModel.findById(id);

    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discussion", error: error.message });
  }
});

// In server_index.js

// POST route to add a reply to a specific discussion
app.post('/reply-to-discussion', async (req, res) => {
  const { discussionId, content, user } = req.body;

  try {
    // Find the discussion by ID
    const discussion = await DiscussionModel.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    // Create a new reply object
    const newReply = {
      user,
      content,
      votes: 0, // Initial vote count for the reply
      userVotes: new Map(),
    };

    // Add the reply to the discussion's replies array
    discussion.replies.push(newReply);
    await discussion.save(); // Save the updated discussion with the new reply

    res.status(201).json({ message: "Reply added successfully", discussion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding reply", error: error.message });
  }
});


//////////////////////////////////////////////////////////////////////////////////////////////////

// Add a New Question
app.post('/add-question', async (req, res) => {
  try {
    const { courseId, courseName, user, content } = req.body;
    const newQuestion = new QuestionModel({ courseId, courseName, user, content });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully", question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Error adding question", error: error.message });
  }
});

// Get All Questions

app.get('/questions', async (req, res) => {
  try {
    const { courseName } = req.query; // Get courseName from query parameters
    const questions = courseName
      ? await QuestionModel.find({ courseName }) // Filter questions by courseName if provided
      : await QuestionModel.find(); // Fetch all questions if no courseName is provided

    res.status(200).json(questions); // Send the questions in the response
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
});



// GET route to fetch a specific question by ID
app.get('/questions/:questionId', async (req, res) => {
  try {
    const question = await QuestionModel.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch question details' });
  }
});

app.post('/questions/:questionId/replies/:replyId/vote', async (req, res) => {
  const { voteType } = req.body;

  if (!['up', 'down'].includes(voteType)) {
    return res.status(400).json({ error: 'Invalid vote type' });
  }

  try {
    const question = await QuestionModel.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const reply = question.replies.id(req.params.replyId);
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    if (voteType === 'up') {
      reply.votes += 1;
    } else {
      reply.votes -= 1;
    }

    await question.save();
    res.json(reply);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update vote' });
  }
});


// POST route to add a reply to a specific question
app.post('/reply-to-question', async (req, res) => {
  const { questionId, content, user } = req.body;

  try {
    // Find the discussion by ID
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "question not found" });
    }

    // Create a new reply object
    const newReply = {
      user,
      content,
      votes: 0, // Initial vote count for the reply
      userVotes: new Map(),
    };

    // Add the reply to the question's replies array
    question.replies.push(newReply);
    await question.save(); // Save the updated discussion with the new reply

    res.status(201).json({ message: "Reply added successfully", question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding reply", error: error.message });
  }
});


////////////////////////////////////////////////////////////////////////////////////////////////////













// Add a Reply to a Discussion
app.post('/discussions/:discussionId/reply', async (req, res) => {
  try {
    const { user, content } = req.body;
    const discussion = await DiscussionModel.findById(req.params.discussionId);

    if (!discussion) return res.status(404).json({ message: "Discussion not found" });

    discussion.replies.push({ user, content });
    await discussion.save();

    res.status(201).json({ message: "Reply added successfully", discussion });
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error: error.message });
  }
});

// Vote on a Reply
app.post('/discussions/:discussionId/replies/:replyId/vote', async (req, res) => {
  try {
    const { userId, voteType } = req.body; // voteType = 'up' or 'down'
    const discussion = await DiscussionModel.findById(req.params.discussionId);

    if (!discussion) return res.status(404).json({ message: "Discussion not found" });

    const reply = discussion.replies.id(req.params.replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    const previousVote = reply.userVotes.get(userId);

    if (previousVote === voteType) {
      reply.userVotes.delete(userId);
      reply.votes += voteType === 'up' ? -1 : 1;
    } else {
      if (previousVote) reply.votes += previousVote === 'up' ? -1 : 1;
      reply.votes += voteType === 'up' ? 1 : -1;
      reply.userVotes.set(userId, voteType);
    }

    await discussion.save();
    res.status(200).json({ message: "Vote updated successfully", reply });
  } catch (error) {
    res.status(500).json({ message: "Error updating vote", error: error.message });
  }
});

// Get Replies for a Discussion with Pagination
app.get('/discussions/:discussionId/replies', async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  try {
    const discussion = await DiscussionModel.findById(req.params.discussionId);
    if (!discussion) return res.status(404).json({ message: "Discussion not found" });

    const startIndex = (page - 1) * limit;
    const paginatedReplies = discussion.replies.slice(startIndex, startIndex + parseInt(limit));

    res.status(200).json({
      totalReplies: discussion.replies.length,
      currentPage: page,
      totalPages: Math.ceil(discussion.replies.length / limit),
      replies: paginatedReplies,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching replies", error: error.message });
  }
});

// Fetch a single discussion by ID
app.get('/discussions/:discussionId', async (req, res) => {
  try {
    const discussion = await DiscussionModel.findById(req.params.discussionId);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }
    res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discussion", error: error.message });
  }
});

// Fetch replies for a specific discussion
app.get('/discussions/:discussionId/replies', async (req, res) => {
  const { page = 1 } = req.query;
  const pageSize = 5; // Adjust as needed

  try {
    const discussion = await DiscussionModel.findById(req.params.discussionId);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    const replies = await ReplyModel.find({ discussionId: req.params.discussionId })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalReplies = await ReplyModel.countDocuments({ discussionId: req.params.discussionId });

    res.status(200).json({
      replies,
      currentPage: page,
      totalPages: Math.ceil(totalReplies / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching replies", error: error.message });
  }
});

// POST route to add a reply to a discussion
app.post('/discussions/:id/reply', async (req, res) => {
  try {
    const { id } = req.params;
    const { user, content } = req.body;

    // Validate the content length
    if (!content || content.trim().length < 3 || content.trim().length > 100) {
      return res.status(400).json({ message: 'Content must be between 3 and 100 words' });
    }

    // Find the discussion by ID
    const discussion = await DiscussionModel.findById(id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Add the reply
    discussion.replies.push({
      user, // Replace this with the actual user info (e.g., from session)
      content,
      createdAt: new Date(),
      votes: 0, // Initialize votes to 0
    });

    // Save the updated discussion
    await discussion.save();

    res.status(201).json({ message: 'Reply added successfully', reply: discussion.replies.at(-1) });
  } catch (error) {
    res.status(500).json({ message: 'Error adding reply', error: error.message });
  }
});
app.post('/discussions/:id/replies/:replyId/vote', async (req, res) => {
  try {
    const { id, replyId } = req.params;
    const { userId, voteType } = req.body;

    const discussion = await DiscussionModel.findById(id);
    if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

    const reply = discussion.replies.id(replyId);
    if (!reply) return res.status(404).json({ message: 'Reply not found' });

    // Handle voting logic
    if (voteType === 'up') {
      reply.votes += 1;
    } else if (voteType === 'down') {
      reply.votes -= 1;
    }

    await discussion.save();
    res.status(200).json({ message: 'Vote updated successfully', votes: reply.votes });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vote', error: error.message });
  }
});


const multer = require('multer');
const FileModel = require('./models/files'); // Import the File model
const router = express.Router();

// Set up Multer
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and PDF are allowed.'));
    }
  },
});


// GET Files by Course
router.get('/files', async (req, res) => {
  const { courseId } = req.query;
  try {
    const files = await FileModel.find({ courseId });
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching files' });
  }
});

// POST Upload File
router.post('/upload', upload.single('file'), async (req, res) => {
  const { courseId } = req.body;
  const { originalname, path } = req.file;

  try {
    const newFile = new FileModel({
      courseId,
      fileName: originalname,
      filePath: path,
    });
    await newFile.save();
    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// GET Download File
router.get('/files/:id/download', async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.download(file.filePath, file.fileName);
  } catch (error) {
    res.status(500).json({ error: 'Error downloading file' });
  }
});


// File upload endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!courseId) {
      return res.status(400).json({ message: 'Missing course ID' });
    }

    const file = new FileModel({
      courseId,
      fileName: req.file.filename,
      filePath: req.file.path,
      uploadDate: new Date(),
    });

    await file.save();
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});
module.exports = router;


app.get('/user', async (req, res) => {
  try {
    const { userName } = req.query; // or req.body if using POST
    const user = await UsersModel.findOne({ userName: userName });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.put('/update', async (req, res) => {
  const { userName, fName, lName, major, year, password, ratings, questions, answers, files, discussions } = req.body;

  try {
    const user = await UsersModel.findOneAndUpdate(
      { userName }, // Find user by username
      {
        fName,
        lName,
        major,
        year,
        password,
        ratings,
        questions,
        answers,
        files,
        discussions,
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure the provided fields follow the defined schema
      }
    );

    if (!user) {
      return res.status(404).json("Error"); // If the user doesn't exist
    }

    res.status(200).json(user); // Send the updated user details as a response
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json("Error");
  }
});


app.get('/courses', async (req, res) => {
  try {
    console.log("searching course in server  ");
    const { courseId } = req.query;
    console.log("server searching for: " + courseId);

    // Search for courses matching the regex pattern
    const courses = await Courses.find({ courseId: { $regex: courseId, $options: 'i' } });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'course not found' });
    }

    // Extract only courseId from the results
    const courseIds = courses.map(course => course.courseId);

    return res.json(courseIds);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});




// Listen on port 3002
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

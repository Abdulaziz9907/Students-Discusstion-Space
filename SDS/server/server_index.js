const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UsersModel = require("./models/users");
const DiscussionModel = require("./models/discussions");
const QuestionModel = require('./models/questions');
const Courses = require("./models/courses");
const FilesModel = require("./models/files");

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

/////////////////////////////////////////////////////////////////////////////////////////////////


// Endpoint to retrieve a course by name
app.get('/courses/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const course = await Courses.findOne({ courseName: name });
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course', error: error.message });
  }
});

/// Endpoint to add a rating to a course by name
app.post('/courses/:courseName/rating', async (req, res) => {
  const { courseName } = req.params; // Get course name from URL parameters
  const { user, comment, value } = req.body; // Get rating details from the body

  // Validate rating details
  if (!user || !comment || !value || value < 1 || value > 5) {
    return res.status(400).json({ message: 'Invalid rating details provided' });
  }

  try {
    // Find the course by its name
    const course = await Courses.findOne({ courseName: courseName });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create a new rating object
    const newRating = {
      user,
      comment,
      value,
      timeStamp: new Date(),
    };

    // Add the new rating to the course's ratings array and calculate the new average rating
    course.ratings.push(newRating);
    course.courseRating =
      course.ratings.reduce((sum, rating) => sum + rating.value, 0) / course.ratings.length;

    // Save the updated course
    await course.save();

    res.status(201).json({
      message: 'Rating added successfully',
      updatedCourse: course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding rating', error: error.message });
  }
});



//////////////////////////////////////////////////////////////////////////////////////////////////

// Add a New Discussion
app.post('/add-discussion', async (req, res) => {
  try {
    const { courseId, courseName, user, content } = req.body;

    if (!user || !content) {
      return res.status(400).json({ message: 'User and content are required' });
    }

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



// Fetch a single discussion by ID
app.get('/discussions/:discussionId', async (req, res) => {
  try {
    const discussion = await DiscussionModel.findById(req.params.discussionId);
    if(!discussion){
      return res.status(404).json({ message: "Discussion not found" });
    }
    res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discussion", error: error.message });
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



// Fetch replies for a specific discussion
app.get('/discussions/:discussionId/replies', async (req, res) => {
  const { page = 1 } = req.query;
  const pageSize = 3; // Adjust as needed

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

    if (!reply.userVotes) {
      reply.userVotes = new Map(); // Initialize userVotes as a Map if not present
    }

    // Get previous vote from the user
    const previousVote = reply.userVotes.get(userId);

    if (previousVote === voteType) {
      // If the user is undoing their vote, remove the vote
      reply.userVotes.delete(userId);
      reply.votes += voteType === 'up' ? -1 : 1;
    } else {
      // Update the vote
      if (previousVote) {
        reply.votes += previousVote === 'up' ? -1 : 1; // Undo the previous vote
      }
      reply.votes += voteType === 'up' ? 1 : -1; // Apply the new vote
      reply.userVotes.set(userId, voteType);
    }

    await discussion.save();
    res.status(200).json({ message: 'Vote updated successfully', votes: reply.votes });
  } catch (error) {
    console.error('Error updating vote:', error.message);
    res.status(500).json({ message: 'Error updating vote', error: error.message });
  }
});



//////////////////////
// Files
const multer = require('multer');
const path = require('path');

const router = express.Router();


// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


// File Upload Endpoint
const { containerClient } = require('./azureBlob');

const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage


app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file || !req.body.courseId) {
      return res.status(400).json({ message: 'File and courseId are required' });
    }

    const blobName = `${req.body.courseId}/${Date.now()}-${req.file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(req.file.buffer, req.file.size, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype },
    });

    const fileUrl = blockBlobClient.url;

    // Save metadata to MongoDB
    const newFile = new FilesModel({
      courseId: req.body.courseId,
      fileName: req.file.originalname,
      filePath: blobName,
      fileUrl,
      uploadedAt: new Date(),
    });

    await newFile.save();

    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});


router.get('/files/:blobName', async (req, res) => {
  try {
    const blobName = req.params.blobName;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    if (!(await blockBlobClient.exists())) {
      return res.status(404).json({ message: 'File not found' });
    }

    const downloadUrl = blockBlobClient.url;
    res.status(200).json({ url: downloadUrl });
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ message: 'Error fetching file', error: error.message });
  }
});




// Serve Uploaded Files
router.get('/files/:fileName', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.fileName);
  res.download(filePath, (err) => {
    if (err) {
      console.error('File download error:', err);
      res.status(404).json({ message: 'File not found' });
    }
  });
});

app.get('/files', async (req, res) => {
  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ message: 'courseId is required' });
  }

  try {
    // Fetch files metadata from MongoDB
    const files = await FilesModel.find({ courseId });

    if (files.length === 0) {
      return res.status(404).json({ message: `No files found for courseId: ${courseId}` });
    }

    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error.message);
    res.status(500).json({ message: 'Error fetching files', error: error.message });
  }
});


app.get('/files/:id/download', async (req, res) => {
  try {
    const fileId = req.params.id;

    // Retrieve file metadata from MongoDB
    const file = await FilesModel.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const blockBlobClient = containerClient.getBlockBlobClient(file.filePath);

    // Check if the blob exists
    if (!(await blockBlobClient.exists())) {
      return res.status(404).json({ message: 'Blob not found in Azure Storage' });
    }

    // Generate a SAS URL for downloading the file (Optional)
    const fileUrl = blockBlobClient.url;

    res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error('Error downloading file:', error.message);
    res.status(500).json({ message: 'Error downloading file', error: error.message });
  }
});


app.get('/files/:id/link', async (req, res) => {
  try {
    const fileId = req.params.id;

    // Retrieve file metadata from MongoDB
    const file = await FilesModel.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Send the file URL for copying
    res.status(200).json({ url: file.fileUrl });
  } catch (error) {
    console.error('Error fetching file link:', error.message);
    res.status(500).json({ message: 'Error fetching file link', error: error.message });
  }
});



module.exports = router;
         

//Files ova
//////////////


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

app.delete('/delete-account/:userName', async (req, res) => {
  const { userName } = req.params;

  try {
    const deletedUser = await UsersModel.findOneAndDelete({ userName: userName });

    if (!deletedUser) {
      return res.status(404).json({ 
        message: 'User not found. Unable to delete account.' 
      });
    }

    res.status(200).json({ 
      message: 'Account successfully deleted'
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ 
      message: 'An error occurred while deleting the account',
      error: error.message 
    });
  }
});


app.get('/course-name', async (req, res) => {
  try {
    console.log("searching course name in server  ");
    const { courseId } = req.query;
    console.log("server searching course name for: " + courseId);

    const courseName = await Courses.findOne({ courseId });

    return res.json(courseName);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


app.get('/visits', async (req, res) => {
  try {
    const courses = await Courses.find().sort({ visits: -1 }); // Sort by visits in descending order
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

app.put('/coursesVisits', async (req, res) => {
  const { courseId } = req.body; 
  console.log("server incrementing this course visits: "+ courseId);

  try {
    const courseVisits = await Courses.findOneAndUpdate(
      { courseId: courseId }, // Make sure to match the exact field in your schema
      { $inc: { visits: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!courseVisits) {
      return res.status(404).json("Course not found");
    }

    res.status(200).json(courseVisits);
  } catch (error) {
    console.error('Error updating visits:', error.message);
    res.status(500).json("Server error");
  }
});



/* app.get('/questions/count', async (req, res) => {
  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ message: 'courseId is required' });
  }

  try {
    const count = await QuestionModel.countDocuments({ courseId });

    return res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching question count:', error);
    return res.status(500).json({ message: 'Error fetching question count', error: error.message });
  }
});

app.get('/discussions/count', async (req, res) => {
  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ message: 'courseId is required' });
  }

  try {
    const count = await DiscussionModel.countDocuments({ courseId });

    return res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching question count:', error);
    return res.status(500).json({ message: 'Error fetching discussion count', error: error.message });
  }
}); */


// Listen on port 3002
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
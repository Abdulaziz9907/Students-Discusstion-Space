const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', FileSchema);

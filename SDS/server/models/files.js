const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;

const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  reporterName: { type: String },
  department: { type: String },
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' }
}, { timestamps: true })

module.exports = mongoose.models.Issue || mongoose.model('Issue', issueSchema)

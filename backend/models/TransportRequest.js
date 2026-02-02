const mongoose = require('mongoose')

const transportRequestSchema = new mongoose.Schema({
  department: { type: String, required: true },
  coordinatorName: { type: String, required: true },
  date: { type: String, required: true },
  startTime: String,
  endTime: String,
  route: { type: String, required: true },
  studentCount: { type: Number, required: true },
  purpose: String,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Combined'],
    default: 'Pending'
  }
}, { timestamps: true })

module.exports = mongoose.model('TransportRequest', transportRequestSchema)

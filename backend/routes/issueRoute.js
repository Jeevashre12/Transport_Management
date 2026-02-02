const express = require('express')
const router = express.Router()
const Issue = require('../models/Issue')

// Create an issue
router.post('/', async (req, res) => {
  try {
    const data = {
      subject: req.body.subject,
      message: req.body.message,
      reporterName: req.body.reporterName || (req.user && req.user.name) || undefined,
      department: req.body.department || undefined,
    }
    const issue = await Issue.create(data)
    res.json({ success: true, issue })
  } catch (err) {
    console.error('Issue create error', err)
    res.status(500).json({ message: 'Failed to create issue' })
  }
})

// Get all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 })
    res.json(issues)
  } catch (err) {
    console.error('Issue fetch error', err)
    res.status(500).json({ message: 'Failed to fetch issues' })
  }
})

module.exports = router

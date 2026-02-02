const express = require('express')
const router = express.Router()
const TransportRequest = require('../models/TransportRequest')

// CREATE request (Department Coordinator)
router.post('/request', async (req, res) => {
  try {
    // Normalize incoming body: if startDate provided, set date for backward compatibility
    if (req.body.startDate && !req.body.date) {
      req.body.date = req.body.startDate
    }
    // ensure numeric studentCount
    if (req.body.studentCount) {
      req.body.studentCount = Number(req.body.studentCount)
    }

    const request = await TransportRequest.create(req.body)
    res.json({ success: true, request })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to create request' })
  }
})

// VIEW all requests (Transport Officer / Admin)
router.get('/requests', async (req, res) => {
  try {
    const requests = await TransportRequest.find().sort({ createdAt: -1 })
    res.json(requests)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests' })
  }
})

// UPDATE status (Approve / Reject / Combine)
router.put('/request/:id', async (req, res) => {
  try {
    await TransportRequest.findByIdAndUpdate(req.params.id, req.body)
    res.json({ success: true, message: 'Status updated' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to update request' })
  }
})

module.exports = router

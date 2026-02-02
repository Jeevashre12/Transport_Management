require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const transportRoute = require('./routes/transportRoute')


const app = express()
// Allow all localhost ports for development
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:3000', process.env.FRONTEND_ORIGIN].filter(Boolean)
app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.use('/api/transport', transportRoute)


const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key'
const MONGODB_URI = process.env.MONGODB_URI || ''

// In-memory user storage (fallback when MongoDB is unavailable)
const inMemoryUsers = []
let mongoConnected = false

// Mongoose User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true },
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

// User management functions
const UserManager = {
  async findOne(query) {
    if (mongoConnected) {
      return await User.findOne(query)
    }
    return inMemoryUsers.find(u => {
      if (query.email) return u.email === query.email
      if (query._id) return u._id === query._id
      return false
    })
  },

  async create(data) {
    if (mongoConnected) {
      const user = new User(data)
      return await user.save()
    }
    const user = {
      _id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    inMemoryUsers.push(user)
    return user
  }
}

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' })
}

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, role } = req.body
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  try {
    const existing = await UserManager.findOne({ email })
    if (existing) return res.status(409).json({ message: 'User already exists' })

    const hash = await bcrypt.hash(password, 10)
    const user = await UserManager.create({ name, email, passwordHash: hash, role })

    const token = generateToken({ id: user._id.toString(), role: user.role, name: user.name, email: user.email })
    res.json({ token, role: user.role, name: user.name })
  } catch (err) {
    console.error('Signup error', err)
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' })

  try {
    const user = await UserManager.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

    const token = generateToken({ id: user._id.toString(), role: user.role, name: user.name, email: user.email })
    res.json({ token, role: user.role, name: user.name })
  } catch (err) {
    console.error('Login error', err)
    res.status(500).json({ message: 'Server error' })
  }
})

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' })
  const token = auth.split(' ')[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    console.error('Me error', err)
    res.status(500).json({ message: 'Server error' })
  }
})

async function start() {
  try {
    if (MONGODB_URI) {
      try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        mongoConnected = true
        console.log('Connected to MongoDB')
      } catch (mongoErr) {
        console.warn('MongoDB connection failed:', mongoErr.message)
        console.warn('Using in-memory storage instead...')
        mongoConnected = false
      }
    } else {
      console.warn('MONGODB_URI not set. Using in-memory storage.')
      mongoConnected = false
    }

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Auth server listening on ${PORT}`))
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()

var express = require('express')
var router = express.Router()
const User = require('../models/user')

// Create an user
router.post('/', async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      role: req.body.role ?? undefined,
    })

    res.status(201).json(user)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
})

// Get users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()

    res.json(users)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// Get user details
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    res.json(user)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

module.exports = router

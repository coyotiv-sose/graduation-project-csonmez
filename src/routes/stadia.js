const express = require('express')
const router = express.Router()
const Stadium = require('../models/stadium')

router.post('/', async (req, res) => {
  try {
    const stadium = await Stadium.create({ name: req.body.name, location: req.body.location })

    res.status(201).json(stadium)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const stadiums = await Stadium.find()

    res.json(stadiums)
  } catch (error) {
    return res.status(500).json({ message: e.message })
  }
})

router.get('/:stadiumId', async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.stadiumId)
    if (!stadium) return res.status(404).json({ message: 'Stadium not found' })

    res.json(stadium)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

module.exports = router

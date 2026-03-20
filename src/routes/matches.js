const express = require('express')
const router = express.Router()
const Match = require('../models/match')
const User = require('../models/user')
const Team = require('../models/team')
const Stadium = require('../models/stadium')

router.post('/', async (req, res) => {
  try {
    const teamOwner = await User.findById(req.body.teamOwnerId)
    if (!teamOwner) return res.status(404).json({ message: 'Team owner not found' })

    const awayTeam = await Team.findById(req.body.awayTeamId)
    if (!awayTeam) return res.status(404).json({ message: 'Away team not found' })

    const stadium = await Stadium.findById(req.body.stadiumId)
    if (!stadium) return res.status(404).json({ message: 'Stadium not found' })

    const match = await teamOwner.sendMatchInvitation({ awayTeam, stadium, time: req.body.time })

    res.status(201).json(match)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const matches = await Match.find()

    res.json(matches)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

router.get('/:matchId', async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId)
    if (!match) return res.status(404).json({ message: 'Match not found' })

    res.json(match)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

// Update match status
router.patch('/:matchId/status', async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId)
    if (!match) return res.status(404).json({ message: 'Match not found' })

    match.status = req.body.status

    if (match.isModified()) {
      const updatedMatch = await match.save()
      return res.json(updatedMatch)
    }

    return res.json(match)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

module.exports = router

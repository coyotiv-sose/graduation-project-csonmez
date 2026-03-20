const express = require('express')
const router = express.Router()
const Team = require('../models/team')
const User = require('../models/user')

// Create team by team owner
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (user.team) return res.status(403).json({ message: 'You must leave your current team to create a new one.' })

    const team = await user.createTeam({ name: req.body.name })

    res.status(201).json(team)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// Get teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find()

    res.json(teams)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// Get team details
router.get('/:teamId', async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId)
    if (!team) return res.status(404).json({ message: 'Team not found' })

    res.json(team)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// Update team
router.patch('/:teamId', async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId)
    if (!team) return res.status(404).json({ message: 'Team not found' })

    if (req.body.name && team.name !== req.body.name) team.name = req.body.name

    if (team.isModified()) {
      const updatedTeam = await team.save()
      return res.json(updatedTeam)
    }

    return res.json(team)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// Add player to team by team owner
router.post('/:teamId/players', async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId).populate('owner')
    if (!team) return res.status(404).json({ message: 'Team not found' })

    if (team.owner._id.toString() !== req.body.teamOwnerId) {
      return res.status(403).json({ message: 'Only team owner can add players' })
    }

    const player = await User.findById(req.body.playerId)
    if (!player) return res.status(404).json({ message: 'Player not found' })

    const updatedTeam = team.owner.addPlayer({ player, role: req.body.role })

    return res.status(201).json(updatedTeam)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

module.exports = router

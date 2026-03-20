const { Schema, model } = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const Team = require('../models/team')
const Match = require('../models/match')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null, autopopulate: true }
  },
  { timestamps: true }
)

class User {
  async createTeam({ name }) {
    this.team = await Team.create({ owner: this._id, name })
    await this.team.save()

    await this.save()
    return this.team
  }

  async addPlayer({ player, role = 'player' }) {
    this.team.players.push({ player: player._id, role })
    await this.team.save()

    player.team = this.team._id
    await player.save()
    return this.team
  }

  async sendMatchInvitation({ awayTeam, stadium, time }) {
    const match = await Match.create({ homeTeam: this.team._id, awayTeam: awayTeam._id, stadium: stadium._id, time })

    stadium.matches.push(match)
    await stadium.save()

    this.team.matches.push(match)
    await this.team.save()

    awayTeam.matches.push(match)
    await awayTeam.save()

    return match
  }

  leaveTeam() {
    if (this.role === 'captain') return 'Captains cannot leave the team. Please assign a new captain before leaving.'
    if (!this.team) return 'You are not part of any team.'
    this.team.users = this.team.users.filter(u => u !== this)
    this.team = null
  }
}

userSchema.plugin(autopopulate)
userSchema.loadClass(User)
module.exports = model('User', userSchema)

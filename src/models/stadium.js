const { Schema, model } = require('mongoose')
const dayjs = require('dayjs')

const stadiumSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  },
  { timestamps: true }
)

class Stadium {
  get matchList() {
    return this.matches
      .map(
        match => `
        # ${match.homeTeam.name} - ${match.awayTeam.name}
        \t Stat: ${match.stadium.name} / ${match.stadium.location}
        \t Tarih - Saat: ${dayjs(match.time).format('DD.MM.YYYY HH:mm')}
      `
      )
      .join('')
  }

  set matchList(match) {
    throw new Error('Cannot set matchList')
  }
}

stadiumSchema.loadClass(Stadium)
module.exports = model('Stadium', stadiumSchema)

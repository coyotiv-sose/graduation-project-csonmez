const { Schema, model } = require('mongoose')

const teamSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    players: [
      {
        player: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String, enum: ['captain', 'player'], default: 'player' },
      },
    ],
    matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

module.exports = model('Team', teamSchema)

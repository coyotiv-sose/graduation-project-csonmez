const { Schema, model } = require('mongoose')

const matchSchema = new Schema(
  {
    homeTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    awayTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    stadium: { type: Schema.Types.ObjectId, ref: 'Stadium', required: true },
    time: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
)

module.exports = model('Match', matchSchema)

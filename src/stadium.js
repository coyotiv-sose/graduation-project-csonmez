const dayjs = require('dayjs')

class Stadium {
  matches = []

  constructor(name, location) {
    this.name = name;
    this.location = location;
  }

  get matchList() {
    return this.matches.map((match) => `
        # ${match.homeTeam.name} - ${match.awayTeam.name}
        \t Stat: ${match.stadium.name} / ${match.stadium.location}
        \t Tarih - Saat: ${dayjs(match.time).format('DD.MM.YYYY HH:mm')}
      `
    ).join('')
  }

  set matchList(match) {
    throw new Error('Cannot set matchList');
  }
}

module.exports = Stadium

const dayjs = require('dayjs')

class Match {
  constructor(homeTeam, awayTeam, stadium, date) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.stadium = stadium;
    this.date = dayjs(date).format('DD/MM/YYYY HH:mm');
  }
}

module.exports = Match

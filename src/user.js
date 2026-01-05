const Team = require('./team')
const Match = require('./match')

class User {
  team = null;

  constructor(username, role = 'member') {
    this.username = username;
    this.role = role;
  }

  createTeam(teamName) {
    if (this.role === 'member') return 'You must leave your current team to create a new one.';
    this.team = new Team(teamName);
    this.team.users.push(this);
    return this.team;
  }

  addTeamMember(user) {
    if (this.role !== 'captain') return 'Only captains can add team members.';
    this.team.users.push(user);
    user.team = this.team
  }

  sendMatchInvitation(awayTeam, stadium, time) {
    if (this.role !== 'captain') return 'Only captains can send match invitations.';
    const match = new Match(this.team, awayTeam, stadium, time);
    stadium.matches.push(match)
    this.team.matches.push(match)
    awayTeam.matches.push(match)
    return match;
  }

  leaveTeam() {
    if (this.role === 'captain') return 'Captains cannot leave the team. Please assign a new captain before leaving.';
    if (!this.team) return 'You are not part of any team.';
    this.team.users = this.team.users.filter(u => u !== this);
    this.team = null;
  }
}

module.exports = User

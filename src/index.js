const dayjs = require('dayjs')
const User = require('./user')
const Stadium = require('./stadium')

const stadium = new Stadium('Arena', 'Talas');

const captain1 = new User('captain1', 'captain');
const team1 = captain1.createTeam('Team1');
const player11 = new User('player11');
const player12 = new User('player12');
captain1.addTeamMember(player11);
captain1.addTeamMember(player12);
player12.leaveTeam()

const captain2 = new User('captain2', 'captain');
const team2 = captain2.createTeam('Team2');
const player21 = new User('player21');
const player22 = new User('player22');
captain2.addTeamMember(player21);
captain2.addTeamMember(player22);

const captain3 = new User('captain3', 'captain');
const team3 = captain3.createTeam('Team3');
const player31 = new User('player31');
const player32 = new User('player32');
const player33 = new User('player33');
captain3.addTeamMember(player31);
captain3.addTeamMember(player32);
captain3.addTeamMember(player33);

captain1.sendMatchInvitation(team2, stadium, new Date());
captain2.sendMatchInvitation(team3, stadium, new Date());

// TESTS
console.log(`Team1 has 3 players: ${team1.users.length === 2}`)
console.log(`Team2 has 3 players: ${team2.users.length === 3}`)
console.log(`Team3 has 3 players: ${team3.users.length === 4}`)
console.log(`Stadium has 2 matches: ${stadium.matches.length === 2}`)
console.log(`Captain1 role ise captain: ${captain1.role === 'captain'}`)
console.log(`Team1 captain is captain1: ${captain1.team === team1}`)
console.log(`Team1 and Team2 heve a match: ${team1.matches.some((match) => (match.homeTeam === team1 && match.awayTeam === team2) || (match.homeTeam === team2 && match.awayTeam === team1))}`)
console.log(`Team1 and Team3 have a match: ${team1.matches.some((match) => (match.homeTeam === team1 && match.awayTeam === team3) || (match.homeTeam === team3 && match.awayTeam === team1))}`) // Expected: false
console.log(`Stadium matches date: ${stadium.matches.map((match) => dayjs(match.time).format('DD.MM.YYYY HH:mm')).join(', ')}`)
console.log(stadium.matchList)

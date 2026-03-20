const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:3000'

const main = async () => {
  const { data: stadium } = await axios.post('/stadia', {
    name: 'Kardeşler Halı Saha',
    location: 'Kayseri'
  })

  // Create team1 members
  const { data: teamOwner1 } = await axios.post('/users', { username: 'teamOwner1' })
  const { data: player11 } = await axios.post('/users', { username: 'player11' })
  const { data: player12 } = await axios.post('/users', { username: 'player12' })

  // Create team1
  const { data: team1 } = await axios.post(`/teams`, { name: 'Team1', userId: teamOwner1._id })

  // Add players to team1
  await axios.post(`/teams/${team1._id}/players`, {
    playerId: player11._id,
    role: 'captain',
    teamOwnerId: teamOwner1._id
  })
  await axios.post(`/teams/${team1._id}/players`, { playerId: player12._id, teamOwnerId: teamOwner1._id })

  // Create team2 members
  const { data: teamOwner2 } = await axios.post('/users', { username: 'teamOwner2' })
  const { data: player21 } = await axios.post('/users', { username: 'player21' })
  const { data: player22 } = await axios.post('/users', { username: 'player22' })

  // Create team2
  const { data: team2 } = await axios.post(`/teams`, { name: 'Team2', userId: teamOwner2._id })

  // Add players to team2
  await axios.post(`teams/${team2._id}/players`, {
    playerId: teamOwner2._id,
    role: 'captain',
    teamOwnerId: teamOwner2._id
  })
  await axios.post(`teams/${team2._id}/players`, { playerId: player21._id, teamOwnerId: teamOwner2._id })
  await axios.post(`teams/${team2._id}/players`, { playerId: player22._id, teamOwnerId: teamOwner2._id })

  // Send a match invitation from teamOwner1 to team2
  const { data: match } = await axios.post('/matches', {
    teamOwnerId: teamOwner1._id,
    awayTeamId: team2._id,
    stadiumId: stadium._id,
    time: Date.now() + 5 * 24 * 60 * 60 * 1000
  })

  // Accept match request
  await axios.patch(`/matches/${match._id}/status`, { status: 'accepted' })
}

main().catch(error => {
  console.log(error.message ? error.message : error)
})

const axios = require('axios');

const getPlayingGames = async () => {
  const response = await axios.get('http://api.football-data.org/v1/competitions/467/fixtures');
  return response.data.fixtures.filter(fixture => fixture.status === "IN_PLAY");
};

const isTeamPlaying = async (team) => {
  const playingGames = await getPlayingGames();
  return playingGames.filter(game => game.homeTeamName === team || game.awayTeamName === team).length > 0;
};

module.exports = { getPlayingGames, isTeamPlaying };

const axios = require('axios');
const WORLD_CUP_URL = 'http://api.football-data.org/v2/competitions/2267/matches';

const getPlayingGames = async () => {
  const response = await axios.get(WORLD_CUP_URL);
  return response.data.matches.filter(match => match.status === "IN_PLAY");
};

const isTeamPlaying = async (team) => {
  const playingGames = await getPlayingGames();
  return playingGames.filter(game => game.homeTeamName === team || game.awayTeamName === team).length > 0;
};

module.exports = { getPlayingGames, isTeamPlaying };

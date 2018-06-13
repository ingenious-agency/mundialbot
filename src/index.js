// Initialize using verification token from environment variables
require('dotenv').config();

const PORT = process.env.PORT;
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const EVENT_TOKEN = process.env.EVENT_TOKEN;

const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const { WebClient } = require('@slack/client');

const { getUserLocations, mentionedUsers } = require('./slack');
const { isTeamPlaying } = require('./footbal');
const { buildPluralConcatenation } = require('./language');

const web = new WebClient(SLACK_TOKEN);
const slackEvents = createSlackEventAdapter(EVENT_TOKEN);

const sendMessage = (channel, text) => {
  web.chat.postMessage({ channel, text }).catch(console.error);
};

slackEvents.on('message', async (event) => {
  try {
    const userIds = mentionedUsers(event.text);
    if (userIds) {
      const userDetails = await getUserLocations(SLACK_TOKEN, userIds);
      const playingDetails = userDetails.filter(userDetail => isTeamPlaying(userDetail.country));
      if (playingDetails.length > 0) {
        const people = playingDetails.map(playingDetail => playingDetail.name);
        const countries = playingDetails.map(playingDetail => playingDetail.country);

        const isAre = people.length === 1 ? 'is' : 'are';
        const suffix = people.length === 1 ? '' : ' respectively'
        const heThey = people.length === 1 ? 'he\'ll' : 'they\'ll';

        const text = `_${buildPluralConcatenation(people)} ${isAre} watching ${buildPluralConcatenation(countries)}${suffix}, ${heThey} probably respond after the game ends_`;
        sendMessage(event.channel, text);
      }
    }
  } catch (e) {
    console.error(e);
  }
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(PORT).then(() => console.log(`server listening on port ${PORT}`));

// const isCountryPlaying = (country) => {
//   axios.
//   // http://api.football-data.org/v1/competitions/467
// }

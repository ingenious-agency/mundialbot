// Initialize using verification token from environment variables
require('dotenv').config();

const PORT = process.env.PORT;
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const EVENT_TOKEN = process.env.EVENT_TOKEN;

const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const { WebClient } = require('@slack/client');

const { getUserLocations, mentionedUsers } = require('./slack');
const { isTeamPlaying, getPlayingGames } = require('./footbal');
const { buildNationalTeamPlayingMessage, isCurrentGameQuestion, buildCurrentGamesMessage } = require('./language');

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
      const playingDetails = [];
      for (let userDetail of userDetails) {
        const isPlaying = await isTeamPlaying(userDetail.country);
        if(isPlaying) playingDetails.push(userDetail);
      }
      if (playingDetails.length > 0) {
        const people = playingDetails
          .map(playingDetail => playingDetail.name)
          .filter((elem, pos, arr) => arr.indexOf(elem) == pos);
        const countries = playingDetails
          .map(playingDetail => playingDetail.country) // Only country name
          .filter((elem, pos, arr) => arr.indexOf(elem) == pos); // Remove duplicates
        sendMessage(event.channel, buildNationalTeamPlayingMessage(people, countries));
      }
    }
  } catch (e) {
    console.error(e);
  }
});

slackEvents.on('app_mention', async (event) => {
  try {
    let text;
    if (isCurrentGameQuestion(event.text)) {
      const matches = await getPlayingGames();
      text = buildCurrentGamesMessage(matches);
    } else {
      text = '_I don\'t know how to answer the question, I can answer the following questions:_\n\n - How\'s the current game, @mundialbot?';
    }
    sendMessage(event.channel, text);
  } catch (e) {
    console.error(e);
  }
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(PORT).then(() => console.log(`server listening on port ${PORT}`));

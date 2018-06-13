const axios = require('axios');
const { getCountriesForTimezone } = require('./timezones');

const getUserLocations = async (token, usersIds) => {
  const users = await axios.all(usersIds.map(userId => getUserDetails(token, userId)));
  return users.map(response => {
    const countries = getCountriesForTimezone(response.data.user.tz);
    const country = countries && countries.length > 0 && countries[0].name;
    return {
      country,
      name: response.data.user.name
    };
  })
};

const getUserDetails = (token, userId) => axios.get(`https://slack.com/api/users.info?token=${token}&user=${userId}`);

const mentionedUsers = (text) => {
  let result = [];
  const regex = /<@(.*?)>/gm;

  while (match = regex.exec(text)) {
    result.push(match[1]);
  }

  return result.length > 0 ? result : false;
};

module.exports = {
  getUserLocations,
  getUserDetails,
  mentionedUsers,
};

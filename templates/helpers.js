
const flags = require('./flags');

const enumeration = (context) => {
  let items = context;

  if (!items || items.length === 0) {
    return null;
  } else if (items.length === 1) {
    return context[0];
  } else if (items.length === 2) {
    return items.join(' and ');
  } else {
    let regulars = items.slice(0, items.length - 1);
    return regulars.join(', ') + ' and ' + items[context.length - 1];
  }
};

const match = (match) => {
  return `${country(match.homeTeamName)} (${match.result.goalsHomeTeam}) vs. ${country(match.awayTeamName)} (${match.result.goalsAwayTeam})`;
};

const country = (countryName) => {
  return `${countryName} ${flags[countryName]}`
};

module.exports = { enumeration, match, country };

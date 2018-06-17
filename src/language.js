const { execute } = require('../templates');

const uniq = (arr) =>
  arr.filter((elem, pos, arr) => arr.indexOf(elem) == pos);

const buildNationalTeamPlayingMessage = (people, countries) => {
  people = uniq(people)
  countries = uniq(countries);

  return execute('national-team-playing', {
    people,
    pluralPeople: people.length > 1,
    countries,
    pluarlCountries: countries.length > 1
  });
};

const isCurrentGameQuestion = (text) => {
  return /current game/gm.test(text.toLowerCase())
}

const buildCurrentGamesMessage = (matches) => {
  if (matches.length === 0) return execute('no-games');

  return execute('playing-games', { matches, plural: matches.length > 1, matchCount: matches.length });
}

const buildGenericAnswer = () => {
  return execute('generic-answer');
}

module.exports = { buildNationalTeamPlayingMessage, isCurrentGameQuestion, buildCurrentGamesMessage, buildGenericAnswer };

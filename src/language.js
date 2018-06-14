const buildPluralConcatenation = (enumeration) => {
  if (enumeration.length === 0 || enumeration.length === 1) {
    return enumeration[0];
  } else if (enumeration.length === 2) {
    return enumeration.join(' and ');
  } else {
    let regulars = enumeration.slice(0, enumeration.length - 1);
    return regulars.join(', ') + ' and ' + enumeration[enumeration.length - 1];
  }
};

const buildNationalTeamPlayingMessage = (people, countries) => {
  const isAre = people.length === 1 ? 'is' : 'are';
  const suffix = countries.length === 1 ? '' : ' respectively'
  const heThey = people.length === 1 ? 'he\'ll' : 'they\'ll';

  return `_${buildPluralConcatenation(people)} ${isAre} watching ${buildPluralConcatenation(countries)}${suffix}, ${heThey} probably respond after the game ends_`;
};

module.exports = { buildPluralConcatenation, buildNationalTeamPlayingMessage };

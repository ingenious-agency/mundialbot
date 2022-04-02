const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { enumeration, match } = require('./helpers');

Handlebars.registerHelper('enumeration', enumeration);
Handlebars.registerHelper('match', match);

const templates = {
  'national-team-playing': Handlebars.compile(fs.readFileSync(path.join(__dirname, 'national-team-playing.hbs'), 'utf8')),
  'no-games': Handlebars.compile(fs.readFileSync(path.join(__dirname, 'no-games.hbs'), 'utf8')),
  'playing-games': Handlebars.compile(fs.readFileSync(path.join(__dirname, 'playing-games.hbs'), 'utf8')),
  'generic-answer': Handlebars.compile(fs.readFileSync(path.join(__dirname, 'generic-answer.hbs'), 'utf8')),
};

const execute = (templateName, context) => {
  return templates[templateName](context);
}

module.exports = { execute };

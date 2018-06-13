const countriesAndTimezones = require('countries-and-timezones');
const timezones = { 'America/Buenos_Aires': 'America/Argentina/Buenos_Aires' };

const getCountriesForTimezone = (tz) => {
  const normalized = timezones[tz] ? timezones[tz] : tz;
  return countriesAndTimezones.getCountriesForTimezone(normalized);
}

module.exports = { getCountriesForTimezone };

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

module.exports = { buildPluralConcatenation };

const getRandomNumber = (min, max) => {
  const mathMin = Math.abs(min);
  const mathMax = Math.abs(max);
  const result = Math.abs(Math.ceil(Math.random()*(mathMax - mathMin)));
  return result;
};
getRandomNumber();

const checkLetterNumber = (string, maxLength) => {
  const str = String(string);
  if (str.length > maxLength) {
    return false;
  }
  return true;
};
checkLetterNumber();

export {getRandomNumber};

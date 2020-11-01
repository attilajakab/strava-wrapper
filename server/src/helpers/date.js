/**
 * Get epoch timestamp in seconds.
 * By default returns timestamp for current date.
 * If 'operator' and 'days' params provided it
 * adds or substracts the given days from current date.
 * 
 * @param {string} operator '+' or '- 
 * @param {number} days Integer
 * @returns {number} The timestmap
 */
module.exports.getEpochTimeStamp = (date = new Date(), operator = null, days = null) => {
  if (operator && days) {
    date = new Date(date.getFullYear(), date.getMonth(), eval(`date.getDate() ${operator} ${days}`));
  }
  return Math.floor(date.getTime() / 1000);
}
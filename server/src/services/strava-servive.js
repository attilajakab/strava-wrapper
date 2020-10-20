const strava = require('../clients/strava');
const database = require('../data-access/database');

module.exports.getAllActivities = ({ accessToken, after }) => {
  return new Promise((resolve, reject) => {
    strava.athlete.listActivities({
      access_token: accessToken,
      after
    }, (err, data) => {
      if (err) {
        reject(err);
      }
      const dataWithMongoId = data.map(activity => {
        activity['_id'] = activity['id'];
        delete activity['id'];
        return activity;
      });
      // database.getConnection()
      //   .collection('activities')
      //   .insertMany(dataWithMongoId);
      resolve(dataWithMongoId);
    });
  });
}
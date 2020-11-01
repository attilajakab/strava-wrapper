const strava = require('../clients/strava');
const getEpochTimeStamp = require('../helpers/date').getEpochTimeStamp;
const activityRepository = require('../repositories/activity');

function loadYearlyAllActivitiesToDb(accessToken, page = 1, year = new Date().getFullYear()) {
  const startOfYear = new Date(`${year}-01-01`);
  const startOfYearTimeStamp = getEpochTimeStamp(startOfYear);
  const perPage = 30;

  strava.athlete.listActivities({
    access_token: accessToken,
    after: startOfYearTimeStamp,
    per_page: perPage,
    page
  }, async (err, data) => {
    if (data.length) {
      const activities = data.map(activity => {
        activity['_id'] = activity['id'];
        delete activity['id'];
        activity.year = year;
        activity.start_date = new Date(activity.start_date).getTime() / 1000;
        activity.start_date_local = new Date(activity.start_date_local).getTime() / 1000;
        return activity;
      });
      await activityRepository.insertManyIfNotExists(activities);
      loadYearlyAllActivitiesToDb(accessToken, page + 1);
    }
  });
}

async function loadNewActivities(accessToken, userId, page = 1) {
  const latestActivity = await activityRepository.findLatestActivities(userId, 1);
  const perPage = 30;

  return new Promise((resolve, reject) => {
    strava.athlete.listActivities({
      access_token: accessToken,
      after: latestActivity[0].start_date,
      per_page: perPage,
      page
    }, async (err, data) => {
      if (data.length) {
        console.log('tu som');
        const activities = data.map(activity => {
          activity['_id'] = activity['id'];
          delete activity['id'];
          activity.year = new Date().getFullYear();
          activity.start_date = new Date(activity.start_date).getTime() / 1000;
          activity.start_date_local = new Date(activity.start_date_local).getTime() / 1000;
          return activity;
        });
        await activityRepository.insertManyIfNotExists(activities);
        await loadNewActivities(accessToken, userId, page + 1);
      }
      resolve();
    });
  });
}

module.exports.getLatestActivities = async ({ accessToken }, userId) => {
  const activitiesCount = await activityRepository.findByUserId(userId).count();
  if (activitiesCount === 0) {
    // No activities from this user.
    // Load all activities.
    loadYearlyAllActivitiesToDb(accessToken);
  } else {
    // Otherwise, load only new ones.
    await loadNewActivities(accessToken, userId)
  }
  return await activityRepository.findLatestActivities(userId);
}

module.exports.getActivities = async (filters, userId) => await activityRepository.findActivities(filters, userId);

module.exports.getActivity = async (id) => await activityRepository.findActivity(id);

const database = require('../data-access/database');

const COLLECTION_NAME = 'activities';

module.exports.insertManyIfNotExists = (items) => {
  const operations = items.map(item => {
    return {
      updateOne: {
        filter: {
          _id: item._id,
        },
        update: {
          $setOnInsert: {
            ...item
          }
        },
        upsert: true
      }
    };
  });
  return database.getConnection().collection(COLLECTION_NAME).bulkWrite(operations);
}

module.exports.findActivity = (id) => {
  return database.getConnection().collection(COLLECTION_NAME).find({
    "_id": Number.parseInt(id)
  }).toArray();
};

module.exports.findByUserId = (userId) => {
  return database.getConnection().collection(COLLECTION_NAME).find({
    "athlete.id": userId
  });
}

module.exports.findLatestActivities = (userId, limit = 10) => {
  return database.getConnection().collection(COLLECTION_NAME).find({
    "athlete.id": userId
  })
  .sort({start_date: -1})
  .limit(limit)
  .toArray();
}

module.exports.findActivities = ({ after, minPace, page }, userId) => {
  const limit = 10;
  const query = { "athlete.id": userId };

  if (after) query['start_date'] = { $gte: Number.parseInt(after) };
  if (minPace) query['average_speed'] = { $gte: Number.parseFloat(minPace) };

  const queryBuilder = database.getConnection()
    .collection(COLLECTION_NAME)
    .find(query)
    .sort({ start_date: -1 })
    .limit(limit);

  if (page) queryBuilder.skip(limit * (--page));
  
  return queryBuilder.toArray();
}
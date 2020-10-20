const express = require('express');
const router = express.Router();
const stravaService = require('../services/strava-servive');
const getEpochTimeStamp = require('../helpers/date').getEpochTimeStamp;

router.get('/', async (req, res) => {
  if (!req.session.token) {
    res.send({});
    return;
  }

  const after = req.query.hasOwnProperty('after') ? 
    req.query.after : 
    getEpochTimeStamp('-', 14);

  const data = await stravaService.getAllActivities({
    accessToken: req.session.token,
    after
  });

  res.send(data);
});

module.exports = router;
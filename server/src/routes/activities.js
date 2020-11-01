const express = require('express');
const router = express.Router();
const stravaService = require('../services/strava');

router.use((req, res, next) => {
  if (!req.session.token) {
    res.send({});
    return;
  }
  next();
});

router.get('/', async (req, res) => {
  const data = await stravaService.getActivities(
    req.query, 
    req.session.userId
  );

  res.send(data);
});

router.get('/latest', async (req, res) => {
  const data = await stravaService.getLatestActivities({
    accessToken: req.session.token,
  }, req.session.userId);

  res.send(data);
});

router.get('/:id', async (req, res) => {
  const data = await stravaService.getActivity(req.params.id);
  res.send(data[0]);
});

module.exports = router;
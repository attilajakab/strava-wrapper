const express = require('express');
const router = express.Router();
const strava = require('../clients/strava');

router.get('/', (req, res) => {
  if (!req.session.token) {
    res.send({});
    return;
  }

  strava.athlete.listActivities({
    access_token: req.session.token
  }, (err, data) => {
    res.send(data);
  });
});

module.exports = router;
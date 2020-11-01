const express = require('express');
const router = express.Router();
const strava = require('../clients/strava');

router.get('/', (req, res) => {
  if (req.session.token) {
    strava.athlete.get({
      access_token: req.session.token
    }, (err, data) => {
      req.session.userId = data.id;
      res.send(data);
    });
  } else {
    res.send({});
  }
});

module.exports = router;
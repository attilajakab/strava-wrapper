const express = require('express');
const router = express.Router();
const strava = require('../clients/strava');

router.get('/', (req, res) => {
  res.redirect(
    strava.oauth.getRequestAccessURL({
      scope: 'read,activity:read_all,profile:read_all'
    })
  );
});

module.exports = router;
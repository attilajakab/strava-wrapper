const express = require('express');
const router = express.Router();
const strava = require('../clients/strava');

router.get('/', (req, res) => {
  strava.oauth.deauthorize({
    access_token: req.session.token
  });
  req.session.destroy();
  res.redirect('http://localhost:9000');
});
module.exports = router;
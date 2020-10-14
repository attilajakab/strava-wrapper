const express = require("express");
const router = express.Router();
const strava = require('../clients/strava');

router.get('/', async (req, res) => {
  try {
    const code = req.query.code;
    const response = await strava.oauth.getToken(code);
    const access_token = response.access_token;
    req.session.token = access_token;
    res.redirect('http://localhost:9000');
  } catch (err) {
    console.log(error); // @TODO
  }
});

module.exports = router;
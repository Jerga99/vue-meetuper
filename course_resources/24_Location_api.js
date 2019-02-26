const geoip = require('geoip-lite');
// Run 'npm run-script updatedb' to update the data file
const request = require('request');

exports.getMeta = function(req, res) {
  request('https://api.ipify.org?format=json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        const ip = JSON.parse(response.body).ip;
        const geo = geoip.lookup(ip);
        return res.json(geo);
    } else {
      return res.send(422).send({errors: 'Cannot get location from IP'})
    }
  })
}

const express = require('express');
const router = express.Router();

const ApiCtrl = require('../controllers/api');

router.get('', ApiCtrl.getMeta);

module.exports = router;

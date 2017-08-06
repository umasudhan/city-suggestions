const express = require('express');
const router = express.Router();
const Suggester = require('../lib/suggester');
const CityRepository = require('../lib/city-repositiory');
const cityRepository = new CityRepository();
const suggester = new Suggester(cityRepository);

router.get('/suggestions', suggester.getSuggestions );

module.exports = router;

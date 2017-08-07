const express = require('express');
const router = express.Router();
const Suggester = require('../lib/suggester');
const CityRepository = require('../lib/city-repository');
const MatchRanker = require('../lib/match-ranker');
const cities = require('../data/cities_canada-usa');
const cityRepository = new CityRepository(cities);
const matchRanker = new MatchRanker();
const suggester = new Suggester(cityRepository, matchRanker);

router.get('/suggestions', suggester.getSuggestions );

module.exports = router;

const config = require('../config');

module.exports = class Suggester{
  constructor(cityRepository, matchRanker){
      this._cityRepository = cityRepository;
      this._matchRanker = matchRanker;
      this.getSuggestions  = this.getSuggestions.bind(this);
  }

  getSuggestions(req, res, next){ //TODO
      const queryString = req.query.q;
      if(!queryString || queryString.length<config.min_query_length){
          res.status(400);
          res.json({"status":400, "messsage":"Query string should be at least"+ config.min_query_length+" characters in length"});
          return;
      }
      const matches  = this._cityRepository.getMatches(queryString);
      const rankedMatches = this._matchRanker.rankMatches(matches);
      res.status(200);
      res.json(rankedMatches);
  }
};
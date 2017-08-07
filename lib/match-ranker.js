const geolib = require('geolib');
module.exports = class MatchRanker{
    constructor(){
        this.rankMatches = this.rankMatches.bind(this);
    }

    rankMatches(matches){ //TODO rank matches
        //1. highest ranking for exact matches- order by distance from lat long passed
        //2. next rank starts with- order by distance again
        return matches;
    }
};
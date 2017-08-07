const _ = require('lodash');

module.exports = class CityRepository{
    constructor(cities){
        this._cities = cities;
        this.getMatches  = this.getMatches.bind(this);
    }

    getMatches(queryString){
        return {
            exactMatches: this._getExactMatches(queryString),
            startsWith: this._getStartsWith(queryString)
        }
    }

    _getExactMatches(queryString){
        return _.filter(this._cities, function(city) {
            return city.name.toLowerCase() === queryString.toLowerCase();
        })
    }

    _getStartsWith(queryString){
        return _.filter(this._cities, function(city) {
            return city.name.toLowerCase().startsWith(queryString.toLowerCase()) && city.name.length>queryString.length;
        })
    }
};
const sinon = require('sinon');
const expect = require('chai').expect;
const assert = require('chai').assert;

const CityRepository = require('../lib/city-repository');
const cities = [{
    "name": "london",
    "state": "08",
    "country": "ca",
    "latitude": "42.98339",
    "longitude": "-81.23304"
},
    {
        "name": "londontowne",
        "state": "md",
        "country": "us",
        "latitude": "38.93345",
        "longitude": "-76.54941"
    },
    {
        "name": "someRandomCity",
        "state": "md",
        "country": "us",
        "latitude": "38.93345",
        "longitude": "-76.54941"
    }
];
const cityRepository = new CityRepository(cities);

describe('City Repository', function () {
    it('should retrieve cities grouped by exactMatches and startsWith for query', function () {
        expect(cityRepository.getMatches('london')).to.deep.equal({
            "exactMatches": [{
                "name": "london",
                "state": "08",
                "country": "ca",
                "latitude": "42.98339",
                "longitude": "-81.23304"
            }],
            "startsWith": [{
                "name": "londontowne",
                "state": "md",
                "country": "us",
                "latitude": "38.93345",
                "longitude": "-76.54941"
            }]
        });
    });
    it('should return empty list when the query does not match data store', function(){
        expect(cityRepository.getMatches('nonExistentCity')).to.deep.equal({
            "exactMatches": [],
            "startsWith": []
        });
    })
});
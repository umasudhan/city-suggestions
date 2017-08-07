const sinon = require('sinon');
const expect = require('chai').expect;
const assert = require('chai').assert;

const Suggester = require('../lib/suggester');
var cityRepository = { getMatches: function(){
    return {
        "exactMatches": [
            {
                "name": "london",
                "state": "08",
                "country": "ca"
            },
            {
                "name": "london",
                "state": "ky",
                "country": "us"
            }
        ],
        "startsWith": [
            {
                "name": "londontowne",
                "state": "md",
                "country": "us"
            }
        ]
    }
}};
var matchRanker = {
    rankMatches:function(matches){
        return matches;
    }
}
const suggester = new Suggester(cityRepository, matchRanker)

describe('City suggestion', function(){
    it('should retrieve suggestions based on query string', function(){
        var req = {
            query:{
                q:'london'
            }
        };
        var res = {status: function(){},json: function(){}};
        var json = sinon.spy(res, "json");
        var status = sinon.spy(res, "status");
        var suggestions = suggester.getSuggestions(req, res);
        expect(res.status.args[0]).to.deep.equal([200]);
        expect(res.json.args[0]).to.deep.equal([{
            "exactMatches": [
                {
                    "name": "london",
                    "state": "08",
                    "country": "ca"
                },
                {
                    "name": "london",
                    "state": "ky",
                    "country": "us"
                }
            ],
            "startsWith": [
                {
                    "name": "londontowne",
                    "state": "md",
                    "country": "us"
                }
            ]
        }]);
    })
    it('should return 400 if query string is too short', function(){
        var req = {
            query:{
                q:'lo'
            }
        };
        var res = {status: function(){},json: function(){}};
        var json = sinon.spy(res, "json");
        var status = sinon.spy(res, "status");
        var suggestions = suggester.getSuggestions(req, res);
        expect(res.status.args[0]).to.deep.equal([400]);
        expect(res.json.args[0]).to.deep.equal([{
            "messsage": "Query string should be at least3 characters in length",
            "status": 400
        }]);
    })
});


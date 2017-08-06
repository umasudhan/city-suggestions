# city-suggestions
List of cities in the US and Canada which match query

##Design
The requirements can be met by implementing a single route. The query is made against a data store. The following
restrictions apply on the query:
1. the query string is mandatory and should be at least three characters in length
2. latitude/longitude are optional- if specified, both need to be given

### Data Store
The data store can be a local database; a call to a http endpoint (http://download.geonames.org/export/dump/readme.txt)
or a local file with all info. It shouldnt matter what we use as long as it is well isolated.

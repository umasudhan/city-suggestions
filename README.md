# city-suggestions
List of cities in the US and Canada which match query

# API-documentation- Open swagger file <appRoot>/city-suggestions.yaml in swagger

# To run app
npm start

# To hit endpoint
http://localhost:3000/suggestions?q=query-string&&latitude=latitude&&longitude=longitude

# To run tests
npm run test

# To run coverage report (to view coverage report, go to <appRoot>/coverage/index.html)
npm run cover

## Design/Architecture
The requirements can be met by implementing a single route. The query is made against a data store. The entry point
index.js initialises the classes and their dependencies. The entry point passes control to suggester.js which
orchestrates results from the two classes which do the heavy lifting- city-repository which abstracts teh data store
 and match-ranker which assigns a rank to each match. The Dependencies are injected into classes to facilitate testing
by mocks and stubs.
The following restrictions apply on the query:
1. the query string is mandatory and should be at least three characters in length
2. latitude/longitude are optional- if specified, both need to be given

### Data Store
The data store can be a local database; a call to a http endpoint (http://download.geonames.org/export/dump/readme.txt)
or a local file with all info. It shouldnt matter what we use as long as it is well isolated. For the current
requirements, a database will be overkill- we can subset the data to a local file containing only fields of interest
which can then be queried in memory.

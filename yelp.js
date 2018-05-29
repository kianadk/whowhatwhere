'use strict';

const { YELP_KEY } = require('./passwords.json');
const yelp_fusion = require('yelp-fusion');
const client = yelp_fusion.client(YELP_KEY);

module.exports = async function(lat, lon) {
  const searchRequest = {latitude: lat, longitude: lon, radius: 1609}
  const results = client.search(searchRequest).then(response => {
    let businesses = [];
    for (let i = 0; i < response.jsonBody.businesses.length; i++) {
      businesses[i] = {
        name: response.jsonBody.businesses[i].name,
        distance: response.jsonBody.businesses[i].distance
      };
    }
  
    return {businesses: businesses};
  }).catch(e => {
    console.log(e);
  });
  const answer = await results;
  console.log(answer)
  return answer;
}

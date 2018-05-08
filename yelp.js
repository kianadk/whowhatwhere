'use strict';

const { YELP_KEY } = require('./passwords.json');
const yelp_fusion = require('yelp-fusion');
const client = yelp_fusion.client(YELP_KEY);

module.exports = async function(lat, lon) {
  const searchRequest = {latitude: lat, longitude: lon}
  const results = client.search(searchRequest).then(response => {
    let names = [];
    for (let i = 0; i < response.jsonBody.businesses.length; i++) {
      names[i] = response.jsonBody.businesses[i].name;
    }
    return {names: names};
  }).catch(e => {
    console.log(e);
  });
  const answer = await results;
  return answer;
}

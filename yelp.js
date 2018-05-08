'use strict';

const key = 'MslMQcx5AbcXI9lMclp0TUfJurqkxqpGp8sXsfOpFwuEC7scMh86X9XYfEVCkk6TdbMTbSzS2liof6pMGbprYhUqD9YVMeGE650_xC0sZ2Rrz0TOAsbMv8fj2bfwWnYx';
console.log("Take out hardcoded api key!");
const yelp_fusion = require('yelp-fusion');
const client = yelp_fusion.client(key);

module.exports = async function(lat, lon) {
  const searchRequest = {latitude: lat, longitude: lon}
  var results = client.search(searchRequest).then(response => {
    var names = [];
    for (var i = 0; i < response.jsonBody.businesses.length; i++) {
      names[i] = response.jsonBody.businesses[i].name;
    }
    return {names: names};
  }).catch(e => {
    console.log(e);
  });
  var answer = await results;
  return answer;
}
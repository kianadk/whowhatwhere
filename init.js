const contentDiv = document.getElementById('content');

contentDiv.innerHTML = 'Hello! Welcome to Who What Where.';

async function getYelpBusinesses(lat, lon) {
	var body = {latitude: lat, longitude: lon};
	var headers = new Headers();
  	headers.append("Content-Type", "application/json");
	var info = await fetch('/yelp', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(body)
	});
	info = await info.json();
	return info.names;
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    contentDiv.innerHTML = `Your current latitude is ${position.coords.latitude} and your current longitude is ${position.coords.longitude}.`;
    var listing = getYelpBusinesses(position.coords.latitude, position.coords.longitude).then(businesses => {
    	var accumulator = "<ul>";
	    for (var i = 0; i < businesses.length; i++) {
	    	accumulator = accumulator + "<li>" + businesses[i] + "</li>";
	    }
	    accumulator += "</ul>";
	    contentDiv.innerHTML += accumulator;
	    return accumulator;
    }).catch(e => {
    	console.log(e);
    });
  });
} else {
  contentDiv.innerHTML = 'We can\'t access your location, so our site doesn\'t work :(';
}
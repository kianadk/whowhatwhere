const contentDiv = document.getElementById('content');

contentDiv.innerHTML = 'Hello! Welcome to Who What Where.';

async function getYelpBusinesses(lat, lon) {
	const body = {latitude: lat, longitude: lon};

	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	let info = await fetch('/yelp', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(body)
	});
	info = await info.json();

	return info.names;
}

async function sendLocation(lat, lon) {
	console.log('location info sent');

	const body = {latitude: lat, longitude: lon};

	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	let info = await fetch('/user', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(body)
	});
	info = await info.json();
	console.log(info);
}

async function getLocations() {
	console.log('geting location info');

	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	let info = await fetch('/user', {
		method: 'GET',
		headers: headers,
	});
	info = await info.json();
	console.log(info);	
	return info;
}

function displayLocations(locations) {
	const list = document.createElement('ul');
	for (let i = 0; i < locations.length; i++) {
		const item = document.createElement('li');
		item.innerHTML = `${locations[i].name} is located at (${locations[i].latitude}, ${locations[i].longitude})`;
		list.appendChild(item);
	}
	document.body.appendChild(list);
}

getLocations().then((locations) => {
	displayLocations(locations);
});

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    contentDiv.innerHTML = `Your current latitude is ${position.coords.latitude} and your current longitude is ${position.coords.longitude}.`;
    let listing = getYelpBusinesses(position.coords.latitude, position.coords.longitude).then(businesses => {
    	let accumulator = "<ul>";
	    for (let i = 0; i < businesses.length; i++) {
	    	accumulator = accumulator + "<li>" + businesses[i] + "</li>";
	    }
	    accumulator += "</ul>";
			contentDiv.innerHTML += accumulator;
			
			sendLocation(position.coords.latitude, position.coords.longitude);

	    return accumulator;
    }).catch(e => {
    	console.log(e);
    });
  });
} else {
  contentDiv.innerHTML = 'We can\'t access your location, so our site doesn\'t work :(';
}

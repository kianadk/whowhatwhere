async function getYelpBusinesses(lat, lon) {
	const body = {latitude: lat, longitude: lon};

	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	let info = await fetch('/yelp', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(body)
	});
	console.log(info);
	info = await info.json();

	return info.businesses;
}

function appendYelpBlocks(businesses) {
	var parent = document.getElementById("content-yelp");
	for (let i = 0; i < businesses.length; i++) {
		const yelpBlock = document.createElement("div");
		yelpBlock.className = "yelp-block";

		const businessName = document.createElement('span');
		businessName.className = 'business-name';
		businessName.innerHTML = `${businesses[i].name}`;
		yelpBlock.appendChild(businessName)

		const businessDistance = document.createElement('span');
		businessDistance.className = 'business-distance';
		businessDistance.innerHTML = `${Math.round(businesses[i].distance)} meters`;
		yelpBlock.appendChild(businessDistance);

		parent.appendChild(yelpBlock);
	}
	var loading_text = document.getElementById("yelp-loading");
	var loading_text_parent = loading_text.parentElement;
	loading_text_parent.removeChild(loading_text);
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

function getDistance(lat1, long1, lat2, long2) {
	var R = 6371e3; // metres
	var φ1 = lat1 * (Math.PI / 180);
	var φ2 = lat2 * (Math.PI / 180);
	var Δφ = (lat2-lat1) * (Math.PI / 180);
	var Δλ = (long2-long1) * (Math.PI / 180);
	
	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
					Math.cos(φ1) * Math.cos(φ2) *
					Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	
	return Math.round(R * c);
}

function displayWhere(lat, long){
	let parent = document.getElementById('content-where');
	const where = document.createElement('div');
	where.className = 'where-block';
	where.innerHTML = `You are currently located at latitude ${Math.round(lat * 100) / 100} and longitude ${Math.round(long * 100) / 100}`;
	parent.appendChild(where);

	let loading_text = document.getElementById("where-loading");
	loading_text.parentElement.removeChild(loading_text);
}

function displayLocations(locations, lat, long) {
	var parent = document.getElementById("content-who");
	for (let i = 0; i < locations.length; i++) {
		const distance = getDistance(lat, long, locations[i].latitude, locations[i].longitude);

		if (distance > 1609) // more than 1 mile away
			continue;

		const item = document.createElement('div');
		item.className = 'who-block';

		const userName = document.createElement('span');
		userName.className = 'user-name';
		userName.innerHTML = locations[i].name;
		item.appendChild(userName);

		const userDistance = document.createElement('span');
		userDistance.className = 'user-distance';
		userDistance.innerHTML = `${distance} meters`;
		item.appendChild(userDistance);

		parent.appendChild(item);
	}

	let loading_text = document.getElementById("who-loading");
	loading_text.parentElement.removeChild(loading_text);
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
		displayWhere(position.coords.latitude, position.coords.longitude);
		getLocations().then((locations) => {
			displayLocations(locations, position.coords.latitude, position.coords.longitude);
		});

    let listing = getYelpBusinesses(position.coords.latitude, position.coords.longitude).then(businesses => {
    	appendYelpBlocks(businesses);
    }).catch(e => {
    	console.log(e);
    });
  });
} else {
	body.innerHTML = 'We can\'t access your location, so our site doesn\'t work :(';
}

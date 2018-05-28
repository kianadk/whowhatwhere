const contentDiv = document.getElementById('content-data');

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

function appendYelpBlocks(businesses) {
	var parent = document.getElementById("content-yelp");
	for (let i = 0; i < businesses.length; i++) {
		const child = document.createElement("div");
		if (i % 2 == 0) {
			child.className = "yelp-block left-float";
		}
		else {
			child.className = "yelp-block right-float";
		}
		child.innerHTML = "<div class='business-name'><t><h3>" + businesses[i] + "</h3></t></div>";
		child.innerHTML += "<div class='business-users'><t><h3>Users: " + "0" + "</h3></t></div>"
		parent.appendChild(child);
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
	var parent = document.getElementById("content-data");
	const list = document.createElement('ul');
	for (let i = 0; i < locations.length; i++) {
		const item = document.createElement('li');
		item.innerHTML = `${locations[i].name} is located at (${locations[i].latitude}, ${locations[i].longitude})`;
		list.appendChild(item);
	}
	parent.appendChild(list);
}

getLocations().then((locations) => {
	displayLocations(locations);
});

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    let listing = getYelpBusinesses(position.coords.latitude, position.coords.longitude).then(businesses => {
    	appendYelpBlocks(businesses);
    	document.getElementById("footer-banner").style.display = "block";
    }).catch(e => {
    	console.log(e);
    });
  });
} else {
  contentDiv.innerHTML = 'We can\'t access your location, so our site doesn\'t work :(';
}

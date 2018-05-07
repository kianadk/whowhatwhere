const contentDiv = document.getElementById('content');

contentDiv.innerHTML = 'Hello! Welcome to Who What Where.';

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    contentDiv.innerHTML = `Your current latitude is ${position.coords.latitude} and your current longitude is ${position.coords.longitude}.`;
  });
} else {
  contentDiv.innerHTML = 'We can\'t access your location, so our site doesn\'t work :(';
}
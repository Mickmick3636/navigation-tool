let map;
let directionsService;
let directionsRenderer1, directionsRenderer2, directionsRenderer3;

function initMap() {
  // Initialize the map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
    zoom: 12,
  });

  // Initialize DirectionsService and three DirectionsRenderers
  directionsService = new google.maps.DirectionsService();
  directionsRenderer1 = new google.maps.DirectionsRenderer({ map: map });
  directionsRenderer2 = new google.maps.DirectionsRenderer({ map: map });
  directionsRenderer3 = new google.maps.DirectionsRenderer({ map: map });
}

// Function to find the fastest route
function findFastestRoute() {
  const start1 = document.getElementById('start1').value;
  const start2 = document.getElementById('start2').value;
  const start3 = document.getElementById('start3').value;
  const destination = document.getElementById('destination').value;

  if (start1 && start2 && start3 && destination) {
    let routes = [];
    
    // Calculate route for Starting Location 1
    directionsService.route({
      origin: start1,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        routes.push({ response: response, duration: response.routes[0].legs[0].duration.value, renderer: directionsRenderer1 });
      }
      if (routes.length === 3) compareDurations(routes);
    });

    // Calculate route for Starting Location 2
    directionsService.route({
      origin: start2,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        routes.push({ response: response, duration: response.routes[0].legs[0].duration.value, renderer: directionsRenderer2 });
      }
      if (routes.length === 3) compareDurations(routes);
    });

    // Calculate route for Starting Location 3
    directionsService.route({
      origin: start3,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        routes.push({ response: response, duration: response.routes[0].legs[0].duration.value, renderer: directionsRenderer3 });
      }
      if (routes.length === 3) compareDurations(routes);
    });
  } else {
    alert("Please enter all three starting locations and the destination.");
  }
}

// Function to compare durations and display the fastest route
function compareDurations(routes) {
  // Find the route with the shortest duration
  let fastestRoute = routes.reduce((prev, curr) => prev.duration < curr.duration ? prev : curr);

  // Clear all directions renderers
  directionsRenderer1.set('directions', null);
  directionsRenderer2.set('directions', null);
  directionsRenderer3.set('directions', null);

  // Display the fastest route
  fastestRoute.renderer.setDirections(fastestRoute.response);
  alert(`The fastest route is from Starting Location ${routes.indexOf(fastestRoute) + 1}, with a duration of ${fastestRoute.response.routes[0].legs[0].duration.text}.`);
}

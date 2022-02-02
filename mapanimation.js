// This array will hold the individual vehicle coordinates
var busStops = [];
var modes = ['black', 'blue'];

async function run(){
  // get bus data    
	const locations = await getBusLocations();
  let time = new Date();
  let myTime = time.getSeconds() % 2;

  locations.forEach((x,i) => {
    let coord = [x.attributes.longitude, x.attributes.latitude];

    if (!busStops.length || i >= busStops.length) {
      var marker = new mapboxgl.Marker().setLngLat(coord).addTo(map);

      busStops.push(marker);
    }
    else {
      busStops[i].setLngLat(coord);
    }
  })

  document.querySelector('body').style.backgroundColor = modes[myTime];
  
	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();

// access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY3VydGlzcG9pIiwiYSI6ImNrejBucXI4eTFkeTIybm8yNWc2ajZ5dnQifQ.jTx7Za02Myi8CXZF43fWzw';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 12,
});
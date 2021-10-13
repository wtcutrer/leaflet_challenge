// Create our initial map object.
// Set the longitude, latitude, and starting zoom level/
var myMap = L.map("map").setView([39.8283, -98.5795], 5);

// Add a tile layer (the background map image) to our map.
// Use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Create a red circle over Dallas.
L.circle([32.776665,-96.796989], {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.75,
    radius: 500,
    draggable: true,
  }).addTo(myMap);
  

// Connect a black line from NYC to Toronto.
var line = [
    [40.712776, -74.005974],
    [43.653225, -79.383186]
  ];

L.polyline(line, {
    color: "black",
    draggable: true
  }).addTo(myMap);

// Create a purple polygon that covers the area in Atlanta, Savannah, Jacksonville, and Montgomery.
L.polygon([
    [33.748997, -84.387985],
    [32.080898, -81.091202],
    [30.332184, -81.655647],
    [32.36681, -86.29997]
  ], {
    color: "purple",
    fillColor: "purple",
    fillOpacity: 0.75,
    draggable: true
  }).addTo(myMap);
  
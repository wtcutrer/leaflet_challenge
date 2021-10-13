
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl).then(function (data) {
  createFeatures(data.features);
});
function getradius(feature){
  return (feature.properties.mag) * 5
}

function getcolor(feature){
  let depth = feature.geometry.coordinates[2];
  let color = "brown";

  if ( depth > 90) {
    color = "red"
  }
  
  else if (depth >60){
    color ="orange"
  }

  else if (depth > 30){
    color = "yellow"
  }

  return(color)
}
function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  var earthquakes = L.geoJSON(earthquakeData, {
   pointToLayer : function(feature,latlng){
     return new L.CircleMarker(latlng,{
       radius : getradius(feature),
       color : 	getcolor(feature),
      fillOpacity: 1,
      
     });
   },
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {

  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
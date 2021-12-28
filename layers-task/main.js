import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const sources = {
  'Point':new VectorSource(),
  'Circle':new VectorSource(),
  'Polygon':new VectorSource()
}

const layers = {
  'Point':new VectorLayer({source:sources.Point}),
  'Circle':new VectorLayer({source:sources.Circle}),
  'Polygon':new VectorLayer({source:sources.Polygon}),
}


map.addLayer(layers.Point);
map.addLayer(layers.Circle);
map.addLayer(layers.Polygon);

const geometryType = document.getElementById("type");

let draw;
function addInteraction(){
  const value=geometryType.value;
  draw = new Draw({
     source:sources[value],
     type:geometryType.value
  });
  map.addInteraction(draw);
}


geometryType.addEventListener('change',()=>{
  map.removeInteraction(draw);
  addInteraction();
});

const pointCheck = document.getElementById('pointCheck');
const circleCheck = document.getElementById('circleCheck');
const polyCheck = document.getElementById('polyCheck');

const toggleLayers = (layerName,shouldDisplay)=>{
  if(shouldDisplay)
    map.addLayer(layers[layerName]);
  else
    map.removeLayer(layers[layerName]);
}

pointCheck.addEventListener('change',()=>{
  toggleLayers('Point',pointCheck.checked);
});

circleCheck.addEventListener('change',()=>{
  toggleLayers('Circle',circleCheck.checked);
});

polyCheck.addEventListener('change',()=>{
  toggleLayers('Polygon',polyCheck.checked);
});


addInteraction();
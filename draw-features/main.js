import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';

const tileLayer = new TileLayer({source:new OSM()})
const vectorSource = new VectorSource();
const vectorLayer = new VectorLayer({source:vectorSource});

const map = new Map({
  target: 'map',
  layers: [
    tileLayer,
    vectorLayer
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const geometryType = document.getElementById("type");

let draw;
function addInteraction(){
  const value=geometryType.value;
  if(value!=="None")
    draw = new Draw({
      source:vectorSource,
      type:geometryType.value
    });
  map.addInteraction(draw);
}


geometryType.addEventListener("change",()=>{
  map.removeInteraction(draw);
  addInteraction();
});

document.getElementById('undo').addEventListener("click", ()=> {
  draw.removeLastPoint();
  console.log("undo");
});

addInteraction();
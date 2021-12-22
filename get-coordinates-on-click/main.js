import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


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

map.on("click",(e)=>{
  document.getElementById("txtLong").value = e.coordinate[0];
  document.getElementById("txtLat").value = e.coordinate[1];
})
import './style.css';
import {Map, View,Feature} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center:  [0,0],
    zoom: 2
  })
});

const addFeatures = (count)=>{
  let features=[];
  const e = 5000000;
  for (var i = 0; i < count; ++i) {
    let coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
    features[i] = new Feature(new Point(coordinates));
  }
  const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: features
      })
    })
    
    map.addLayer(vectorLayer);
}

document.querySelector("#btn-feature-count").addEventListener("click",()=>{
  const count = document.querySelector("#txt-feature-count").value;
  addFeatures(count);
})




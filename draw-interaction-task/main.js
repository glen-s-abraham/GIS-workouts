import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';

const map = new Map({
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const vSource = new VectorSource();
const vLayer = new VectorLayer({source:vSource});
map.addLayer(vLayer);

map.addInteraction(new Draw({
  type:'Polygon',
  source:vSource
}))

map.addInteraction(new Modify({
  source:vSource
}))

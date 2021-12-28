import './style.css';
import {Feature, Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

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

const vSource = new VectorSource();
const vLayer = new VectorLayer({
  source:vSource
})

const point = new Feature({
  geometry:new Point(fromLonLat([12.5,41.9]))
})


const pointStyle = new Style({
  image:new Icon({
    color: 'red',
    crossOrigin: 'anonymous',
    src:'data/Circle_with_Central_Point.svg',
    scale: 0.3,
    
  })
})

point.setStyle(pointStyle);

vSource.addFeature(point);
map.addLayer(vLayer);


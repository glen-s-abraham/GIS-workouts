import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import { Feature } from 'ol';
import Circle from 'ol/geom/Circle';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

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


//Custom feature generator
let generateCustomFeature=(coordinates)=>{
    var innerCircleStyle = new Style({
      fill:new Fill({
        color:"red"
      })
    });
    
    var outerCircleStyle = new Style({
      stroke:new Stroke({
        color:"red",
        width:3
      })
    })
    
    const innerCircle = new Feature({
      geometry:new Circle(coordinates,80000),
    })
    innerCircle.setStyle(innerCircleStyle);
    
    let outerCircle = new Feature({geometry:new Circle(coordinates,500000)});
    outerCircle.setStyle(outerCircleStyle);

    return [innerCircle,outerCircle];
}


//pick a random coordinate
const e = 5000000
const vSource = new VectorSource();

let coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];

//Generate the feature
vSource.addFeatures(generateCustomFeature(coordinates));

const vLayer = new VectorLayer({
  source:vSource
})

map.addLayer(vLayer);


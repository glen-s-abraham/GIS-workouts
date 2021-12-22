import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
//VectorLayer and source for marking features
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
//Features for marking the position
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {circular} from 'ol/geom/Polygon';
//we still have to add is a button that centers the map on that location. 
//The easiest way to get this is to use an OpenLayers Control, which we are going to import now:
import Control from 'ol/control/Control';


const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: fromLonLat([0,0]),
    zoom: 2
  })
});

const source = new VectorSource();
const layer = new VectorLayer({source:source});
map.addLayer(layer); 

//watchPosition()  updates the user's location as soon as it changes.
//It takes the latitude, longitude and accuracy, and creates two features:
//a circular polygon with the accuracy radius, and a point with the location.
//Both features are transformed from geographic coordinates into the view projection.

navigator.geolocation.watchPosition(
  pos=>{
    const coordinates = [pos.coords.longitude,pos.coords.latitude];
    const accuracy = circular(coordinates,pos.coords.accuracy);
    source.clear(true);
    source.addFeatures([new Feature(
        accuracy.transform('EPSG:4326', map.getView().getProjection())
      ),
      new Feature(new Point(fromLonLat(coordinates)))
    ]);
  },
  err=>{
    console.log(err);
  },
  {
    enableHighAccuracy:true
  }
);

//Next we'll create the markup for the control and register a click listener. 
//The listener fits the map to the extent of the source that holds the location 
//point and the accuracy polygon, in a 0.5 seconds animation, when the button is clicked

const locate = document.createElement("div");
locate.className = 'ol-control ol-unselectable locate';
locate.innerHTML = '<button title="Locate me">◎</button>'

locate.addEventListener("click",()=>{
  if(!source.isEmpty()){
    map.getView().fit(source.getExtent(),{
      maxZoom:18,
      duration:500
    });
  }
});

map.addControl(new Control({
    element:locate
  })
);
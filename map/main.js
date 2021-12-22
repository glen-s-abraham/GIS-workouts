import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import GeoJson from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
//Since we'll be reloading the page a lot, it would be nice if the
//map stayed where we left it in a reload.
//We can bring in the ol-hashed package to make this work.
import sync from 'ol-hashed';
//For our feature editor, we want users to be able to import their
//own data for editing. We'll use the DragAndDrop interaction for this
import DragAndDrop from 'ol/interaction/DragAndDrop';

// const map = new Map({
//   view:new View({
//     zoom:1,
//     center:[0,0]
//   }),
//   layers:[
//     new TileLayer({
//       source:new OSM()
//     }),
//     //a vector layer for rendering the features on the map
//     new VectorLayer({
//       //a vector source for fetching the data and managing a spatial index of features
//       source:new VectorSource({
//         //a format for reading and writing serialized data (GeoJSON in this case)
//         format:new GeoJson(),
//         url:'./data/countries.json'
//       })
//     })
//   ],
//   target:'map'
// });


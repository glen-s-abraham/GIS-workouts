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
//Now that we have a way for users to load data into the editor, we want to let them edit
//features. We'll use the Modify interaction for this, 
//configuring it to modify features on our vector source.
import Modify from 'ol/interaction/Modify';
//Our feature editor can now be used for loading data and modifying features. Next up, 
//we'll add a Draw interaction to allow people to draw new features and add them to our source.
import Draw from 'ol/interaction/Draw';

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

const map= new Map({
  view:new View({
    center:[0,0],
    zoom:1
  }),
  target:'map'
})

//For user entered data
const userSource = new VectorSource()
const userLayer = new VectorLayer({
  source:userSource
});

map.addLayer(userLayer);

//we'll create a drag and drop interaction, 
//configure it to work with our vector source, and add it to the map

map.addInteraction(
  new DragAndDrop({
    source:userSource,
    formatConstructors:[GeoJson]
  })
);

map.addInteraction(
  new Modify({
    source:userSource
  })
)

sync(map);
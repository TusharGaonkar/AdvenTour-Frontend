import Map, { Marker } from 'react-map-gl';
import { useState } from 'react';
import Timeline from './Timeline';
import 'mapbox-gl/dist/mapbox-gl.css';

const Itinerary = () => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 10,
  });
  const token =
    'pk.eyJ1IjoidHVzaGFyZGciLCJhIjoiY2xwOGQxbmozMms3bzJrczRla2wzZDk1aiJ9.Gj3D87Qq2LxjfYlt-ARpxA';
  return (
    <>
      <h1 className="font-semibold">Detailed itinerary</h1>
      <div className="grid w-full grid-cols-3 gap-6 p-4 mx-auto">
        <Timeline />
        <div className="col-span-2">
          <Map
            mapboxAccessToken={token}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/outdoors-v12"
          >
            <Marker longitude={-122.4} latitude={37.8} anchor="bottom" />
          </Map>
        </div>
      </div>
    </>
  );
};

export default Itinerary;

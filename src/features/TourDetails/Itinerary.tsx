import Map, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react';
import Timeline from './Timeline';
import 'mapbox-gl/dist/mapbox-gl.css';

const Itinerary = ({ tour }: { tour: Record<string, unknown> }) => {
  const { tourLocation } = tour;

  const [viewState, setViewState] = useState({
    longitude: tourLocation.coordinates.at(0),
    latitude: tourLocation.coordinates.at(1),
    zoom: 14,
  });
  const token =
    'pk.eyJ1IjoidHVzaGFyZGciLCJhIjoiY2xwOGQxbmozMms3bzJrczRla2wzZDk1aiJ9.Gj3D87Qq2LxjfYlt-ARpxA';

  return (
    <>
      <h1 className="font-semibold">Detailed itinerary</h1>
      <div className="grid w-full grid-cols-3 p-4 mx-auto space-x-6">
        <Timeline tour={tour} setViewState={setViewState} />
        <div className="col-span-2">
          <Map
            mapboxAccessToken={token}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            <Marker
              longitude={tourLocation?.coordinates.at(0)}
              latitude={tourLocation?.coordinates.at(1)}
              anchor="bottom"
            />

            {tour?.itinerary
              .map(
                ({
                  day,
                  activities,
                }: {
                  day: Record<string, unknown>;
                  activities: Record<string, unknown>[];
                }) =>
                  activities.map(({ location, place, activityName, _id }) => (
                    <Popup
                      longitude={location.coordinates.at(0)}
                      latitude={location.coordinates.at(1)}
                      anchor="bottom"
                      closeButton={false}
                      key={_id}
                    >
                      <p className="font-bold text-blue-600">{`Day ${day}`}</p>
                      <p className="font-semibold">{place}</p>
                      <p>{activityName}</p>
                    </Popup>
                  ))
              )
              .flat(1)}
          </Map>
        </div>
      </div>
    </>
  );
};

export default Itinerary;

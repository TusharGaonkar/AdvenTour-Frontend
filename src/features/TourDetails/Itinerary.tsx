/* eslint-disable react/jsx-props-no-spreading */
import { Spinner } from '@nextui-org/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Suspense, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import Timeline from './Timeline';

const Itinerary = ({ tour }: { tour: Record<string, unknown> }) => {
  const { tourLocation } = tour;

  const [viewState, setViewState] = useState({
    longitude: tourLocation?.coordinates?.at(0) || 0,
    latitude: tourLocation?.coordinates?.at(1) || 0,
    zoom: 13,
  });
  const token =
    'pk.eyJ1IjoidHVzaGFyZGciLCJhIjoiY2xwOGQxbmozMms3bzJrczRla2wzZDk1aiJ9.Gj3D87Qq2LxjfYlt-ARpxA';

  return (
    <>
      <h1 className="font-semibold md:text-lg p-2">Detailed itinerary</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:space-x-10 mx-auto">
        <div className="lg:col-span-1">
          <Timeline tour={tour} setViewState={setViewState} />
        </div>
        <div className="lg:col-span-2 lg:h-screen lg:sticky lg:top-0 h-[300px]">
          <Suspense fallback={<Spinner color="success" />}>
            <Map
              mapboxAccessToken={token}
              {...viewState}
              onMove={(evt) => setViewState(evt.viewState)}
              mapStyle="mapbox://styles/mapbox/streets-v12?optimize=true"
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
                    activities?.map(({ location, place, activityName, _id }) => (
                      <Popup
                        longitude={location.coordinates.at(0)}
                        latitude={location.coordinates.at(1)}
                        anchor="bottom"
                        closeButton={false}
                        key={_id}
                      >
                        <p className="font-bold text-blue-600">{`Day ${day}`}</p>
                        <p className="font-semibold">{place as string}</p>
                        <p>{activityName as string}</p>
                      </Popup>
                    ))
                )
                .flat(1)}
            </Map>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Itinerary;

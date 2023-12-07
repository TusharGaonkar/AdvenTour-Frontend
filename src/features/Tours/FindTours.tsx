import { useState, useEffect } from 'react';
import { Button, Chip } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import NearByTours from './NearByTours';
import SelectGroupSize from './SelectGroupSize';
import SelectTourDate from './SelectTourDate';
import {
  setTourStartDate,
  setTourGroupSize,
  setGetNearbyTours,
} from '../../redux/slices/filterToursSlice';
import { isMobile } from 'react-device-detect';
const FindTours = () => {
  const {
    tourStartDate: tourDateFilter,
    tourGroupSize: groupSizeFilter,
    getNearbyTours,
  } = useSelector((state) => state.filterToursQueryString);

  const [tourDate, setTourDate] = useState<string>(tourDateFilter);
  const [groupSize, setGroupSize] = useState<number>(groupSizeFilter);
  const [coords, setCoords] = useState<null | number[]>(getNearbyTours);
  const [userLocationName, setUserLocationName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (coords) {
      const [longitude, latitude] = coords;
      (async () => {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoidHVzaGFyZGciLCJhIjoiY2xwOGQxbmozMms3bzJrczRla2wzZDk1aiJ9.Gj3D87Qq2LxjfYlt-ARpxA`
        );

        const data = await response.json();

        setUserLocationName(data.features[0].place_name);
      })();
    } else setUserLocationName('');
  }, [coords, getNearbyTours]);

  const handleSearch = () => {
    dispatch(setGetNearbyTours(coords));
    dispatch(setTourStartDate(tourDate));
    dispatch(setTourGroupSize(groupSize));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center w-full gap-8 pt-8">
        <NearByTours setCoords={setCoords} />
        <SelectGroupSize groupSize={groupSize} setGroupSize={setGroupSize} />
        <SelectTourDate tourDate={tourDate} setTourDate={setTourDate} />
        <div className="flex items-baseline gap-2">
          <Button size="lg" color="primary" className="rounded-full" onClick={handleSearch}>
            Search Tours
          </Button>
        </div>
      </div>
      {userLocationName && (
        <div className="">
          <p className="text-[10px] rounded-full text-slate-400">
            Detected location: {userLocationName}
          </p>
        </div>
      )}
    </div>
  );
};

export default FindTours;

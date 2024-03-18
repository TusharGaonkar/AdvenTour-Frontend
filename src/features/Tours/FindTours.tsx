import { useState, useEffect } from 'react';
import { Button, Chip } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearch } from 'react-icons/io5';
import NearByTours from './NearByTours';
import SelectGroupSize from './SelectGroupSize';
import SelectTourDate from './SelectTourDate';
import {
  setTourStartDate,
  setTourGroupSize,
  setGetNearbyTours,
} from '../../redux/slices/filterToursSlice';
import { RootState } from '../../app/store';

const FindTours = () => {
  const {
    tourStartDate: tourDateFilter,
    tourGroupSize: groupSizeFilter,
    getNearbyTours,
  } = useSelector((state: RootState) => state.filterToursQueryString);

  const [tourDate, setTourDate] = useState<string>(tourDateFilter);
  const [groupSize, setGroupSize] = useState<number>(groupSizeFilter);
  const [coords, setCoords] = useState<null | number[]>(getNearbyTours);
  const [userLocationName, setUserLocationName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (coords && coords.length === 2) {
      const [longitude, latitude] = coords;
      (async () => {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoidHVzaGFyZGciLCJhIjoiY2xwOGQxbmozMms3bzJrczRla2wzZDk1aiJ9.Gj3D87Qq2LxjfYlt-ARpxA`
        );

        const data = await response.json();

        setUserLocationName(data.features[0].place_name);
      })();
    } else {
      dispatch(setGetNearbyTours(null));
      setUserLocationName('');
    }
  }, [coords, dispatch, getNearbyTours]);

  const handleSearch = () => {
    dispatch(setGetNearbyTours(coords));
    dispatch(setTourStartDate(tourDate));
    dispatch(setTourGroupSize(groupSize));
  };

  // Resetting states in redux won't reflect in child props else!
  useEffect(() => {
    setGroupSize(groupSizeFilter);
    setTourDate(tourDateFilter);
  }, [groupSizeFilter, tourDateFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_200px] w-full items-center justify-items-center sm:gap-6 gap-3 p-2">
        <NearByTours setCoords={setCoords} />
        <SelectGroupSize groupSize={groupSize} setGroupSize={setGroupSize} />
        <SelectTourDate tourDate={tourDate} setTourDate={setTourDate} />
        <div className="flex items-baseline gap-2 w-full">
          <Button
            size="lg"
            className=" rounded-full py-5 bg-gradient-to-r from-slate-900 to-slate-600 shadow-xl text-white w-full sm:w-full"
            onClick={handleSearch}
          >
            <IoSearch size={20} />
            <span className="-ml-2 text-md"> Search Tours</span>
          </Button>
        </div>
      </div>
      {userLocationName && (
        <div className="ml-3 -mt-4">
          <p className="text-[10px] rounded-full text-slate-400">
            Detected location: {userLocationName}
          </p>
        </div>
      )}
    </div>
  );
};

export default FindTours;

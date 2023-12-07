import { useEffect, useState } from 'react';
import { Switch } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';

const NearByTours = ({
  setCoords,
}: {
  setCoords: React.Dispatch<React.SetStateAction<number[] | null>>;
}) => {
  const { getNearbyTours } = useSelector((state) => state.filterToursQueryString);
  const [isSelected, setIsSelected] = useState<boolean>(!!getNearbyTours);
  useEffect(() => {
    if (isSelected) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (!isMobile) {
              toast.success(
                'Please note that the detected location can be inaccurate due to limited access to GPS on this device!',
                { className: 'font-medium text-xs rounded-xl', duration: 4000 }
              );
            }
            setCoords([position.coords.longitude, position.coords.latitude]);
          },
          (error) => {
            setIsSelected(false);
            setCoords(null);
            toast.error(`${error.message}, please reset the permission`, {
              className: 'text-xs font-semibold ',
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      }
    } else {
      setCoords(null);
    }
  }, [isSelected, setCoords]);

  return (
    <div className="flex items-center self-stretch justify-between w-full p-3 bg-gray-100 rounded-xl">
      <p className="text-xs font-semibold"> Get nearby tours</p>
      <Switch
        className="h-full"
        isSelected={isSelected}
        onChange={() => setIsSelected(!isSelected)}
      />
    </div>
  );
};

export default NearByTours;

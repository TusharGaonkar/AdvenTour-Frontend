import { useEffect, useRef, useState } from 'react';
import { Switch } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { RootState } from '../../app/store';

const NearByTours = ({
  setCoords,
}: {
  setCoords: React.Dispatch<React.SetStateAction<number[] | null>>;
}) => {
  const { getNearbyTours } = useSelector((state: RootState) => state.filterToursQueryString);
  const [isSelected, setIsSelected] = useState<boolean>(!!getNearbyTours);

  const isNotified = useRef(false);
  useEffect(() => {
    if (isSelected) {
      if (navigator.geolocation) {
        let toastID: string | null = null;
        if (!isNotified.current) {
          toastID = toast.loading('Detecting your current location...', {
            className: 'font-medium text-xs',
          });
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (isSelected && !isMobile && !isNotified.current) {
              toast.success(
                'Please note that the detected location can be inaccurate due to limited access to GPS on this device!',
                { className: 'font-medium text-xs' }
              );
              isNotified.current = true;
            }
            toast.dismiss(toastID);
            setCoords([position.coords.longitude, position.coords.latitude]);
          },
          (error) => {
            toast.dismiss(toastID);
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
      <p className="text-xs font-semibold tracking-wide"> Get nearby tours</p>
      <Switch
        className="h-full"
        isSelected={isSelected}
        onChange={() => setIsSelected(!isSelected)}
      />
    </div>
  );
};

export default NearByTours;

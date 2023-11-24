import { useState } from 'react';
import { Switch } from '@nextui-org/react';

const NearByTours = () => {
  const [isSelected, setIsSelected] = useState(false);
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

import React, { useState, useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';

const SelectGroupSize = ({
  groupSize,
  setGroupSize,
}: {
  groupSize: number;
  setGroupSize: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const allGroupSizes = ['1', '2', '3', '4'];
  const [input, setInput] = useState(groupSize);

  useEffect(() => {
    setGroupSize(+input);
  }, [input, setGroupSize]);

  return (
    <Select
      label="Group Size"
      placeholder="Select group size"
      className="max-w-xs"
      defaultSelectedKeys={[input.toString()]}
      onChange={(event) => {
        if (event.target.value) setInput(+event.target.value);
      }}
    >
      {allGroupSizes.map((item) => (
        <SelectItem value={item} key={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectGroupSize;

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
  const [input, setInput] = useState(new Set([groupSize.toString()]));

  useEffect(() => {
    const selectedGroupSize = [...input.values()][0];
    setGroupSize(Number(selectedGroupSize));
  }, [input, setGroupSize]);

  useEffect(() => {
    setInput(new Set([groupSize.toString()]));
  }, [groupSize]);

  return (
    <Select
      label="Group Size"
      placeholder="Select group size"
      selectedKeys={input}
      onSelectionChange={setInput}
    >
      {allGroupSizes.map((item) => (
        <SelectItem value={item} key={item}>
          {item === '4' ? '4 and more' : item}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectGroupSize;

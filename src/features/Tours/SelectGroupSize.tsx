import { Select, SelectItem } from '@nextui-org/react';

const SelectGroupSize = () => {
  const groupSize = ['1', '2', '3', '4'];
  return (
    <Select
      label="Group Size"
      placeholder="Select group size"
      className="max-w-xs"
      defaultSelectedKeys={['1']}
    >
      {groupSize.map((item) => (
        <SelectItem value={item} key={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectGroupSize;

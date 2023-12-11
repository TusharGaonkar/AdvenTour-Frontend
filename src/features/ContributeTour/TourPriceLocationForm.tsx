import { Chip, Input } from '@nextui-org/react';
import { Slider } from '@nextui-org/react';
import { RadioGroup, Radio } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import languages from '../../utils/languagesList';

const SelectLanguagesDropDown = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['English']));
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const selectedValue = useMemo(() => Array.from(selectedKeys), [selectedKeys]);

  useEffect(() => {
    setSelectedLanguages(selectedValue);
  }, [selectedValue, selectedLanguages]);

  return (
    <div className="flex flex-col items-start w-full gap-3">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="max-w-md capitalize">
            Select Languages
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          className="max-h-[300px] overflow-y-auto"
        >
          {languages.map(({ name }) => (
            <DropdownItem key={name}>{name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <div className="flex flex-wrap items-center gap-1">
        {selectedLanguages.map((language) => (
          <Chip key={language} color="primary" variant="flat">
            {language}
          </Chip>
        ))}
      </div>
    </div>
  );
};
const TourPriceLocationForm = () => {
  return (
    <div className="grid items-start grid-cols-2 gap-6">
      <Input
        type="text"
        label="Tour Location"
        placeholder="Enter tour location"
        labelPlacement="outside"
        className="col-span-2"
      />

      <Input
        type="number"
        label="Tour Price (per individual)"
        placeholder="Enter tour price in INR"
        labelPlacement="outside"
      />

      <Input
        type="number"
        label="Tour Discount"
        placeholder="Enter tour discount in INR"
        labelPlacement="outside"
        defaultValue="0"
      />
      <Input
        type="number"
        label="Tour Duration in days"
        placeholder="Enter tour duration in days"
        labelPlacement="outside"
      />

      <Input
        type="date"
        label="Tour Start Dates"
        labelPlacement="outside"
        placeholder="Enter tour start dates"
      />

      <Input
        type="time"
        label="Tour Start Time"
        labelPlacement="outside"
        placeholder="Enter tour start time"
      />
      <Input
        type="number"
        label="Tour total capacity"
        placeholder="Enter tour total capacity"
        labelPlacement="outside"
      />

      <Input
        type="number"
        label="Max people per booking"
        placeholder="Enter max people per booking"
        labelPlacement="outside"
      />
      <Slider
        label="Age Group Allowed"
        step={1}
        minValue={0}
        maxValue={100}
        defaultValue={[12, 70]}
      />

      <RadioGroup label="Select tour difficulty">
        <Radio value="Easy">Easy</Radio>
        <Radio value="Medium">Medium</Radio>
        <Radio value="Hard">Hard</Radio>
      </RadioGroup>

      <div className="flex flex-col justify-start gap-1">
        <p className="text-sm">Tour Guide Languages</p>
        <SelectLanguagesDropDown />
      </div>
    </div>
  );
};

export default TourPriceLocationForm;

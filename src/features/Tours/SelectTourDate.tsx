import React, { useState, useEffect } from 'react';
import { Input } from '@nextui-org/react';

const SelectTourDate = ({
  tourDate,
  setTourDate,
}: {
  tourDate: string;
  setTourDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [date, setDate] = useState(tourDate);
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);

  useEffect(() => {
    setTourDate(date);
  }, [date, setTourDate]);

  useEffect(() => {
    setDate(tourDate);
  }, [tourDate]);

  return (
    <Input
      value={date}
      type="date"
      label="Tour Date"
      placeholder="Select a tour date"
      onChange={(event) => setDate(event.target.value)}
      min={nextDate.toISOString().split('T')[0]}
    />
  );
};

export default SelectTourDate;

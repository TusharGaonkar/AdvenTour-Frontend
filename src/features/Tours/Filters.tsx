import { Slider, Checkbox } from '@nextui-org/react';
import StarRatings from 'react-star-ratings';

const Filters = () => (
  <div className="flex flex-col items-start h-full gap-6">
    <div className="flex flex-col items-start gap-12">
      <p className="text-lg font-bold">Filters</p>
      <div className="flex flex-col w-full gap-3">
        <p className="font-semibold">Tour price per person</p>
        <Slider
          label="Price"
          step={100}
          minValue={0}
          maxValue={100000}
          defaultValue={[2500, 10000]}
          className="min-w-[250px]"
          formatOptions={{ style: 'currency', currency: 'INR' }}
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        <p className="font-semibold "> Group age group</p>
        <Checkbox label="Nearby">Children (0 - 12 years)</Checkbox>
        <Checkbox label="Nearby">Teenagers (12 - 18 years)</Checkbox>
        <Checkbox label="Nearby">Adults (18 - 64 years)</Checkbox>
        <Checkbox label="Nearby">Seniors(65+ years)</Checkbox>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold">Tour Rating</p>

        {[4, 3, 2, 1].map((item) => (
          <StarRatings
            rating={item}
            key={item}
            starRatedColor="orange"
            starDimension="20px"
            starSpacing="3px"
          />
        ))}
      </div>
    </div>
  </div>
);

export default Filters;

import { Slider, Checkbox, Radio, RadioGroup, Button } from '@nextui-org/react';
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPrice,
  setTourDifficulty,
  setTourDuration,
  setAgeGroup,
  setTourRating,
  resetToursQueryString,
} from '../../redux/slices/filterToursSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: any) => state.filterToursQueryString);

  return (
    <div className="flex flex-col items-start gap-8 p-4 rounded-xl">
      <div className="flex items-center gap-2">
        <p className="text-lg font-bold">Filters</p>
        <Button
          variant="flat"
          color="warning"
          size="sm"
          onClick={() => dispatch(resetToursQueryString())}
        >
          Clear all filters
        </Button>
      </div>

      <div className="flex flex-col w-full gap-1">
        <p className="font-semibold ">Trip difficulty</p>
        <div className="flex flex-row gap-3">
          <Checkbox
            label="easy"
            isSelected={filters.tourDifficulty.Easy}
            onChange={() =>
              dispatch(
                setTourDifficulty({ difficulty: 'Easy', value: !filters.tourDifficulty.Easy })
              )
            }
          >
            Easy
          </Checkbox>
          <Checkbox
            label="medium"
            isSelected={filters.tourDifficulty.Medium}
            onChange={() =>
              dispatch(
                setTourDifficulty({ difficulty: 'Medium', value: !filters.tourDifficulty.Medium })
              )
            }
          >
            Medium
          </Checkbox>
          <Checkbox
            label="hard"
            isSelected={filters.tourDifficulty.Hard}
            onChange={() =>
              dispatch(
                setTourDifficulty({ difficulty: 'Hard', value: !filters.tourDifficulty.Hard })
              )
            }
          >
            Hard
          </Checkbox>
        </div>
      </div>

      <div className="flex flex-col w-full gap-3">
        <p className="font-semibold">Tour price per individual</p>
        <Slider
          label="Price"
          step={100}
          minValue={700}
          maxValue={3_00_000}
          defaultValue={filters.priceInRupees}
          className="min-w-[250px]"
          formatOptions={{ style: 'currency', currency: 'INR', minimumFractionDigits: 0 }}
          onChange={(value) => dispatch(setPrice(value as number[]))}
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <p className="font-semibold ">Trip duration</p>
        <Checkbox
          label="one day"
          isSelected={filters.tourDurationInDays['1']}
          onChange={() =>
            dispatch(setTourDuration({ duration: '1', value: !filters.tourDurationInDays['1'] }))
          }
        >
          1 day
        </Checkbox>
        <Checkbox
          label="two days"
          isSelected={filters.tourDurationInDays['2']}
          onChange={() =>
            dispatch(setTourDuration({ duration: '2', value: !filters.tourDurationInDays['2'] }))
          }
        >
          2 days
        </Checkbox>
        <Checkbox
          label="three days"
          isSelected={filters.tourDurationInDays['3']}
          onChange={() =>
            dispatch(setTourDuration({ duration: '3', value: !filters.tourDurationInDays['3'] }))
          }
        >
          3 days
        </Checkbox>
        <Checkbox
          label="four or more"
          isSelected={filters.tourDurationInDays['4']}
          onChange={() =>
            dispatch(setTourDuration({ duration: '4', value: !filters.tourDurationInDays['4'] }))
          }
        >
          4 & more
        </Checkbox>
      </div>

      <div className="flex flex-col w-full gap-1">
        <p className="font-semibold "> Allowed age groups</p>
        <Checkbox
          label="children"
          isSelected={filters.ageGroup.Children}
          onChange={() => {
            dispatch(setAgeGroup({ ageGroup: 'Children', value: !filters.ageGroup.Children }));
          }}
        >
          Children (0 - 12 years)
        </Checkbox>
        <Checkbox
          label="teenagers"
          isSelected={filters.ageGroup.Teenagers}
          onChange={() =>
            dispatch(setAgeGroup({ ageGroup: 'Teenagers', value: !filters.ageGroup.Teenagers }))
          }
        >
          Teenagers (12 - 18 years)
        </Checkbox>
        <Checkbox
          label="adults"
          isSelected={filters.ageGroup.Adults}
          onChange={() =>
            dispatch(setAgeGroup({ ageGroup: 'Adults', value: !filters.ageGroup.Adults }))
          }
        >
          Adults (18 - 64 years)
        </Checkbox>
        <Checkbox
          label="seniors"
          isSelected={filters.ageGroup.Seniors}
          onChange={() =>
            dispatch(setAgeGroup({ ageGroup: 'Seniors', value: !filters.ageGroup.Seniors }))
          }
        >
          Seniors (65+ years)
        </Checkbox>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold">Tour Rating</p>
        <RadioGroup
          value={filters.tourRating}
          onChange={(event) => {
            dispatch(setTourRating(event.target.value));
          }}
        >
          {[4, 3, 2, 1].map((item) => (
            <Radio key={item} value={item.toString()}>
              <StarRatings
                rating={item}
                starRatedColor="orange"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
              <span className="ml-2 text-xs">{`(${item} & above)`}</span>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Filters;

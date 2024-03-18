/* eslint-disable implicit-arrow-linebreak */
import { Slider, Checkbox, Radio, RadioGroup } from '@nextui-org/react';
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPrice,
  setTourDifficulty,
  setTourDuration,
  setAgeGroup,
  setTourRating,
  setTourCategory,
} from '../../redux/slices/filterToursSlice';
import useDebounce from '../../hooks/useDebounce';
import adventureActivities from '../../utils/adventureGenres';
import { RootState } from '../../app/store';

const TourFilterForm = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filterToursQueryString);

  // Debounce the slider value change
  const handlePriceChange = useDebounce((value) => dispatch(setPrice(value as number[])), 600);
  return (
    <form className="flex flex-col gap-5 rounded-xl p-2 lg:w-[300px]">
      <div className="flex flex-col w-full gap-1">
        <p className="font-semibold ">Trip difficulty</p>
        <div className="flex flex-row gap-3">
          <Checkbox
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
          size="sm"
          step={500}
          minValue={700}
          maxValue={3_00_000}
          defaultValue={filters.priceInRupees}
          className="min-w-[250px]"
          formatOptions={{ style: 'currency', currency: 'INR', minimumFractionDigits: 0 }}
          onChange={handlePriceChange}
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <p className="font-semibold ">Trip duration</p>
        <Checkbox
          isSelected={filters.tourDurationInDays['1']}
          onChange={() =>
            dispatch(setTourDuration({ duration: '1', value: !filters.tourDurationInDays['1'] }))
          }
        >
          1 day
        </Checkbox>
        <Checkbox
          isSelected={filters.tourDurationInDays['2']}
          onChange={() =>
            dispatch(setTourDuration({ duration: '2', value: !filters.tourDurationInDays['2'] }))
          }
        >
          2 days
        </Checkbox>
        <Checkbox
          isSelected={filters.tourDurationInDays['3']}
          onChange={() =>
            dispatch(setTourDuration({ duration: '3', value: !filters.tourDurationInDays['3'] }))
          }
        >
          3 days
        </Checkbox>
        <Checkbox
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
          isSelected={filters.ageGroup.Children}
          onChange={() => {
            dispatch(setAgeGroup({ ageGroup: 'Children', value: !filters.ageGroup.Children }));
          }}
        >
          Children (0 - 11 years)
        </Checkbox>
        <Checkbox
          isSelected={filters.ageGroup.Teenagers}
          onChange={() =>
            dispatch(setAgeGroup({ ageGroup: 'Teenagers', value: !filters.ageGroup.Teenagers }))
          }
        >
          Teenagers (12 - 17 years)
        </Checkbox>
        <Checkbox
          isSelected={filters.ageGroup.Adults}
          onChange={() =>
            dispatch(setAgeGroup({ ageGroup: 'Adults', value: !filters.ageGroup.Adults }))
          }
        >
          Adults (18 - 64 years)
        </Checkbox>
        <Checkbox
          isSelected={filters.ageGroup.Seniors}
          onChange={() =>
            dispatch(setAgeGroup({ ageGroup: 'Seniors', value: !filters.ageGroup.Seniors }))
          }
        >
          Seniors (65+ years)
        </Checkbox>
      </div>

      <p className="font-semibold">Select adventure genre</p>
      <div className="flex flex-col gap-1 max-h-[170px] overflow-x-hidden scrollbar-thin overflow-y-scroll w-full -mt-3 scrollbar-thumb-slate-200 scrollbar-track-white">
        {adventureActivities?.sort()?.map((item) => (
          <Checkbox
            key={item}
            isSelected={filters.tourCategory.has(item)}
            onChange={() => dispatch(setTourCategory(item))}
          >
            {item}
          </Checkbox>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Tour Rating</p>
        <RadioGroup
          value={filters.tourRating}
          defaultValue={filters.tourRating.toString()}
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
          <Radio key={0} value="0">
            <span className="text-[14px]">Exclude ratings from tours</span>
          </Radio>
        </RadioGroup>
      </div>
    </form>
  );
};

export default TourFilterForm;

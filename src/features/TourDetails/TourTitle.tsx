import { MdOutlineRecommend } from 'react-icons/md';
import StarRating from 'react-star-ratings';

const TourTitle = ({ tour }: { tour: Record<string, unknown> }) => (
  <div className="flex flex-col items-start gap-3">
    <h1 className="text-3xl font-semibold">{tour.title as string}</h1>
    <p className="text-sm underline text-slate-400">By Tushar Gaonkar</p>

    <div className="flex items-center justify-center gap-2">
      <StarRating rating={4.5} starRatedColor="orange" starDimension="20px" starSpacing="3px" />
      <p className="text-sm font-semibold text-slate-600">(4.5/5)</p>
      <p className="text-sm underline">103 Reviews</p>
      <div className="flex items-center gap-1">
        <MdOutlineRecommend className="text-xl text-red-500" />
        <p className="text-sm underline">Recommended by 10 users</p>
      </div>
    </div>
  </div>
);

export default TourTitle;

/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-tag-location */
import formatToINR from '../../utils/currencyFormatter';

const TourDescription = ({ tour }: { tour: Record<string, unknown> }) => (
  <div className="flex flex-col items-start gap-3">
    <h1 className="font-semibold md:text-lg">About</h1>
    <p className="text-sm sm:text-medium">{tour.description as string}</p>
    <p className="text-sm sm:text-medium">
      Starting from
      <span
        className={
          (tour?.discountInRupees as number) > 0
            ? 'line-through mx-1 text-red-400 font-semibold'
            : 'mx-1 font-semibold text-2xl'
        }
      >
        {formatToINR(tour?.priceInRupees as number)}
      </span>
      {(tour?.discountInRupees as number) > 0 && (
        <span className="text-2xl font-semibold">
          {formatToINR((tour.priceInRupees as number) - (tour.discountInRupees as number))}
        </span>
      )}
      /person
    </p>
  </div>
);

export default TourDescription;

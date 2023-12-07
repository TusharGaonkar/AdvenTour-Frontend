/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-tag-location */
import formatToINR from '../../utils/currencyFormatter';

const TourDescription = ({ tour }: { tour: Record<string, unknown> }) => (
  <div className="flex flex-col items-start gap-3">
    <h1 className="font-semibold text-md"> About</h1>
    <p>{tour.description as string}</p>
    <p>
      Starting from
      <span
        className={
          (tour?.discountInRupees as number) > 0
            ? 'line-through mx-1 text-red-400 font-semibold'
            : 'mx-1'
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

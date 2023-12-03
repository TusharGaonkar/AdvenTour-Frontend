/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-tag-location */
import formatToINR from '../../utils/currencyFormatter';

const TourDescription = ({ tour }: { tour: Record<string, unknown> }) => (
  <div className="flex flex-col items-start gap-3">
    <h1 className="font-semibold text-md"> About</h1>
    <p>{tour.description as string}</p>
    <p>
      from
      <span className="text-2xl font-semibold">{`₹${formatToINR(
        tour.price as number
      )}/person`}</span>
      per adult (price varies by group size)
    </p>
  </div>
);

export default TourDescription;

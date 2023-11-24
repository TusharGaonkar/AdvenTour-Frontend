import { tour } from '../../pages/test';
const TourDescription = () => {
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="font-semibold text-md"> About</h1>
      <p>{tour.description} </p>
      <p>
        from <span className="text-2xl font-semibold">₹{tour.priceInRupees}</span> per adult (price
        varies by group size)
      </p>
    </div>
  );
};

export default TourDescription;

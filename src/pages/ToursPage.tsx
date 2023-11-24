import NavBar from '../features/AdventourLandingPage/Navbar';
import FindTours from '../features/Tours/FindTours';
import Filters from '../features/Tours/Filters';
import TourCard from '../features/Tours/TourCard';

const ToursPage = () => (
  <div className="max-w-6xl mx-auto">
    <NavBar />
    <FindTours />
    <div className="flex flex-row gap-12">
      <Filters />
      <div className="flex flex-col items-start gap-6">
        {Array.from({ length: 3 }).map(() => (
          <TourCard key={Math.random()} />
        ))}
      </div>
    </div>
  </div>
);
export default ToursPage;

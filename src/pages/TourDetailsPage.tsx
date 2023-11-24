// eslint-disable-next-line import/order
import NavBar from '../features/AdventourLandingPage/Navbar';
import { Divider, Progress } from '@nextui-org/react';
import 'react-photo-view/dist/react-photo-view.css';
import TourTitle from '../features/TourDetails/TourTitle';
import BookMarkTour from '../features/TourDetails/BookMarkTour';
import RenderTourImages from '../features/TourDetails/RenderTourImages';
import TourDescription from '../features/TourDetails/TourDescription';
import TourQuickInfo from '../features/TourDetails/TourQuickInfo';
import TourDetailedInfo from '../features/TourDetails/TourDetailedInfo';
import BookTour from '../features/TourDetails/BookTour';
import Itinerary from '../features/TourDetails/Itinerary';
import TourReviews from '../features/TourDetails/TourReviews';

const TourDetailsPage = () => (
  <>
    {/* <Progress size="sm" isIndeterminate aria-label="Loading..." className="w-screen" /> */}
    <div className="flex flex-col max-w-6xl mx-auto gap-7">
      <NavBar />
      <div className="flex items-start justify-between">
        <TourTitle />
        <BookMarkTour />
      </div>

      <RenderTourImages />
      <div className="grid items-start grid-cols-2">
        <div className="flex flex-col gap-7">
          <TourDescription />
          <Divider />
          <TourQuickInfo />
          <Divider />
          <TourDetailedInfo />
        </div>

        <div className="sticky top-20">
          <BookTour />
        </div>
      </div>
      <Divider />
      <Itinerary />
      <Divider />
      <TourReviews />
    </div>
  </>
);

export default TourDetailsPage;

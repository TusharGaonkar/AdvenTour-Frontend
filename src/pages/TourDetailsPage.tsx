// eslint-disable-next-line import/order
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Progress, Spinner } from '@nextui-org/react';
import { useGetIndividualTourInfoQuery } from '../redux/slices/getIndividualTourInfoSlice';
import NavBar from '../common/Navbar';
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

const TourDetailsPage = () => {
  const { id } = useParams();
  const { data: tourData, status, error } = useGetIndividualTourInfoQuery(id);

  return (
    <>
      <Progress
        size="sm"
        isIndeterminate={status === 'pending'}
        aria-label="Loading..."
        className="w-screen"
        color="danger"
      />
      <div className="flex flex-col max-w-6xl mx-auto gap-7">
        <NavBar />
        {status === 'fulfilled' && tourData.totalResults === 1 ? (
          <>
            <div className="flex items-start justify-between">
              <TourTitle tour={tourData?.data?.tour} />
              <BookMarkTour />
            </div>
            <RenderTourImages tour={tourData.data.tour} />
            <div className="grid items-start grid-cols-2">
              <div className="flex flex-col gap-7">
                <TourDescription tour={tourData?.data?.tour} />
                <Divider />
                <TourQuickInfo tour={tourData?.data?.tour} />
                <Divider />
                <TourDetailedInfo tour={tourData?.data?.tour} />
              </div>

              <div className="sticky top-20">
                <BookTour />
              </div>
            </div>
            <Divider />
            <Itinerary tour={tourData?.data?.tour} />
            <Divider />
            <TourReviews />
          </>
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <Spinner color="danger" size="lg" />
          </div>
        )}
      </div>
    </>
  );
};

export default TourDetailsPage;

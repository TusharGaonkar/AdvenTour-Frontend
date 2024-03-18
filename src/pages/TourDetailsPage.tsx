/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/order
import { useParams } from 'react-router-dom';
import { Divider, Progress, Spinner } from '@nextui-org/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useGetIndividualTourInfoQuery } from '../redux/slices/getIndividualTourInfoSlice';
import NavBar from '../common/Navbar';
import 'react-photo-view/dist/react-photo-view.css';
import TourTitle from '../features/TourDetails/TourTitle';
import RenderTourImages from '../features/TourDetails/RenderTourImages';
import TourDescription from '../features/TourDetails/TourDescription';
import TourQuickInfo from '../features/TourDetails/TourQuickInfo';
import TourDetailedInfo from '../features/TourDetails/TourDetailedInfo';
import { useGetSimilarToursQuery } from '../redux/slices/getSimilarToursSlice';
import StatsProvider from '../common/StatsProvider';
import CustomMobileNavigation from '../common/CustomMobileNavigation';
import BookTour from '../features/TourDetails/BookTour';
import Itinerary from '../features/TourDetails/Itinerary';
import TourReviews from '../features/TourDetails/TourReviews';
import MultiCarousel from '../features/TourDetails/MultiCarousel';

const TourDetailsPage = () => {
  const { id } = useParams();
  const { data: tourData, status, isError, error } = useGetIndividualTourInfoQuery(id);
  const { data: similarToursData, isSuccess: isSimilarToursSuccess } = useGetSimilarToursQuery(id);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || 'Something went wrong...', {
        className: 'font-medium text-xs',
      });
    }
  }, [error?.data?.message, isError]);

  return (
    <>
      <Progress
        size="sm"
        isIndeterminate={status === 'pending'}
        aria-label="Loading..."
        className="w-full overflow-hidden"
        color="danger"
      />
      <NavBar />

      <div className="flex flex-col max-w-6xl mx-auto gap-7 overflow-clip">
        {status === 'fulfilled' && tourData.totalResults === 1 ? (
          <>
            <div className="flex md:flex-row flex-col items-start justify-between">
              <StatsProvider tourID={id}>
                {(statsData) => (
                  <TourTitle
                    tourTitle={tourData?.data?.tour?.title}
                    createdBy={tourData?.data?.tour?.createdBy}
                    statsData={statsData}
                  />
                )}
              </StatsProvider>
            </div>

            <RenderTourImages tour={tourData.data.tour} />
            <div className="lg:grid lg:items-start lg:grid-cols-2 lg:gap-2">
              <div className="flex flex-col gap-7 p-2">
                <TourDescription tour={tourData?.data?.tour} />
                <Divider />
                <TourQuickInfo tour={tourData?.data?.tour} />
                <Divider />
                <TourDetailedInfo tour={tourData?.data?.tour} />
              </div>

              <div className="sticky top-20 overflow-hidden">
                <BookTour
                  tour={tourData?.data?.tour}
                  ageGroups={tourData?.data?.tour?.ageGroups}
                  maxPeoplePerBooking={tourData?.data?.tour?.maxPeoplePerBooking}
                />
              </div>
            </div>
            <Divider />

            <Itinerary tour={tourData?.data?.tour} />

            <Divider />
            {isSimilarToursSuccess && (
              <MultiCarousel similarTours={similarToursData?.data?.similarTours} />
            )}
            <Divider id="reviews" />

            <TourReviews tourID={id as string} />

            <CustomMobileNavigation />
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

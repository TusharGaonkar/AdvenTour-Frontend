import { Chip, Divider, Skeleton, Spinner } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import toast from 'react-hot-toast';
import RenderTourImages from '../TourDetails/RenderTourImages';
import TourDescription from '../TourDetails/TourDescription';
import TourDetailedInfo from '../TourDetails/TourDetailedInfo';
import TourQuickInfo from '../TourDetails/TourQuickInfo';
import Itinerary from '../TourDetails/Itinerary';
import { useGetTourForAdminWithIDQuery } from '../../redux/slices/admin-TourVerificationSlice';
import 'react-day-picker/dist/style.css';
import { AcceptTourModal, RejectTourModal } from './AdminTourVerifyModal';

const AdminTourPreview = () => {
  const { id } = useParams();
  const { data: tourData, status, isError } = useGetTourForAdminWithIDQuery(id);

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong...', {
        className: 'text-xs font-medium',
      });
    }
  }, [isError]);

  const tourDates = tourData?.data?.tour?.tourStartDates?.map((date) => new Date(date));
  return (
    <div className="flex flex-col max-w-6xl mx-auto gap-7">
      {status === 'fulfilled' && tourData.totalResults === 1 ? (
        <>
          <div className="flex items-start justify-between p-2">
            <div className="break-all">
              <Skeleton isLoaded={status === 'fulfilled'}>
                <p className="text-xl sm:text-3xl font-semibold">
                  {tourData?.data?.tour?.title || 'No Title'}
                </p>
                <p className="text-sm  text-slate-400">
                  {`By ${tourData?.data?.tour?.createdBy?.userName || 'No name found'}`}
                  <span className="ml-1">
                    ({tourData?.data?.tour?.createdBy?.email || 'No email found'})
                  </span>
                </p>
              </Skeleton>
            </div>
            <div className="self-end flex gap-3 items-center">
              {tourData.data.tour.isVerified === false ? (
                <>
                  <AcceptTourModal tourID={id} />
                  <RejectTourModal tourID={id} />
                </>
              ) : (
                <>
                  <Chip variant="shadow">
                    {`Verified by ${tourData?.data?.tour?.adminName} on ${format(
                      parseISO(tourData?.data?.tour?.verificationDate),
                      'MMM d yyyy, ha'
                    )}`}
                  </Chip>
                  <Chip
                    variant="shadow"
                    color={tourData?.data?.tour?.isAccepted ? 'success' : 'danger'}
                    className="text-white"
                  >
                    {`Status - ${tourData?.data?.tour?.isAccepted ? 'Accepted' : 'Rejected'} `}
                  </Chip>
                </>
              )}
            </div>
          </div>
          <RenderTourImages tour={tourData.data.tour} />
          <Divider />
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-7">
              <TourDescription tour={tourData?.data?.tour} />
              <Divider />
              <TourQuickInfo tour={tourData?.data?.tour} />
              <Divider />
              <TourDetailedInfo tour={tourData?.data?.tour} />
            </div>

            <div className="sticky top-20 flex flex-col shadow-sm p-2 rounded-md">
              <div className="flex gap-2 items-center justify-between p-2">
                <h1 className="font-semibold">Selected Tour Dates</h1>
              </div>
              <Chip color="warning" variant="flat" className="mx-auto ">
                <p className="text-[10px]">
                  Double-check the chosen dates ensuring that there is a minimum tour duration
                  difference between them.
                </p>
              </Chip>

              <div className="self-left flex justify-between items-baseline p-1">
                <DayPicker
                  mode="single"
                  numberOfMonths={1}
                  selected={tourDates}
                  className="w-full"
                  disabled
                  modifiersStyles={{
                    selected: { backgroundColor: '#3FC1C9', color: 'white' },
                  }}
                />
                <Chip className="bg-primary text-white" size="sm" variant="flat">
                  {`${tourData?.data?.tour?.tourStartDates?.length} dates selected`}
                </Chip>
              </div>
            </div>
          </div>
          <Divider />
          <Itinerary tour={tourData?.data?.tour} />
          <Divider />
        </>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <Spinner color="danger" size="lg" />
        </div>
      )}
    </div>
  );
};

export default AdminTourPreview;

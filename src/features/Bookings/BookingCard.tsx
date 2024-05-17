import { format } from 'date-fns';
import { Button, Chip } from '@nextui-org/react';
import formatToINR from '../../utils/currencyFormatter';
import { useNavigate } from 'react-router-dom';
import { useCancelBookingMutation } from '../../redux/slices/bookingSlice';
import toast from 'react-hot-toast';
import swal from 'sweetalert';

type BookingInfoType = {
  _id: string;
  tour: {
    _id: string;
    title: string;
    mainCoverImage: string;
  };
  createdAt: string | Date;
  tourStartDate: string | Date;
  tourDurationInDays: number;
  bookingFor: number;
  totalCost: number;
  razorpay_payment_id: string;
};

const BookingCard = ({ bookingInfo }: { bookingInfo: BookingInfoType }) => {
  const {
    _id,
    tour,
    createdAt,
    tourStartDate,
    tourDurationInDays,
    bookingFor,
    totalCost,
    razorpay_payment_id,
  } = bookingInfo;

  const [userCancelBooking] = useCancelBookingMutation();

  const handleUserBookingCancellation = async (bookingID: string) => {
    const toastID = toast.loading('Cancelling booking, please wait...', {
      className: 'text-xs font-medium',
    });
    try {
      const cancelBookingResponse = await userCancelBooking(bookingID);

      if (cancelBookingResponse?.error?.data) {
        throw new Error(cancelBookingResponse.error.data.message);
      }
      toast.dismiss(toastID);
      toast.success(
        'Booking cancelled successfully. Your refund will be processed soon by our admin',
        {
          className: 'text-xs font-medium',
          duration: 8000,
        }
      );
    } catch (error) {
      toast.dismiss(toastID);
      toast.error((error as Error).message, {
        className: 'text-xs font-medium',
      });
    }
  };

  const cancelBookingModal = (bookingID: string) => {
    swal({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel your booking?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleUserBookingCancellation(bookingID);
      }
    });
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start border rounded-lg md:flex-row md:p-1 shadow-lg w-full p-2 sm:items-center min-w-[305px]">
      <img
        className="object-cover h-[180px] w-full rounded-t-lg md:w-[300px] md:h-60 md:rounded-none md:rounded-s-lg p-1"
        src={tour.mainCoverImage}
        alt="tour-main-cover"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1 items-center md:p-6 p-3">
        <p className="md:col-span-3 md:text-xl font-semibold text-gray-600 break-words truncate">
          {tour.title}
        </p>
        <Chip color="warning" variant="flat" className="md:col-span-3 min-w-max" size="sm">
          <p className="text-xs sm:text-sm p-1">{`Booking ID : ${_id}`}</p>
        </Chip>
        <p className="text-xs sm:text-sm p-1">
          {`Booked On : ${format(new Date(createdAt), 'dd MMM yyyy')}`}
        </p>
        <p className="text-xs sm:text-sm md:col-span-2 p-1">{`Payment ID : ${razorpay_payment_id}`}</p>

        <p className="text-xs sm:text-sm p-1">{`Booking For : ${bookingFor} people`}</p>
        <p className="text-xs sm:text-sm p-1">
          {`Start Date : ${format(new Date(tourStartDate), 'dd MMM yyyy')}`}
        </p>
        <p className="text-xs sm:text-sm md:mx-auto p-1">
          {`Duration : ${tourDurationInDays}  ${tourDurationInDays > 1 ? 'days' : 'day'}`}
        </p>
        <Chip variant="flat" color="success" size="sm" radius="none" className="min-w-max">
          <p className="text-sm sm:text-md font-semibold p-1">
            {`Total Cost : ${formatToINR(totalCost)}`}
          </p>
        </Chip>
        <div className="flex gap-2 items-center mt-3 flex-wrap col-span-full">
          {new Date(tourStartDate) > new Date() && (
            <Button
              color="danger"
              variant="solid"
              radius="sm"
              className="min-w-max"
              onClick={() => cancelBookingModal(_id)}
            >
              Cancel Booking
            </Button>
          )}
          <Button
            variant="shadow"
            radius="sm"
            className="min-w-max"
            onClick={() => navigate(`/tours/${tour._id}`)}
          >
            View Tour
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;

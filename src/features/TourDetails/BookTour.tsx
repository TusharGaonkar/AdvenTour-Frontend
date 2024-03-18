/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-one-expression-per-line */
import { Button, Chip, Divider, Skeleton } from '@nextui-org/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import formatToINR from '../../utils/currencyFormatter';
import { useGetTourCostQuery } from '../../redux/slices/bookTourSlice';
import type { RootState } from '../../redux/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface InitiatePaymentProps {
  totalCost: number;
  tourID: number | string;
  tourImage: string;
  tourName: string;
  userName: string;
  userEmail: string;
  peopleCount: number;
  startDate: string;
}

const initiatePayment = async (
  {
    totalCost,
    tourID,
    tourImage,
    tourName,
    userName,
    userEmail,
    peopleCount,
    startDate,
  }: InitiatePaymentProps,
  setBookingDisabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setBookingDisabled(true);
  const toastID = toast.loading('Checking slot availability, please hold on...', {
    className: 'text-xs font-medium',
  });
  try {
    if (!userEmail || !userName || !tourName) throw new Error('Please fill all the fields');

    const getKeyResponse = await fetch('http://localhost:2000/api/v-1.0/bookings/getKeyID', {
      credentials: 'include',
    });
    if (!getKeyResponse.ok) {
      throw new Error('There was an issue with the payment gateway try again later...');
    }

    const { data: { keyID = '' } = {} } = (await getKeyResponse.json()) || {};

    if (!keyID) throw new Error('Internal server error, please try again later...');

    const bookingConfig = {
      tourID,
      startDate,
      totalCost,
      peopleCount,
    };

    const orderResponse = await fetch('http://localhost:2000/api/v-1.0/bookings/createOrder', {
      method: 'POST',
      body: JSON.stringify(bookingConfig),
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!orderResponse.ok) {
      throw new Error('Something went wrong while creating order...');
    }

    const { data: { orderID = '', bookingID = '', expiresIn = '' } = {} } =
      (await orderResponse.json()) || {};

    if (!orderID || !bookingID || !expiresIn) {
      throw new Error('Internal server error, please try again later...');
    }

    const expiresInSeconds = Math.floor((expiresIn - Date.now()) / 1000);

    const paymentConfig = {
      key: keyID,
      amount: totalCost,
      currency: 'INR',
      name: `Payment for ${tourName} by ${userName}`,
      description: `Test payment for ${tourName} by ${userName}.`,
      image: tourImage,
      order_id: orderID,
      callback_url: 'http://localhost:2000/api/v-1.0/bookings/verifyPayment',
      redirect: false,
      prefill: {
        name: userName,
        email: userEmail,
      },
      notes: {
        address: 'contact gaonkar.tushar01@gmail.com for any queries',
      },
      theme: {
        color: '#3399cc',
      },
      timeout: expiresInSeconds > 0 ? expiresInSeconds : undefined,
    };

    if (!window.Razorpay) throw new Error('Razorpay script not loaded');

    const razorpay = new window.Razorpay(paymentConfig);

    razorpay.on('payment.failed', (response) => {
      toast.error(`${response.error.description}, please try again`, {
        className: 'text-xs font-medium',
      });
    });

    razorpay.open();
  } catch (error) {
    toast.error((error as Error).message, {
      className: 'text-xs font-medium',
    });
  } finally {
    toast.dismiss(toastID);
    setBookingDisabled(false);
  }
};

const BookTour = ({
  tour,
  ageGroups,
  maxPeoplePerBooking,
}: {
  tour: Record<string, any>;
  ageGroups: { minAge: number; maxAge: number };
  maxPeoplePerBooking: number;
}) => {
  const { _id: tourID = '', tourStartDates = [] } = tour || {};

  if (!tourID || tourStartDates.length === 0) throw new Error('Something went wrong');

  const [bookingDisabled, setBookingDisabled] = useState(false);
  const tourDates = tourStartDates
    ?.map((date: string) => new Date(date))
    .filter((date: Date) => date > new Date());

  if (tourDates.length === 0) {
    return (
      <div className="text-center p-5 bg-secondary rounded-xl h-full">
        <p className="font-semibold">Unfortunately no upcoming tour dates found!</p>
      </div>
    );
  }

  const [peopleCount, setPeopleCount] = useState(1);

  const [startDate, setStartDate] = useState<string>(
    tourDates.length > 0 ? format(tourDates[0], 'yyyy-MM-dd') : ''
  );

  const handleDateChange = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    setStartDate(formattedDate);
  };

  const {
    data: bookingData,
    isFetching,
    isError,
    refetch,
  } = useGetTourCostQuery({
    tourID,
    startDate,
    peopleCount,
  });

  const handleIncrement = () => {
    if (peopleCount < maxPeoplePerBooking) {
      setPeopleCount(peopleCount + 1);
      refetch();
    }
  };

  const handleDecrement = () => {
    if (peopleCount > 1) {
      setPeopleCount(peopleCount - 1);
      refetch();
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong while getting booking cost, please refresh and try again', {
        className: 'text-xs font-medium',
      });
    }
  }, [isError]);

  const navigate = useNavigate();
  const { user, isLoggedIn } = useAppSelector((state) => state.userInfo) || {};

  const handleBookingClick = (event: MouseEvent) => {
    event.preventDefault();

    if (!isLoggedIn) {
      toast.error('Please login in or sign up to book a tour', {
        className: 'text-xs font-medium',
      });
      navigate('/login');
    } else if (user && (user.role === 'local-guide' || user.role === 'admin')) {
      toast.error('Only users can book a tour...', {
        className: 'text-xs font-medium',
      });
    } else {
      initiatePayment(
        {
          totalCost: bookingData?.data?.totalCost,
          tourID,
          tourImage: tour?.mainCoverImage || '',
          tourName: tour?.title,
          userName: user?.userName,
          userEmail: user?.email,
          peopleCount,
          startDate,
        },
        setBookingDisabled
      );
    }
  };
  return (
    <div className="flex flex-col gap-3 border-1 rounded-xl">
      <h1 className="font-semibold text-center text-medium mt-3">Book Tour</h1>
      <div className="flex sm:flex-row flex-col-reverse sm:justify-between sm:items-baseline sm:rounded-md p-3">
        <DayPicker
          mode="single"
          numberOfMonths={1}
          selected={startDate ? new Date(startDate) : undefined}
          onDayClick={handleDateChange}
          className="w-full"
          modifiersStyles={{
            selected: { backgroundColor: 'black', color: 'white' },
          }}
          disabled={(day) =>
            !tourDates.some((date) => date.toDateString() === day.toDateString()) ||
            day < new Date()
          }
        />
        <Chip className="bg-accent text-white sm:ml-0 ml-4" size="md" variant="flat">
          {`${tourStartDates?.length} available dates`}
        </Chip>
      </div>

      <div className="flex flex-col gap-4 p-3 shadow-md rounded-xl bg-secondary">
        <div className="flex sm:flex-row flex-col gap-2 items-baseline justify-between">
          <div className="flex flex-col flex-1 gap-2 p-3">
            <Skeleton isLoaded={!isFetching}>
              <Chip size="sm" color="danger" variant="dot">
                Allowed age group {ageGroups?.minAge} - {ageGroups?.maxAge}
              </Chip>
            </Skeleton>
            <Skeleton isLoaded={!isFetching}>
              <Chip size="sm" color="warning" variant="dot">
                Booking for {bookingData?.data?.bookingFor} people
              </Chip>
            </Skeleton>
            <Skeleton isLoaded={!isFetching}>
              <Chip size="sm" variant="dot" color="success">
                Tour start day - {bookingData?.data?.selectedDate}{' '}
              </Chip>
            </Skeleton>
          </div>

          <div className="flex gap-1 items-baseline flex-shrink-0">
            <p className="font-medium text-sm text-white rounded-full p-2 leading-relaxed bg-neutral">
              Reserve spot
            </p>

            <div className="flex items-baseline">
              <button
                className="bg-primary text-white rounded-full text-center h-10 w-10 font-semibold disabled:cursor-not-allowed"
                onClick={handleDecrement}
                disabled={isFetching || bookingDisabled}
              >
                -
              </button>
              <p className="w-10 h-10 text-center text-medium font-medium">{peopleCount}</p>
              <button
                className="bg-primary text-white rounded-full h-10 w-10  font-semibold text-center disabled:cursor-not-allowed"
                onClick={handleIncrement}
                disabled={isFetching || bookingDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-2 p-3">
          {bookingData?.data?.discount > 0 && (
            <Skeleton isLoaded={!isFetching}>
              <p className=" rounded-full min-w-max font-semibold text-medium text-primary">
                {`Discount ${formatToINR(bookingData?.data?.discount)}`}
              </p>
            </Skeleton>
          )}
          <Skeleton isLoaded={!isFetching}>
            {!isError && (
              <p className="font-semibold rounded-full min-w-max text-medium text-primary">
                {`Total ( ${bookingData?.data?.bookingFor} x ${formatToINR(
                  bookingData?.data?.pricePerPerson
                )} ) = ${formatToINR(bookingData?.data?.totalCost)} `}
                <span className="text-xs font-normal text-slate-500">discount inc.</span>
              </p>
            )}
          </Skeleton>
        </div>
        <div className="flex items-center gap-3">
          <Button
            disabled={isFetching || isError || bookingDisabled}
            color="warning"
            variant="shadow"
            className="w-full rounded-full  py-2 uppercase disabled:bg-orange-300 disabled:cursor-not-allowed"
            onClick={handleBookingClick}
            isLoading={bookingDisabled}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookTour;

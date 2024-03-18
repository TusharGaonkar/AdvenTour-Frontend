import { useNavigate, useParams } from 'react-router-dom';
import { Button, Chip, Divider, Progress, Spinner } from '@nextui-org/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useGetPaymentInfoQuery } from '../../redux/slices/admin-getAllBookingsSlice';
import formatToINR from '../../utils/currencyFormatter';

const Payments = () => {
  const { paymentID } = useParams();
  const {
    data: paymentInfo,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPaymentInfoQuery(paymentID || '');

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      let errorMessage = 'Invalid payment ID or internal server error';
      if (error?.status === 401) {
        errorMessage = 'Unauthorized access';
      }
      toast.error(errorMessage, {
        className: 'font-medium text-xs',
      });
    }
  }, [isError, error?.status]);

  return (
    <>
      <Progress
        isIndeterminate={isLoading}
        className="w-full overflow-hidden"
        aria-label="progress"
        size="sm"
        color="danger"
      />
      <div className="mx-auto mt-[46px] shadow-md p-7 rounded-xl md:min-w-[550px] max-w-6xl">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold tracking-wide mb-8">
            Payment Info for{' '}
            <span>
              <Chip color="success" variant="flat">
                {paymentID}
              </Chip>
            </span>
          </h1>

          <Button
            radius="full"
            className="sm:text-medium text-sm min-w-min bg-primary text-white"
            onClick={() => navigate('/admin/bookings')}
          >
            View all bookings
          </Button>
        </div>
        <Divider />

        <div className="grid mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {isLoading && (
            <Spinner color="danger" size="lg" className="mx-auto col-span-3" aria-label="loading" />
          )}

          {isSuccess &&
            Object.entries(paymentInfo?.data?.payment || {})
              .filter(([key, value]: [string, any]) => value && typeof value !== 'object')
              .map(([key, value]: [string, any]) => (
                <div
                  key={key}
                  className="flex flex-col gap-2 bg-blue-200/50 p-4 rounded-md min-w-[200px]"
                >
                  <p className="font-semibold text-sm uppercase">{key}</p>
                  <p className="tracking-wide leading-relaxed text-sm">
                    {['amount', 'tax', 'fee', 'amount_refunded'].includes(key)
                      ? formatToINR(Number(value) / 100)
                      : value}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Payments;

/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-wrap-multilines */
import { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Chip,
  Image,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Skeleton,
  Select,
  SelectItem,
  Pagination,
} from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import {
  useCancelAndRefundBookingMutation,
  useGetAllBookingsQuery,
} from '../../redux/slices/admin-getAllBookingsSlice';
import 'react-datepicker/dist/react-datepicker.css';
import { IoMdRefresh } from 'react-icons/io';
import swal from 'sweetalert';
import toast from 'react-hot-toast';

const DisplayBookings = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);
  const [sortBy, setSorBy] = useState<'latest' | 'oldest'>('latest');
  const [status, setStatus] = useState<'confirmed' | 'cancelled' | 'userCancelled'>('confirmed');

  const {
    data: bookingsData,
    isFetching,
    isError,
    isSuccess,
    refetch,
  } = useGetAllBookingsQuery({
    selectedDate,
    sortBy,
    status,
    page,
  });

  const [cancelBooking] = useCancelAndRefundBookingMutation();

  useEffect(() => {
    if (bookingsData?.pagination) {
      const pageCount = bookingsData?.pagination?.page || 1;
      const totalPageCount = bookingsData?.pagination?.totalPages || 1;

      setPage(pageCount);
      setTotalPages(totalPageCount);
    }
  }, [bookingsData?.pagination]);

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong while fetching bookings', {
        className: 'text-xs font-medium',
      });
    }
  }, [isError]);

  const resetPagination = () => {
    setPage(1);
    setTotalPages(1);
  };
  const handleTabChange = (key: 'confirmed' | 'cancelled') => {
    resetPagination();
    setStatus(key);
  };

  const handleSelectChange = (key: 'latest' | 'oldest') => {
    resetPagination();
    setSorBy(key);
  };

  const handleDateChange = (date: Date) => {
    resetPagination();
    setSelectedDate(date);
  };

  const RenderTableSkeleton = useCallback(
    () =>
      Array.from({ length: 3 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="flex flex-col gap-2 items-start justify-center">
              <Skeleton className="w-[100px] h-[56px] rounded-lg" />
              <Skeleton className="h-[18px] w-[60px] rounded-xl" />
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col items-center justify-center gap-2">
              <Skeleton className="h-[60px] w-[60px] rounded-full" />
              <Skeleton className="h-[18px] w-[60px] rounded-xl" />
              <Skeleton className="h-[18px] w-[130px] rounded-xl" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-[18px] w-[170px] rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[18px] w-[101px]  rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[18px] w-[101px] rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[20px] w-[60px] rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[20px] w-[80px] rounded-md" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[40px] w-[80px] rounded-full" />
          </TableCell>
        </TableRow>
      )),
    []
  );

  const handleCancelBooking = async (bookingID: string) => {
    if (!bookingID || typeof bookingID !== 'string') return;
    const toastID = toast.loading('Cancelling the booking and initiating full refund...', {
      className: 'font-medium text-xs',
    });
    try {
      const response = await cancelBooking(bookingID);

      if (!response || response.error) {
        throw new Error(response?.error?.data?.message || 'Failed to cancel the booking');
      }
    } catch (error) {
      toast.error(error?.message || 'Failed to cancel the booking', {
        className: 'font-medium text-xs',
      });
    } finally {
      toast.dismiss(toastID);
    }
  };

  const cancelBookingModal = (bookingID: string) => {
    swal({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel the booking and refund the full amount?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) handleCancelBooking(bookingID);
    });
  };
  return (
    <div className="flex flex-col gap-6 p-3">
      <h1 className="text-2xl font-bold text-primary">All Bookings</h1>

      <div className="flex flex-col lg:flex-row gap-2">
        <Select
          label="Sort by"
          placeholder="Sort by"
          defaultSelectedKeys={[sortBy]}
          radius="lg"
          labelPlacement="outside"
          onChange={(event) => handleSelectChange(event.target.value as 'latest' | 'oldest')}
          className="lg:w-[300px]"
        >
          <SelectItem key="latest" value="latest">
            Latest
          </SelectItem>
          <SelectItem key="oldest" value="oldest">
            Oldest
          </SelectItem>
        </Select>

        <div className="flex gap-2 items-end">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-black min-w-max text-sm">Filter by tour start date</p>
            <div className="border-1 rounded-md w-full">
              <DatePicker selected={selectedDate} onChange={handleDateChange} showIcon />
            </div>
          </div>
          <Button size="sm" className="h-[36px]" onClick={() => setSelectedDate(null)}>
            Clear
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row w-full self-end lg:justify-end gap-2 mt-2 sm:mt-0">
          <Button variant="flat" color="success" onClick={() => refetch()} className="max-w-max">
            <span>
              <IoMdRefresh size={17} />
            </span>
            Refresh Data
          </Button>
          <Tabs
            variant="solid"
            aria-label="filter bookings"
            selectedKey={status}
            onSelectionChange={(key) => handleTabChange(key as 'confirmed' | 'cancelled')}
          >
            <Tab key="confirmed" title="Confirmed" />
            <Tab key="cancelled" title="Cancelled" />
            <Tab key="userCancelled" title="Refunds to process" />
          </Tabs>
        </div>
      </div>

      <Table
        aria-label="All adventour bookings"
        isStriped
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(nextPage) => setPage(nextPage)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>TOUR</TableColumn>
          <TableColumn>USER</TableColumn>
          <TableColumn>BOOKING ID</TableColumn>
          <TableColumn>BOOKING DATE</TableColumn>
          <TableColumn>TOUR START DATE</TableColumn>
          <TableColumn>BOOKING FOR</TableColumn>
          <TableColumn>TOUR DURATION</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No bookings found.">
          {isFetching && RenderTableSkeleton()}
          {isSuccess &&
            !isFetching &&
            bookingsData?.data?.bookings?.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>
                  <div className="flex flex-col items-start justify-start gap-2">
                    <Image
                      src={booking?.tour?.mainCoverImage}
                      alt={booking?.tour?.title}
                      className="w-[150px] rounded-lg object-cover"
                    />
                    <p className="text-xs font-medium text-slate-500 w-[100px] leading-relaxed break-words">
                      {booking?.tour?.title}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 items-center justify-center p-1">
                    <Avatar
                      size="lg"
                      src={booking?.user?.avatar}
                      showFallback
                      name={booking?.user?.userName}
                    />

                    <p className="break-words  text-slate-500 font-semibold text-xs leading-relaxed max-w-[150px]">
                      {booking?.user?.userName}
                    </p>
                    <Chip size="sm" variant="flat">
                      {booking?.user?.email}
                    </Chip>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip size="sm" variant="flat" color="warning">
                    {booking._id}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip size="sm" variant="bordered">
                    {new Date(booking?.createdAt).toDateString()}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip size="sm" variant="shadow" className="bg-accent/90 text-white">
                    {new Date(booking?.tourStartDate as Date).toDateString()}
                  </Chip>
                </TableCell>
                <TableCell>
                  <p className="text-center">{booking?.bookingFor}</p>
                </TableCell>
                <TableCell>
                  <p className="text-center">
                    {booking?.tourDurationInDays} {booking?.tourDurationInDays > 1 ? 'days' : day}
                  </p>
                </TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="bg-black text-white rounded-full">Actions</Button>
                    </DropdownTrigger>
                    <DropdownMenu variant="faded" aria-label="Static Actions">
                      <DropdownItem
                        key="payment"
                        onClick={() =>
                          window.open(`bookings/paymentInfo/${booking?.razorpay_payment_id}`)
                        }
                      >
                        Payment Details
                      </DropdownItem>
                      {status === 'confirmed' ||
                        (status === 'userCancelled' && (
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            onClick={() => cancelBookingModal(booking?._id)}
                          >
                            Cancel & Refund
                          </DropdownItem>
                        ))}
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisplayBookings;

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
  Skeleton,
  Select,
  SelectItem,
  Pagination,
  useDisclosure,
} from '@nextui-org/react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoMdRefresh } from 'react-icons/io';
import toast from 'react-hot-toast';
import { useGetAllBookingsForGuideQuery } from '../../redux/slices/guide-getAllBookingsSlice';
import formatToINR from '../../utils/currencyFormatter';
import ContactUserModal from '../../common/ContactUserModal';

const GuideDisplayBookings = ({
  setIsRefreshing,
}: {
  setIsRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);
  const [sortBy, setSorBy] = useState<'latest' | 'oldest'>('latest');
  const [status, setStatus] = useState<'confirmed' | 'cancelled'>('confirmed');

  const {
    data: bookingsData,
    isFetching,
    isError,
    isSuccess,
    refetch,
  } = useGetAllBookingsForGuideQuery({
    selectedDate,
    sortBy,
    status,
    page,
  });

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

  const { isOpen, onOpenChange } = useDisclosure();

  const [selectedUser, setSelectedUser] = useState<{ userName: string; email: string }>({
    userName: '',
    email: '',
  });

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
            <Skeleton className="h-[20px] w-[80px] rounded-md" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[40px] w-[80px] rounded-full" />
          </TableCell>
        </TableRow>
      )),
    []
  );

  return (
    <div className="flex flex-col gap-6 p-3">
      <h1 className="text-lg font-semibold text-primary">All Bookings</h1>

      <div className="flex flex-col gap-2 sm:flex sm:flex-row sm:items-end sm:gap-2">
        <Select
          label="Sort by"
          placeholder="Sort by"
          defaultSelectedKeys={[sortBy]}
          radius="lg"
          labelPlacement="outside"
          onChange={(event) => handleSelectChange(event.target.value as 'latest' | 'oldest')}
          className="sm:w-[400px] w-full self-center"
        >
          <SelectItem key="latest" value="latest">
            Latest
          </SelectItem>
          <SelectItem key="oldest" value="oldest">
            Oldest
          </SelectItem>
        </Select>

        <div className="flex gap-1 p-1 items-end">
          <div className="flex flex-col gap-2">
            <p className="text-black min-w-max text-sm">Filter by tour start date</p>
            <div className="border-1 rounded-md">
              <DatePicker selected={selectedDate} onChange={handleDateChange} showIcon />
            </div>
          </div>
          <Button size="sm" className="h-[36px]" onClick={() => setSelectedDate(null)}>
            Clear
          </Button>
        </div>

        <div className="flex sm:justify-end w-full gap-2 items-center">
          <Button
            variant="flat"
            color="success"
            onClick={() => {
              refetch();
              setIsRefreshing(true);
            }}
          >
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
          <TableColumn>TOUR COST</TableColumn>
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
                  <Chip size="sm" variant="shadow" className="bg-blue-900/80 text-white">
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
                  <p className="text-center">{formatToINR(booking?.totalCost)}</p>
                </TableCell>
                <TableCell>
                  <Button
                    className="bg-black text-white"
                    radius="full"
                    onClick={() => {
                      onOpenChange();
                      setSelectedUser({
                        userName: booking?.user?.userName,
                        email: booking?.user?.email,
                      });
                    }}
                  >
                    Contact
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <ContactUserModal isOpen={isOpen} onOpenChange={onOpenChange} selectedUser={selectedUser} />
    </div>
  );
};

export default GuideDisplayBookings;

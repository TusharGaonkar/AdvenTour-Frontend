/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-body-style */
import { useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Tabs,
  Tab,
  Image,
  Skeleton,
  Pagination,
} from '@nextui-org/react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoMdRefresh } from 'react-icons/io';
import { useGetToursForAdminQuery } from '../../redux/slices/admin-TourVerificationSlice';

const TourVerificationTable = ({ refetchStats }) => {
  const [status, setStatus] = useState<'verified' | 'unverified'>('verified');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {
    data: tours,
    isSuccess,
    isError,
    isFetching,
    refetch,
  } = useGetToursForAdminQuery({ status, page });
  const navigate = useNavigate();

  const handleClick = (tourID: string) => {
    navigate(`/admin/tours/${tourID}`);
  };

  useEffect(() => {
    if (tours) {
      const pageCount = tours.pagination.page ?? 1;
      const totalPageCount = tours.pagination.totalPages ?? 1;

      if (totalPageCount === 0) {
        setPage(1);
        setTotalPages(1);
      } else {
        setPage(pageCount);
        setTotalPages(totalPageCount);
      }
    }
  }, [tours]);

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong while fetching tours', {
        className: 'text-xs font-medium',
      });
    }
  }, [isError]);

  const handleTabChange = (key: 'verified' | 'unverified') => {
    setTotalPages(1);
    setPage(1);
    setStatus(key);
  };

  const RenderTableSkeleton = useCallback(() => {
    return Array.from({ length: 4 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton className="h-[65px] rounded-md" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] rounded-lg" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] rounded-lg" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] rounded-lg" />
        </TableCell>
        <TableCell>
          <div className="flex items-center justify-center">
            <Skeleton className="h-[20px] w-[30px] rounded-lg" />
          </div>
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] w-[70px] rounded-md" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[40px] w-[100px] rounded-full" />
        </TableCell>
      </TableRow>
    ));
  }, []);

  return (
    <div className="flex flex-col gap-3 p-3">
      <h1 className="text-2xl font-bold text-primary">Tour Verification</h1>
      <div className="flex flex-col gap-3 sm:flex sm:items-center sm:flex-row sm:justify-between">
        <Button
          onClick={() => {
            refetch();
            refetchStats();
          }}
          variant="flat"
          color="success"
          className="max-w-max"
        >
          <span>
            <IoMdRefresh size={20} />
          </span>
          Refresh Data
        </Button>
        <Tabs
          variant="solid"
          aria-label="Filter tours"
          selectedKey={status}
          onSelectionChange={(key) => handleTabChange(key as 'verified' | 'unverified')}
        >
          <Tab key="verified" title="Verified Tours" />
          <Tab key="unverified" title="Unverified Tours" />
        </Tabs>
      </div>
      <Table
        aria-label="Tour validation table"
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
          <TableColumn>TOUR COVER</TableColumn>
          <TableColumn>TOUR TITLE</TableColumn>
          <TableColumn>SUBMITTED BY </TableColumn>
          <TableColumn>SUBMISSION DATE</TableColumn>
          <TableColumn>VERIFIED BY ADMIN</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>REVIEW TOUR</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No tours found..">
          {isFetching && RenderTableSkeleton()}
          {isSuccess &&
            !isFetching &&
            tours?.data?.tourData?.map((tour: Record<string, unknown>) => (
              <TableRow key={tour._id as string}>
                <TableCell>
                  <Image src={tour.mainCoverImage as string} width={120} height={120} alt="cover" />
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <p className="break-words">{tour.title as string}</p>
                </TableCell>
                <TableCell>{(tour.createdBy as Record<string, string>).email as string}</TableCell>
                <TableCell>
                  <Chip size="sm" color="default" variant="bordered">
                    {format(parseISO(tour.submissionDate as string), 'dd MMM yyyy, hh:mm aaa')}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <Chip size="sm" color="warning" variant="flat">
                      {tour.isVerified === true ? 'Yes' : 'Not verified'}
                    </Chip>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start justify-start">
                    <Chip
                      size="sm"
                      className={
                        tour.isAccepted === true
                          ? 'bg-green-500 text-white border-1'
                          : 'bg-red-500 text-white border-1'
                      }
                      variant="shadow"
                    >
                      {tour.isAccepted === true ? 'Accepted' : 'Rejected'}
                    </Chip>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    size="md"
                    className="bg-black  text-white rounded-full"
                    onClick={() => handleClick(tour._id)}
                  >
                    {tour.isVerified === true ? 'View Tour' : 'Approve Tour'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TourVerificationTable;

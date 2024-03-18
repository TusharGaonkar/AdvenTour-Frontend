/* eslint-disable no-underscore-dangle */
import { Progress, Input, Button, Pagination, Skeleton } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BookmarksCard from '../features/Bookmarks/BookmarkCard';
import { useGetAllBookmarksQuery } from '../redux/slices/bookmarkTourSlice';
import NavBar from '../common/Navbar';
import CustomMobileNavigation from '../common/CustomMobileNavigation';
import useDebounce from '../hooks/useDebounce';
import noResultImage from '/juicy-girl-and-boy-searching-for-the-right-files.gif';
import CustomProgressiveImage from '../common/CustomProgressiveImage';

const RenderSkeleton = () => (
  <>
    <Skeleton className="w-full h-[280px] rounded-xl " />
    <Skeleton className="w-full h-[280px] rounded-xl" />
    <Skeleton className="w-full h-[280px] rounded-xl" />
    <Skeleton className="w-full h-[280px] rounded-xl" />
    <Skeleton className="w-full h-[280px] rounded-xl" />
    <Skeleton className="w-full h-[280px] rounded-xl" />
  </>
);
const BookmarksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const {
    data: bookmarkedTours,
    isLoading,
    isError,
    error,
    isSuccess,
    isFetching,
  } = useGetAllBookmarksQuery({
    searchString: searchQuery,
    page,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || 'Something went wrong...', {
        className: 'font-medium text-xs',
      });
    }
  }, [error?.data?.message, isError]);

  const [inputValue, setInputValue] = useState('');
  const debouncedSetSearchQuery = useDebounce(setSearchQuery, 400);

  const resetInputValue = () => {
    setSearchQuery('');
    setInputValue('');
  };

  const handleInputChange = (input: string) => {
    setMaxPages(1);
    setPage(1);
    setInputValue(input);
    debouncedSetSearchQuery(input);
  };

  useEffect(() => {
    if (!isFetching && isSuccess) {
      const pages = bookmarkedTours?.pagination?.totalPages || 0;
      const currentPage = bookmarkedTours?.pagination?.currentPage || 0;
      setMaxPages(pages);
      setPage(currentPage);
    }
  }, [isFetching, isSuccess, bookmarkedTours?.pagination]);

  return (
    <>
      <Progress
        isIndeterminate={isLoading}
        className="w-screen overflow-hidden"
        aria-label="progress"
        size="sm"
        color="danger"
      />
      <NavBar />
      <div className="flex flex-col max-w-5xl mx-auto gap-7 mb-10 p-2">
        <p className="text-xl font-semibold">My Bookmarks</p>
        <div className="flex gap-2 items-baseline justify-start">
          <Input
            type="text"
            label="Search bookmarks"
            labelPlacement="outside"
            className="md:w-1/3"
            placeholder="Search tours in bookmarks"
            onChange={(event) => handleInputChange(event.target.value)}
            value={inputValue}
          />
          <Button color="primary" variant="flat" onClick={() => resetInputValue()}>
            Clear
          </Button>
        </div>
        {isSuccess && bookmarkedTours?.data?.bookmarks?.length > 0 && (
          <p className="text-sm font-semibold text-slate-500">
            Found {bookmarkedTours?.data?.bookmarks?.length} bookmarks
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isFetching && <RenderSkeleton />}
          {isSuccess && !isFetching && bookmarkedTours?.data?.bookmarks?.length === 0 && (
            <div className="flex items-center gap-2 flex-col col-span-full">
              <p className="font-semibold text-xl tet-slate-200">No bookmarks found!</p>
              <CustomProgressiveImage
                src={noResultImage}
                alt="no-result"
                className="w-[1/4] object-cover overflow-hidden"
              />
            </div>
          )}

          {isSuccess &&
            !isFetching &&
            bookmarkedTours?.data?.bookmarks?.map((bookmark: Record<string, unknown>) => (
              <BookmarksCard key={bookmark.tour._id as string} bookmark={bookmark} />
            ))}
        </div>
        {maxPages > 0 && !isFetching && isSuccess && (
          <Pagination
            showControls
            total={maxPages}
            page={page}
            onChange={setPage}
            className="self-center"
          />
        )}
      </div>
      <CustomMobileNavigation />
    </>
  );
};

export default BookmarksPage;

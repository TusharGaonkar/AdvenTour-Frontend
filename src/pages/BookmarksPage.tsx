import { useEffect } from 'react';
import { Spinner, Divider, Progress } from '@nextui-org/react';
import BookmarksCard from '../features/Bookmarks/BookmarkCard';
import { useGetAllBookmarksQuery } from '../redux/slices/bookmarkTourSlice';
import NavBar from '../common/Navbar';

const BookmarksPage = () => {
  const { data: bookmarkedTours, isLoading, isError, error } = useGetAllBookmarksQuery();
  return (
    <>
      <Progress
        isIndeterminate={isLoading}
        className="w-screen overflow-hidden"
        aria-label="progress"
        size="sm"
        color="danger"
      />
      <div className="flex flex-col max-w-5xl mx-auto gap-7">
        <NavBar />
        <p className="text-xl font-semibold">
          My Bookmarks <span>({bookmarkedTours?.data?.bookmarks?.length})</span>
        </p>
        <Divider />
        <div className="flex flex-wrap items-center justify-start gap-6">
          {isLoading && <Spinner size="lg" color="danger" className="w-screen h-[55vh]" />}
          {bookmarkedTours?.data?.bookmarks?.map((bookmark: Record<string, unknown>) => (
            <BookmarksCard key={bookmark._id as string} bookmark={bookmark} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookmarksPage;

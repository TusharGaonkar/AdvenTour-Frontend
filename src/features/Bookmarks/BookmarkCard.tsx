import { CardHeader, Card, CardFooter, Image, Button } from '@nextui-org/react';
import { format, parseISO } from 'date-fns';
import { CiBookmarkCheck } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { useDeleteBookmarkMutation } from '../../redux/slices/bookmarkTourSlice';

const BookmarksCard = ({ bookmark }: { bookmark: Record<string, unknown> }) => {
  const { createdAt } = bookmark;
  const { title, mainCoverImage, _id } = bookmark.tour || {};
  const [deleteBookmark] = useDeleteBookmarkMutation();

  const navigate = useNavigate();

  const handleDelete = async (id: string, title: string) => {
    try {
      const response = await deleteBookmark({ tourId: id, invalidate: ['Bookmarks', 'Tours'] });
      if (response?.error) throw new Error('Something went wrong while deleting bookmark');
      toast.success('Removed tour from bookmark', {
        className: 'text-xs font-semibold',
      });
    } catch (error) {
      toast.error('Something went wrong while deleting bookmark', {
        className: 'text-xs font-semibold',
      });
    }
  };

  const handleModal = (id: string, title: string) => {
    swal({
      title: 'Remove Bookmark?',
      text: 'Are you sure you want to remove ' + title + ' from your bookmarks?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) handleDelete(id, title);
    });
  };

  return (
    <Card isFooterBlurred className="w-[320px] h-[280px] col-span-12 sm:col-span-7 shadow-lg">
      <CardHeader className="absolute z-10 flex flex-row items-center justify-start gap-2 top-1">
        <h4 className="text-xl font-semibold text-white/90">{title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 object-cover w-full h-full"
        src={mainCoverImage}
      />
      <CardFooter className="absolute bottom-0 z-10 bg-black/40 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex items-center flex-grow gap-2">
          <CiBookmarkCheck className="text-2xl text-white" />
          <div className="flex flex-col">
            <p className="text-white text-tiny">Bookmarked on</p>
            <p className="text-tiny text-white/60">
              {`${format(parseISO(createdAt as string), 'dd MMM yyyy ')}`}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1">
          <MdDelete
            className="text-2xl cursor-pointer text-slate-200"
            onClick={() => handleModal(_id as string, title as string)}
          />
          <Button
            radius="full"
            size="sm"
            className="text-white bg-accent"
            onClick={() => navigate(`/tours/${_id}`)}
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookmarksCard;

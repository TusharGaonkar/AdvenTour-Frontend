import { IoMdShareAlt } from 'react-icons/io';
import { FaRegHeart } from 'react-icons/fa';

const BookMarkTour = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <FaRegHeart className="text-2xl" />
      <IoMdShareAlt className="text-3xl" />
    </div>
  );
};

export default BookMarkTour;

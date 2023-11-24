import { Card, CardBody, Image, Button, Divider } from '@nextui-org/react';
import { FaRegHeart } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';

const TourCard = () => (
  <Card className='flex flex-row items-center self-start'>
    <CardBody className=''>
      <div className='flex flex-row items-start'>
        <div className='w-[280px] h-[260px] overflow-hidden rounded-xl'>
          <Image
            alt='image'
            src='https://source.unsplash.com/random'
            height={290}
            width={280}
            className='object-cover w-full'
          />
        </div>

        <div className='flex flex-col items-start gap-6 p-4'>
          <div className='flex flex-row items-start gap-6'>
            <div className='flex flex-col items-start gap-4'>
              <h1 className='text-xl font-bold'>Netravati Island River diving and Scubadiving</h1>
              <p className='text-sm text-slate-400'>Karwar,Karnataka</p>
              <StarRatings
                rating={4}
                starRatedColor='orange'
                starDimension='20px'
                starSpacing='3px'
              />
            </div>

            <div className='flex flex-col items-end'>
              <p className='text-sm font-semibold text-slate-600 min-w-max'>Starting from </p>
              <p className='text-2xl font-semibold text-violet-600'>₹1200/person</p>
            </div>
          </div>
          <Divider />
          <div className='flex flex-row items-center self-stretch justify-center gap-2'>
            <div className='p-4 cursor-pointer border-slate-300 border-1'>
              <FaRegHeart />
            </div>
            <Button color='primary' className='w-full py-6 rounded-md'>
              View Details
            </Button>
          </div>
        </div>
      </div>
    </CardBody>
  </Card>
);

export default TourCard;

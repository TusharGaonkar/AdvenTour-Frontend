// eslint-disable-next-line import/order
import NavBar from '../features/AdventourLandingPage/Navbar';
import { tour } from './test';
import { Chip, Divider, Image } from '@nextui-org/react';
import StarRating from 'react-star-ratings';
import { MdOutlineRecommend } from 'react-icons/md';
import { IoMdShareAlt } from 'react-icons/io';
import { FaRegHeart } from 'react-icons/fa';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { IoIosPeople } from 'react-icons/io';
import { MdOutlineTimeline } from 'react-icons/md';
import { IoMdTime } from 'react-icons/io';
import { RiSpeakFill } from 'react-icons/ri';
import { MdOutlineTour } from 'react-icons/md';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Button, Input } from '@nextui-org/react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import dottedLine from '../../public/noun-dotted-line-19125.png';
import swigglyLine from '../../public/swigglyline.png';
import zigLine from '../../public/zig.png';

const TourTitle = () => {
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="text-3xl font-semibold">{tour.title}</h1>
      <p className="text-sm underline text-slate-400">By Tushar Gaonkar</p>

      <div className="flex items-center justify-center gap-2">
        <StarRating rating={4.5} starRatedColor="orange" starDimension="20px" starSpacing="3px" />
        <p className="text-sm font-semibold text-slate-600">(4.5/5)</p>
        <p className="text-sm underline">103 Reviews</p>
        <div className="flex items-center gap-1">
          <MdOutlineRecommend className="text-xl text-red-500" />
          <p className="text-sm underline">Recommended by 10 users</p>
        </div>
      </div>
    </div>
  );
};

const BookMarkTour = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <FaRegHeart className="text-2xl" />
      <IoMdShareAlt className="text-3xl" />
    </div>
  );
};

const RenderTourImages = () => {
  const images = [
    'https://media2.thrillophilia.com/images/photos/000/050/054/original/1539406781_original_1072567361.jpg?gravity=center&width=1280&height=642&crop=fill&quality=auto&fetch_format=auto&flags=strip_profile&format=jpg&sign_url=true',
    'https://qph.cf2.quoracdn.net/main-qimg-7c1241976e1c427f600b2c7c5c244a3b-lq',
    'https://www.fabhotels.com/blog/wp-content/uploads/2018/02/shutterstock_780660901.jpg',
  ];

  return (
    <PhotoProvider>
      <div className="flex flex-row gap-3 h-[440px] cursor-pointer ">
        <div className="overflow-hidden rounded-xl">
          <PhotoView key={Math.random()} src={images[0]}>
            <Image src={images[0]} alt="" className="w-full object-cover h-[440px]" />
          </PhotoView>
        </div>

        <div className="flex flex-col gap-2 h-[440px]">
          <div className="overflow-hidden rounded-xl">
            <PhotoView key={Math.random()} src={images[1]}>
              <Image src={images[1]} alt="" className="object-cover " />
            </PhotoView>
          </div>
          <div className="overflow-hidden rounded-xl">
            <PhotoView key={Math.random()} src={images[2]}>
              <img src={images[2]} alt="" className="object-cover" />
            </PhotoView>
          </div>
        </div>
      </div>
    </PhotoProvider>
  );
};

const TourDescription = () => {
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="font-semibold text-md"> About</h1>
      <p>{tour.description} </p>
      <p>
        from <span className="text-2xl font-semibold">₹{tour.priceInRupees}</span> per adult (price
        varies by group size)
      </p>
    </div>
  );
};

const TourQuickInfo = () => (
  <div className="flex flex-col items-start gap-3">
    <Chip variant="flat" color="default" startContent={<IoIosPeople className="text-2xl" />}>
      {`Age group: ${tour.ageGroups.minAge} - ${tour.ageGroups.maxAge}`}
    </Chip>
    <Chip color="default" variant="flat" startContent={<MdOutlineTimeline className="text-2xl" />}>
      {`Tour duration : ${tour.duration} Days`}
    </Chip>
    <Chip variant="flat" color="default" startContent={<MdOutlineTour className="text-2xl" />}>
      {`Tour difficulty: ${tour.tourDifficulty}`}
    </Chip>
    <Chip color="default" variant="flat" startContent={<IoMdTime className="text-2xl" />}>
      {`Tour start time : ${tour.tourStartTime}`}
    </Chip>
    <Chip color="default" variant="flat" startContent={<RiSpeakFill className="text-2xl" />}>
      {`Tour guide languages : ${tour.liveGuideLanguages.join(', ')}`}
    </Chip>
  </div>
);

const TourDetailedInfo = () => {
  return (
    <Accordion variant="splitted" selectionMode="multiple">
      <AccordionItem
        key="1"
        aria-label="Accordion 1"
        title="What's included"
        className="font-semibold "
      >
        <div className="flex flex-col gap-3">
          {tour.whatsIncluded.map((item) => (
            <Chip
              color="success"
              variant="flat"
              startContent={<RiCheckboxCircleLine className="text-2xl" />}
            >
              {item}
            </Chip>
          ))}
        </div>
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Accordion 2"
        title="What's not included"
        className="font-semibold"
      >
        <div className="flex flex-col gap-2">
          {tour.whatsNotIncluded.map((item) => (
            <Chip
              color="danger"
              variant="flat"
              startContent={<IoIosCloseCircleOutline className="text-2xl" />}
            >
              {item}
            </Chip>
          ))}
        </div>
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Accordion 3"
        title="Additional information"
        className="font-semibold"
      >
        <p className="font-normal">{tour.additionalInformation}</p>
      </AccordionItem>
      <AccordionItem key="5" aria-label="Accordion 3" title="FAQ" className="font-semibold">
        <div className="flex flex-col gap-4">
          {tour.FAQ.map(({ question, answer }, index) => {
            return (
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{`${index + 1}. ${question}`}</p>
                <p className="font-normal">{answer}</p>
              </div>
            );
          })}
        </div>
      </AccordionItem>
      <AccordionItem
        key="4"
        aria-label="Accordion 3"
        title="Cancellation policy"
        className="font-semibold"
      >
        <p className="font-normal">{tour.cancellationPolicy}</p>
      </AccordionItem>
    </Accordion>
  );
};

const BookTour = () => {
  return (
    <div className="flex flex-col gap-3 rounded-sm">
      <Input type="date"></Input>
      <div className="border-2 ">Hey</div>
      <Button color="warning">Book Now</Button>
    </div>
  );
};

const Timeline = () => {
  let activityCount = 0;
  return (
    <div className="flex flex-col items-start">
      {tour.itinerary.map((day) => (
        <>
          <h1 className="font-bold text-md">Day {day.day}</h1>
          {day.activities.map((activity, index, array) => (
            <div className="flex flex-row ml-4">
              <div className="flex flex-col items-center">
                <div class="flex items-center justify-center">
                  <div class="w-10 h-10 flex items-center justify-center text-white bg-black rounded-full">
                    <h1 class="text-xl">{++activityCount}</h1>
                  </div>
                </div>
                <div className="w-[80px] h-full">
                  <img
                    src={index == array.length - 1 ? swigglyLine : dottedLine}
                    className="object-center w-auto h-full "
                  />
                </div>
              </div>
              <div className="mt-1">
                <h1 className="text-sm font-semibold">{activity.place}</h1>
                <p>{activity.activityName}</p>
                {activity.image && (
                  <div className="h-[120px] overflow-hidden rounded-xl">
                    <Image
                      src={activity.image}
                      alt={activity.activityName}
                      className="object-cover"
                    />
                  </div>
                )}

                {index == array.length - 1 && (
                  <div className="flex flex-col gap-2 mt-2">
                    <Chip size="sm" className="text-white bg-green-700" variant="flat">
                      <p className="font-semibold">{`Accommodation for Day ${day.day} : ${day.accommodationIncluded}`}</p>
                    </Chip>
                    <Chip size="sm" variant="flat">
                      <p className="font-semibold">{`Food included:${day.foodIncluded}`}</p>
                    </Chip>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      ))}
    </div>
  );
};
const Itinerary = () => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 10,
  });
  const token =
    'pk.eyJ1IjoidHVzaGFyZGciLCJhIjoiY2xwOGQxbmozMms3bzJrczRla2wzZDk1aiJ9.Gj3D87Qq2LxjfYlt-ARpxA';
  return (
    <>
      <h1 className="font-semibold">Detailed itinerary</h1>
      <div className="grid w-full grid-cols-3 gap-6 p-4 mx-auto">
        <Timeline />
        <div className="col-span-2">
          <Map
            mapboxAccessToken={token}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/outdoors-v12"
          >
            <Marker longitude={-122.4} latitude={37.8} anchor="bottom" />
          </Map>
        </div>
      </div>
    </>
  );
};
const TourDetailsPage = () => (
  <div className="flex flex-col max-w-6xl mx-auto gap-7">
    <NavBar />
    <div className="flex items-start justify-between">
      <TourTitle />
      <BookMarkTour />
    </div>

    <RenderTourImages />
    <div className="grid items-start grid-cols-2">
      <div className="flex flex-col gap-7">
        <TourDescription />
        <Divider />
        <TourQuickInfo />
        <Divider />
        <TourDetailedInfo />
      </div>

      <div className="sticky top-20">
        <BookTour />
      </div>
    </div>
    <Divider />
    <Itinerary />
  </div>
);

export default TourDetailsPage;

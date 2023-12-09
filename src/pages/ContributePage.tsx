import NavBar from '../common/Navbar';
import { Button, Input } from '@nextui-org/react';
import useCustomMultiForm from '../hooks/useCustomMultiForm';
import TourBriefForm from '../features/ContributeTour/TourBriefForm';
import TourImagesForm from '../features/ContributeTour/TourImagesForm';

const ContributeMultiStepForm = () => {
  const items = [
    {
      label: 'Tour Brief',
      content: <TourBriefForm />,
    },
    {
      label: 'Add Tour Images',
      content: <TourImagesForm />,
    },
  ];
  const { activeIndex, activeItem, isStart, isEnd, handleNext, handlePrev } =
    useCustomMultiForm(items);

  return (
    <div className="flex flex-col items-center justify-center min-w-full gap-6">
      <h1 className="text-xl font-bold">{activeItem.label}</h1>
      <form className="flex flex-col w-full gap-5">{activeItem.content}</form>
      <div className="flex justify-end min-w-full gap-3">
        <Button onClick={handlePrev} disabled={isStart}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={isEnd}>
          Next
        </Button>
      </div>
    </div>
  );
};

const ContributePage = () => {
  return (
    <div className="flex flex-col w-full max-w-5xl gap-6 mx-auto">
      <NavBar />
      <h1 className="text-xl font-bold">Add a new tour</h1>
      <ContributeMultiStepForm />
    </div>
  );
};

export default ContributePage;

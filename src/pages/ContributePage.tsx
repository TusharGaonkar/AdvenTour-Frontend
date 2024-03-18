import { useState } from 'react';
import { Progress } from '@nextui-org/react';
import ContributeMultiStepForm from '../features/ContributeTour/ContributeMultiStepForm';
import NavBar from '../common/Navbar';
import CustomMobileNavigation from '../common/CustomMobileNavigation';

const ContributePage = () => {
  const [status, setStatus] = useState(false);
  return (
    <>
      <Progress
        size="sm"
        isIndeterminate={status}
        aria-label="Loading..."
        className="w-full overflow-hidden"
        color="danger"
      />
      <NavBar />
      <div className="flex flex-col w-full max-w-5xl gap-6 mx-auto">
        <h1 className="text-lg md:text-xl font-semibold mx-4">Add a new tour</h1>
        <ContributeMultiStepForm setStatus={setStatus} />
      </div>
      <CustomMobileNavigation />
    </>
  );
};

export default ContributePage;

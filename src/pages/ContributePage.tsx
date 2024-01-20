import ContributeMultiStepForm from '../features/ContributeTour/ContributeMultiStepForm';
import NavBar from '../common/Navbar';

const ContributePage = () => (
  <div className="flex flex-col w-full max-w-5xl gap-6 mx-auto">
    <NavBar />
    <h1 className="text-xl font-bold">Add a new tour</h1>
    <ContributeMultiStepForm />
  </div>
);

export default ContributePage;

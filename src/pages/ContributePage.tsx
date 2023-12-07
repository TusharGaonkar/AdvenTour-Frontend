import NavBar from '../common/Navbar';

const ContributePage = () => {
  return (
    <div className="flex flex-col w-full max-w-5xl gap-6 mx-auto">
      <NavBar />
      <h1 className="text-3xl font-bold">Add a new tour</h1>
    </div>
  );
};

export default ContributePage;

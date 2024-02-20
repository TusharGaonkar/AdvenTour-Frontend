import { Image, Button } from '@nextui-org/react';
import pageNotFound from '/business-3d-businessman-facepalming-over-a-page-not-found-error.png';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 items-center justify-center bg-secondary h-screen p-6">
      <h1 className="text-5xl font-bold">Server returned status 404</h1>
      <Image src={pageNotFound} alt="page not found" height={400} width={400} />
      <p className="text-2xl font-semibold">Page not found in AdvenTour!</p>
      <Button
        onClick={() => navigate('/')}
        variant="shadow"
        size="lg"
        className="bg-blue-500/90 rounded-full text-white"
      >
        Back to Home
      </Button>
    </div>
  );
};

export default PageNotFound;

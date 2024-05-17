import { useSelector } from 'react-redux';
import loginRedirect from '/loginredirect.gif';
import { Button, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import NavBar from './Navbar';
import CustomMobileNavigation from './CustomMobileNavigation';

const LoginPrompt = ({ title, redirectPath }: { title: string; redirectPath?: string }) => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <section className="flex flex-col items-center justify-center mt-40 sm:mt-40  gap-3 p-4">
        <Image
          src={loginRedirect}
          alt={title || 'Please Login'}
          width={200}
          className="object-cover"
        />
        <p className="text-sm sm:text-lg font-semibold text-slate-600 text-center">
          Please login to view {title}
        </p>
        <Button
          variant="shadow"
          color="danger"
          className="uppercase rounded-full text-white font-semibold"
          onClick={() => navigate(redirectPath ? `/login?redirect=${redirectPath}` : '/login')}
        >
          Login
        </Button>
      </section>
      <CustomMobileNavigation />
    </>
  );
};

const CheckAuthentication = ({
  children,
  title,
  redirectPath,
}: {
  children: React.ReactNode;
  title: string;
  redirectPath: string;
}) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.userInfo);
  return isLoggedIn ? children : <LoginPrompt title={title} redirectPath={redirectPath} />;
};

export default CheckAuthentication;

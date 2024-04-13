import { useSelector } from 'react-redux';
import loginredirect from '/loginredirect.gif';
import { Button, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import NavBar from './Navbar';

const LoginPrompt = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <section className="flex flex-col items-center justify-center mt-40 sm:mt-40  gap-3 p-4">
        <Image
          src={loginredirect}
          alt={title || 'Please Login'}
          width={200}
          className="object-cover"
        />
        <p className="text-sm sm:text-lg font-semibold text-slate-600">
          Please login to view {title}
        </p>
        <Button
          variant="shadow"
          color="danger"
          className="uppercase rounded-full text-white font-semibold"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </section>
    </>
  );
};

const CheckAuthentication = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.userInfo);
  return isLoggedIn ? children : <LoginPrompt title={title} />;
};

export default CheckAuthentication;

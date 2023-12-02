import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './store';
import LoginForm from '../pages/loginForm';
import SignupForm from '../pages/SignUpForm';
import AdventourLandingPage from '../pages/AdventourLandingPage';
import ToursPage from '../pages/ToursPage';
import TourDetailsPage from '../pages/TourDetailsPage';
import { reAuthenticate } from '../redux/slices/userSlice';
import '../index.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reAuthenticate());
  }, []); // when our app mounts , reauthenticate users if there is a token in the cookie!!

  return (
    <NextUIProvider>
      <Routes>
        <Route path="/" element={<AdventourLandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/tours/:id" element={<TourDetailsPage />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </NextUIProvider>
  );
}

export default App;

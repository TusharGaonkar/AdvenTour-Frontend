import { NextUIProvider } from '@nextui-org/react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LoginForm from '../pages/loginForm';
import SignupForm from '../pages/SignUpForm';
import AdventourLandingPage from '../pages/AdventourLandingPage';
import ToursPage from '../pages/ToursPage';
import TourDetailsPage from '../pages/TourDetailsPage';
import BookmarksPage from '../pages/BookmarksPage';
import ContributePage from '../pages/ContributePage';
import AdminLayout from '../pages/AdventourAdminPage';
import AdminLoginForm from '../pages/AdminLoginForm';
import Dashboard from '../features/AdventourAdminPage/Dashboard';
import Users from '../features/AdventourAdminPage/Users';
import AdminTourPreview from '../features/AdventourAdminPage/AdminTourPreview';
import { reAuthenticate } from '../redux/slices/userSlice';
import '../index.css';
import Payments from '../features/AdventourAdminPage/Payments';
import DisplayBookings from '../features/AdventourAdminPage/DisplayBookings';
import ProtectedAdminRoute from '../pages/ProtectedAdminRoute';
import PageNotFound from '../pages/PageNotFound';

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
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/admin/login" element={<AdminLoginForm />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/bookings" element={<DisplayBookings />} />
            <Route path="/admin/tours/:id" element={<AdminTourPreview />} />
          </Route>
        </Route>
        <Route path="/admin/bookings/paymentInfo/:paymentID" element={<Payments />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </NextUIProvider>
  );
}

export default App;

import { NextUIProvider } from '@nextui-org/react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import LoginForm from '../pages/LoginForm';
import SignupForm from '../pages/SignUpForm';
import AdventourLandingPage from '../pages/AdventourLandingPage';
import ToursPage from '../pages/ToursPage';
import TourDetailsPage from '../pages/TourDetailsPage';
import BookmarksPage from '../pages/BookmarksPage';
import ContributePage from '../pages/ContributePage';
import AdminLayout from '../pages/AdventourAdminPage';
import AdminLoginForm from '../pages/AdminLoginForm';
import Dashboard from '../features/AdventourAdminPage/AdminDashboard';
import Users from '../features/AdventourAdminPage/Users';
import AdminTourPreview from '../features/AdventourAdminPage/AdminTourPreview';
import { reAuthenticate } from '../redux/slices/userSlice';
import '../index.css';
import Payments from '../features/AdventourAdminPage/Payments';
import DisplayBookings from '../features/AdventourAdminPage/DisplayBookings';
import ProtectedAdminRoute from '../pages/ProtectedAdminRoute';
import PageNotFound from '../pages/PageNotFound';
import BookingsPage from '../pages/BookingsPage';
import GuideDashboard from '../pages/GuideDashboardPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' }); // consistent with tailwind breakpoint
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reAuthenticate());
  }, [dispatch]); // when our app mounts or when the page is refreshed check cookie authenticity!

  return (
    <NextUIProvider>
      <Routes>
        <Route path="/" element={<AdventourLandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/tours/:id" element={<TourDetailsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/dashboard" element={<GuideDashboard />} />
        <Route path="/admin/login" element={<AdminLoginForm />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
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
      <Toaster position={isMobile ? 'top-center' : 'top-right'} reverseOrder={false} />
    </NextUIProvider>
  );
}

export default App;

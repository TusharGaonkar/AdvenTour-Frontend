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
import '../index.css';

function App() {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdventourLandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignupForm />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/tours/:id" element={<TourDetailsPage />} />
          </Routes>
          <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
      </NextUIProvider>
    </Provider>
  );
}

export default App;

import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import LoginForm from './pages/loginForm';
import SignupForm from './pages/SignUpForm';
import AdventourLandingPage from './pages/AdventourLandingPage';
import ToursPage from './pages/ToursPage';

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdventourLandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/tours" element={<ToursPage />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;

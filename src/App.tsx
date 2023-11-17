import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import LoginForm from './pages/loginForm';
import SignupForm from './pages/SignUpForm';

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;

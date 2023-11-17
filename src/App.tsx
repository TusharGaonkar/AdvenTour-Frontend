import { NextUIProvider } from '@nextui-org/react';
import './index.css';
import LoginForm from './pages/loginForm';

function App() {
  return (
    <NextUIProvider>
      <LoginForm />
    </NextUIProvider>
  );
}

export default App;

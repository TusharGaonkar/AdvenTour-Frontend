import coolBoy from '/3d-casual-life-face-scan.png';
import { Input, Button } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';

const LoginForm = () => (
  <div className="flex flex-row justify-center bg-white rounded-lg bg-red p-7 md:flex-row">
    <div className="items-start justify-between p-12 md:flex md:flex-col">
      <div className="flex flex-col items-start gap-12">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Welcome back</h1>
        </div>
        <p className="max-w-lg text-lg">
          Sign in to your account to view your bookings , if you are a new user please
          <span>
            <NavLink to="/register" className="self-center ml-1 font-semibold text-orange-400">
              register here
            </NavLink>
          </span>
        </p>

        <div className="flex flex-col w-full gap-6">
          <Input
            isClearable
            type="email"
            label="Email"
            variant="bordered"
            placeholder="Enter your email"
          />
          <Input
            type="password"
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
          />

          <div className="flex flex-col">
            <NavLink to="#" className="self-center text-blue-500 text-[0.9em] font-semibold">
              Forgot Password?
            </NavLink>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <Button isLoading={false} className="text-[0.937rem] p-7 bg-[#e77b98]">
            Login
          </Button>
        </div>
        <div className="w-full">
          <div className="w-full h-[0.3px] bg-slate-500"></div>

          <h2 className="mt-2 text-xs text-center text-blue-100 text-slate-500"> Or login with </h2>
          <div className="flex flex-col mt-6 space-y-3 md:flex-row md:space-y-0 md:space-x-3">
            <button className="w-full p-3 border border-gray-500 rounded-xl hover:ring-2 hover:ring-white">
              <div className="flex flex-row items-center justify-center space-x-3">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
                  alt=""
                  className="object-cover w-10"
                />
                <span>Facebook</span>
              </div>
            </button>
            <button className="w-full p-3 border border-gray-500 rounded-xl hover:ring-2 hover:ring-white">
              <div className="flex flex-row items-center justify-center space-x-3">
                <img
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
                  alt=""
                  className="object-cover w-10"
                />
                <span>Google</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="md:flex md:flex-col md:justify-center md:items-center md:p-4 md:mt-6 bg-black w-[30rem] hidden md:rounded-lg">
      <img src={coolBoy} alt="cool boy" className="self-center hidden object-cover w-96 md:block" />
    </div>
  </div>
);

export default LoginForm;

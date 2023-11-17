import coolBoy from '/3d-casual-life-face-scan.png';

const LoginForm = () => (
  <div className="flex flex-row items-center w-screen h-screen text-black">
    <div className="flex flex-col w-full bg-red-500 rounded-lg bg-red p-7 md:flex-row md:justify-evenly md:space-x-3">
      <div>
        <h1 className="text-4xl font-bold">Log In</h1>
        <p className="mt-2">Login in to your account to view your bookings! </p>

        <div className="flex flex-col w-full mt-6 space-y-3">
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-4 shadow-sm placeholder:text-slate-400 bg-slate-700 shadow-gray-950"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="p-4 shadow-sm placeholder:text-slate-400 bg-slate-700 shadow-gray-950"
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-5 space-y-3">
          <a href="#" className="text-blue-100">
            Forgot Password?
          </a>
          <button className="w-full p-4 font-semibold transition-all duration-100 shadow-lg bg-rose-200 shadow-rose-300 text-gray-950 hover:translate-y-1 hover:scale-105 hover:bg-rose-400 hover:shadow-none rounded-xl">
            Login
          </button>
        </div>

        <div className="w-full h-[0.3px] bg-slate-500 mt-7"></div>

        <h2 className="mt-2 text-xs text-center text-blue-100"> Or Login With </h2>
        <div className="flex flex-col mt-6 space-y-3 md:flex-row md:space-y-0 md:space-x-3">
          <button className="w-full p-3 border border-gray-500 hover:ring-2 hover:ring-white">
            <div className="flex flex-row items-center justify-center space-x-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
                alt=""
                className="object-cover w-10"
              />
              <span>Facebook</span>
            </div>
          </button>
          <button className="w-full p-3 border border-gray-500 hover:ring-2 hover:ring-white">
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

      <div className="p-4 mt-6 bg-black">
        <img
          src={coolBoy}
          alt="image-by-!ouch"
          className="self-center hidden object-cover w-96 md:block"
        />
      </div>
    </div>
  </div>
);

export default LoginForm;

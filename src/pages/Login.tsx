import config from "../config/config.json";
import SocialIcons from "../components/SocialIcons";
import WalkingIcon from "../assets/images/walking.png";

const Login = () => {
  return (
    <div className="bg-primary">
      <div className="text-secondary flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-80px)] gap-10 p-8">
        {/* Left - Login Form */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          <span className="font-bold text-[32px]">{config?.text[0]}</span>
          <span className="text-center font-bold text-xs">
            New user?{" "}
            <span className="text-textColor font-semibold text-xs">
              Create an account
            </span>
          </span>
          <input
            type="text"
            placeholder="Username or email"
            className="p-2 border border-secondary focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-secondary focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-8 h-8 border border-secondary"
            />
            <span className="text-secondary font-semibold text-xs">
              Keep me signed in
            </span>
          </div>
          <button className="bg-secondary text-white p-3 hover:opacity-90">
            Sign In
          </button>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm font-semibold text-gray-700">
              Or Sign In With
            </span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <SocialIcons />
        </div>

        {/* Right - Image */}
        <div className="hidden md:block">
          <img
            src={WalkingIcon}
            alt="Login Illustration"
            className="max-w-md h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

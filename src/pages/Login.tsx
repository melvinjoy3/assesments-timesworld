import Header from "../components/header/Header";
import config from "../config/config.json";

const Login = () => {
  return (
    <div className="bg-primary">
      <Header />
      <div className="text-secondary flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-6 p-8">
        <span className="font-bold text-[32px]">{config?.text[0]}</span>
        <div className="flex flex-col gap-4 w-full max-w-md">
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
          <button className="bg-secondary text-white p-3 rounded-lg hover:opacity-90">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

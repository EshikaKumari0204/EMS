import Loginleft from "./Loginleft";
import { ArrowLeftIcon, EyeOffIcon, EyeIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ title, subtitle, role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen">
      <Loginleft />

      {/* Right Panel */}
      <div className="flex justify-center items-center w-full min-h-screen md:w-1/2 px-6 sm:px-12 py-12">
        <div className="flex flex-col gap-5 w-full max-w-md">

          {/* Back link */}
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-amber-500 transition-colors w-fit"
          >
            <ArrowLeftIcon size={16} />
            <span>Back to Portal</span>
          </Link>

          {/* Heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700">
              {title}
            </h1>
            <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleForm}>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>

           
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 pr-11 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>

           
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg py-3 flex justify-center items-center gap-2 transition-colors duration-200"
            >
              {loading && <Loader2Icon className="animate-spin h-4 w-4" />}
              Sign In
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

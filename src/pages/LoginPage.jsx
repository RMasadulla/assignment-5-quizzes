import { Link } from "react-router-dom";
import Saly1 from "../assets/Saly-1.png";
import LoginForm from "../components/auth/LoginForm";
import { Logo } from "../components/Icons";

export default function LoginPage() {
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      <div className="flex min-h-screen">
        {/* <!-- Left side --> */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
          <div className="text-white">
            <img src={Saly1} alt="Illustration" className="mx-auto" />

            <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
            <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
            <p className="mb-8">
              Logging in unlocks your personal progress tracker, letting you
              evaluate your performance and see how you stack up against others.
              Whether you're preparing for exams, improving your knowledge, or
              simply having fun, there's no better way to sharpen your mind.
            </p>
          </div>
        </div>

        {/* <!-- Right side --> */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
              <span>Welcome to</span>
              <Link to="/">
                <Logo customStyle="h-7" color="#7D49F8" />
              </Link>
            </h2>
            <h1 className="text-5xl font-bold mb-8">Sign in</h1>

            <LoginForm />

            <div className="text-center mt-3">
              <Link to="/forgot_password" className="text-primary">
                Forgot Password
              </Link>
            </div>

            <div className="mt-8">
              <p className="text-center">
                No Account ?{" "}
                <Link to="/register" className="text-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

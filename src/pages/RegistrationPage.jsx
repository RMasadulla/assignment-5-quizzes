import { Link, NavLink } from "react-router-dom";
import Saly1 from "../assets/Saly-1.png";
import RegisterForm from "../components/common/RegisterForm";
import { Logo } from "../components/Icons";

export default function RegistrationPage() {
  return (
    <div className="bg-white text-gray-800 ">
      <div className="flex min-h-screen max-h-screen">
        <div className="hidden  lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12  h-full fixed left-0 top-0">
          <div className="text-white">
            <NavLink to="/">
              <Logo customStyle="h-8" color="white" />
            </NavLink>
            <img
              src={Saly1}
              alt="Illustration"
              className="mx-auto 2xl:ml-0 max-h-64  max-w-lg"
            />

            <h2 className="text-3xl font-bold mb-1">Sign Up Now</h2>
            <p className="text-xl mb-4 font-medium">
              Boost Your Learning Capabilities
            </p>
            <p className="mb-8 max-w-lg">
              Logging in unlocks your personal progress tracker, letting you
              evaluate your performance and see how you stack up against others.
              Whether you're preparing for exams, improving your knowledge, or
              simply having fun, there's no better way to sharpen your mind.
            </p>
          </div>
        </div>

        <div className="fixed right-0 top-0 w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-6 lg:p-8 xl:p-12 overflow-y-auto xl:overflow-hidden">
          <div className="w-full max-w-lg ">
            <h2 className="text-3xl font-bold mb-3 flex gap-2 items-center">
              <span>Welcome to</span>
              <Link to="/">
                <Logo customStyle="h-7" color="#7D49F8" />
              </Link>
            </h2>
            <h1 className="text-4xl font-bold mb-6">Sign Up</h1>

            <RegisterForm />

            <div className="mt-2 text-gray-400">
              <p className="text-center">
                Already have account ?{" "}
                <Link to="/login" className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

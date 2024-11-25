import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import AdminAvater from "../assets/avater.webp";
import AdminLogo from "../components/Icons";
import { useAuth } from "../hooks/useAuth";

export default function Admin() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const Logout = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <aside className="w-64 bg-primary p-6 flex flex-col">
        <div className="mb-10">
          <AdminLogo customStyle="h-7" color="white" />
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="#"
                className="block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold"
              >
                Quizzes
              </NavLink>
            </li>

            <li>
              <NavLink
                to="#"
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Settings
              </NavLink>
            </li>

            <li>
              <NavLink
                to="#"
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Manage Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="#"
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Manage Roles
              </NavLink>
            </li>

            <li>
              <button
                onClick={Logout}
                className="block w-full text-start py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <div className="mt-auto flex items-center">
          <img
            src={AdminAvater}
            alt="Mr Hasan"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <span className="text-white font-semibold">
            {auth?.user?.full_name}
          </span>
        </div>
      </aside>

      <main className="flex-grow p-10">
        {auth?.user && auth?.user?.role === "admin" ? (
          <Outlet />
        ) : (
          <Navigate to="/login" replace />
        )}
      </main>
    </div>
  );
}

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Logo } from "../Icons";

export default function Header() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const Logout = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center mb-12 mt-1">
      <NavLink to="/">
        <Logo customStyle="h-7" color="#7D49F8" />
      </NavLink>
      {auth?.user ? (
        <div>
          <button onClick={Logout}>
            <span
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
              style={{ fontFamily: "Jaro" }}
            >
              Logout
            </span>
          </button>
        </div>
      ) : (
        <div>
          <NavLink to="/login">
            <span
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
              style={{ fontFamily: "Jaro" }}
            >
              Login
            </span>
          </NavLink>
          <NavLink to="/register">
            <span
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
              style={{ fontFamily: "Jaro" }}
            >
              Register
            </span>
          </NavLink>
        </div>
      )}
    </header>
  );
}

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="mobile-nav-wrapper">
      <div className="mobile-nav">
        <div className="mobile-nav__left">
          <Link to="/" className="mobile-nav__item">
            Home
          </Link>

          <Link to="/my-reports" className="mobile-nav__item">
            Reports
          </Link>
        </div>

        <Link to="/create-issue" className="mobile-nav__center-button">
          +
        </Link>

        <div className="mobile-nav__right">
          <Link to="/map" className="mobile-nav__item">
            Map
          </Link>

          <Link to={user ? "/profile" : "/login"} className="mobile-nav__item">
            {user ? "Profile" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
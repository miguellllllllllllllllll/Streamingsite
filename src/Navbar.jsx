import { useState } from "react";
import { CiStreamOn } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, onLogout }) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleBurgerClick = () => {
    setIsActive(!isActive);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/homepage">
          <CiStreamOn /> Streamingsite
        </Link>

        <a
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive ? "true" : "false"}
          data-target="navbarBasicExample"
          onClick={handleBurgerClick}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link className="navbar-item" to="/category">
            Categories
          </Link>
          <Link className="navbar-item" to="/movie/550">
            Beispiel-Film
          </Link>
          <Link className="navbar-item" to="/report">
            Report an issue
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {isAuthenticated ? (
              <div className="buttons">
                <span className="navbar-item">
                  <img
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    alt="Profile"
                    style={{ borderRadius: "50%", width: "30px", height: "30px" }}
                  />
                </span>
                <button className="button is-light" onClick={handleLogoutClick}>
                  Logout
                </button>
              </div>
            ) : (
              <Link className="button is-primary" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

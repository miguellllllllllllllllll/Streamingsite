import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Link importieren

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const handleBurgerClick = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/homepage">
          {" "}
          {/* ✅ Hier Link statt <a> */}
          Streamingsite
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

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <Link className="navbar-item" to="/homepage">
            {" "}
            {/* ✅ Richtige Navigation */}
            Home
          </Link>

          <Link className="navbar-item" to="/documentation">
            Documentation
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <Link className="navbar-item" to="/movies">
                Movies
              </Link>
              <Link className="navbar-item is-selected" to="/series">
                Series
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>
              <hr className="navbar-divider" />
              <Link className="navbar-item" to="/report">
                Report an issue
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end"></div>
      </div>
    </nav>
  );
}

export default Navbar;

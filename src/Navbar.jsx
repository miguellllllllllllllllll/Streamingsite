import { useState } from "react";
import { CiStreamOn } from "react-icons/ci";
import { Link } from "react-router-dom"; // WICHTIG: Link importieren!

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const handleBurgerClick = () => {
    setIsActive(!isActive);
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
          </Link>{" "}
          {/* Beispiel-Film (Fight Club) */}
          <Link className="navbar-item" to="/report">
            Report an issue
          </Link>{" "}
          {/* Beispiel-Serie (Game of Thrones) */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

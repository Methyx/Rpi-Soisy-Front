import { useState } from "react";
import { Link } from "react-router-dom";

// style
import "../style/menu-box.css";

const MenuBox = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="menu-box">
      <div
        className="nav-button"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <span
          className={isMenuOpen ? "nav-icon open" : "nav-icon close"}
        ></span>
      </div>
      <nav className={isMenuOpen ? "navigation open" : "navigation close"}>
        <ul className="nav-list">
          <li>
            <Link className="nav-link" to="/solitaire">
              Jeu de Cartes Solitaire
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/familyrock">
              Rock en famille
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/meteo">
              Meteo 48h
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuBox;

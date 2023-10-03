import { useLocation, useNavigate } from "react-router-dom";

import finger from "../assets/finger-pointing.png";

// style
import "./header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    Boolean(location.pathname !== "/") && (
      <div className="header">
        <div
          className="hands"
          onClick={() => {
            navigate("/");
          }}
        >
          <div className="🤚">
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="🌴"></div>
            <div className="👍"></div>
          </div>
          <div className="back-home">
            <img src={finger} alt="finger pointing" />
            <p>retour</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;

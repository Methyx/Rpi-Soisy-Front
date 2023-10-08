import { useLocation, useNavigate } from "react-router-dom";

import finger from "../assets/finger-pointing.png";

// functions
import getWindowSize from "../functions/getWindowSize";

// style
import "./header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const windowSize = getWindowSize();

  return (
    Boolean(location.pathname !== "/") && (
      <div className="header">
        <div
          className="hands"
          onClick={() => {
            navigate("/");
          }}
        >
          <div
            className="🤚"
            style={{ scale: Math.min(1, windowSize.width / 650).toString() }}
          >
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="👉"></div>
            <div className="🌴"></div>
            <div className="👍"></div>
          </div>
          <div className="back-home">
            <img src={finger} alt="finger pointing" />
            <p>Home</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;

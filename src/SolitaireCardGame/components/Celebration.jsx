// style
import "../style/celebration.css";

import confettis from "../img/confettis.gif";

const Celebration = () => {
  return (
    <div className="celebration">
      <img src={confettis} alt="confettis" />
      <h1>
        <span>B</span>
        <span>R</span>
        <span>A</span>
        <span>V</span>
        <span>O</span>
        <span>!</span>
        <span>!</span>
      </h1>
    </div>
  );
};

export default Celebration;

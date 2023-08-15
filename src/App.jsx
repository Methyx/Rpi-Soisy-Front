import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "./Home/page/Home";
import Solitaire from "./SolitaireCardGame/page/Solitaire";
import FamilyRock from "./FamilyRock/page/FamilyRock";

// style
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solitaire" element={<Solitaire />} />
        <Route path="/familyrock" element={<FamilyRock />} />
      </Routes>
    </Router>
  );
}

export default App;

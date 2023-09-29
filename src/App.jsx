import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "./Home/page/Home";
import Solitaire from "./SolitaireCardGame/page/Solitaire";
import FamilyRock from "./FamilyRock/page/FamilyRock";

// style
import "./App.css";
import MeteoPage from "./Meteo/Page/MeteoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solitaire" element={<Solitaire />} />
        <Route path="/familyrock" element={<FamilyRock />} />
        <Route path="/meteo" element={<MeteoPage />} />
      </Routes>
    </Router>
  );
}

export default App;

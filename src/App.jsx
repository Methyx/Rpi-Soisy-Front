import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "./Header/Header";
import Home from "./Home/page/Home";
import Solitaire from "./SolitaireCardGame/page/Solitaire";
import FamilyRock from "./FamilyRock/page/FamilyRock";
import MeteoPage from "./Meteo/Page/MeteoPage";

// style
import "./App.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Header />
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

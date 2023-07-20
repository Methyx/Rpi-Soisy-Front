import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "./Home/page/Home";

// style
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

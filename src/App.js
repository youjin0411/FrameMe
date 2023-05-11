import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './navbar/index';
import Main from "./pages/Mainstart";
import Wepcam from "./pages/Filming";
import ChoiceImg from "./pages/ChoiceImg"
import Photoshoot from "./pages/Photoshoot"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/photoshoot"
          element={
            <div>
              <Navbar />
              <Photoshoot /> {/* Main 페이지 */}
            </div>
          }
        />
        <Route
          path="/choiceimg"
          element={
            <div>
              <Navbar />
              <ChoiceImg /> {/* Main 페이지 */}
            </div>
          }
        />
        <Route path="/filming" element={<Wepcam />} />
      </Routes>
    </Router>
  );
}

export default App;
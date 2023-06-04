import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './navbar/index';
import Main from "./pages/Mainstart";
import Wepcam from "./pages/Filming";
import ChoiceImg from "./pages/ChoiceImg"
import Photoshoot from "./pages/Photoshoot"
import Frame from "./pages/Frame"
import ChoiceFrame from "./pages/Choiceframe"
import Write from "./pages/Write"
import Test from "./pages/Test"
import Gallery from "./pages/Gallery"
import SearchSave from "./pages/SearchSave"


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
        <Route path="/frame" element={
          <div>
          <Navbar />
          <Frame /> {/* Main 페이지 */}
        </div>
        } />
        <Route path="/ChoiceFrame" element={
          <div>
          <Navbar />
          <ChoiceFrame /> {/* Main 페이지 */}
        </div>
        } />
        <Route path="/Write" element={
          <div>
          <Navbar />
          <Write /> {/* Main 페이지 */}
        </div>
        } />

        <Route path="/Gallery" element={
          <div>
          <Navbar />
          <Gallery /> {/* Main 페이지 */}
        </div>
        } />

        <Route path="/SearchSave" element={
          <div>
          <Navbar />
          <SearchSave /> {/* Main 페이지 */}
        </div>
        } />

        <Route path="/filming" element={<Wepcam />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
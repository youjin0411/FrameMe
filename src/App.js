import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './navbar/index';
import Main from "./pages/Mainstart";
import Wepcam from "./pages/Filming";
import ChoiceImg from "./pages/ChoiceImg"
import WebcamApp from "./pages/WebcamApp"
import WebcamApp2 from "./pages/WebcamApp2"
import Frame from "./pages/Frame"
import ChoiceFrame from "./pages/Choiceframe"
import Write from "./pages/Write"
import Test from "./pages/Test"
import Test2 from "./pages/Test2"
import Gallery from "./pages/Gallery"
import SearchSave from "./pages/SearchSave"
import Loding from "./pages/Loding"

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
              <WebcamApp /> {/* Main 페이지 */}
            </div>
          }
        />
        <Route
          path="/photoshoot2"
          element={
            <div>
              <Navbar />
              <WebcamApp2 /> {/* Main 페이지 */}
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
      <Route path="/Loding" element={
          <div>
          <Navbar />
          <Loding /> {/* Main 페이지 */}
        </div>
        } />

        <Route path="/filming" element={<Wepcam />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/Test2" element={<Test2 />} />
      </Routes>
    </Router>
  );
}

export default App;
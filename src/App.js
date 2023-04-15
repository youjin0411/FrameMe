import React from 'react';
// BroweRouter as Router는 라우터를 사용할 때 사용하는 컴포넌트로 라우터를 사용할 때는 무조건 이 컴포넌트를 사용해야 한다.
// 터미널에서 모듈 설치 : npm install react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './navbar/index';
import Main from "./pages/Mainstart";
import Wepcam from "./pages/Filming";
import ChoiceImg from "./pages/ChoiceImg"
import Imgpage from "./pages/Imagepage"

function App() {
    return (
      // 라우터는 하나의 컴포넌트로 감싸야 한다. 
      // 감싸지 않으면 라우터를 사용할 수 없다. 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/filming" element={<Wepcam />} />
          <Route path="/choiceimg" element={<ChoiceImg />} />
          <Route path="/image-page" element={<Imgpage />} />
        </Routes>
      </Router>
    );
}

export default App;
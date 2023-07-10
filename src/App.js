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
import ChoiceFrame2 from "./pages/Choiceframe2"
import Write from "./pages/Write"
import Write2 from "./pages/Write2"
import Test from "./pages/Test"
import Test2 from "./pages/Test2"
import Gallery from "./pages/Gallery"
import SearchSave from "./pages/SearchSave"
import Loding from "./pages/Loding"
import Result from "./pages/Result"
import Result2 from "./pages/Result2"

function App() {
  return (
    <Router basename={'https://youjin0411.github.io/Frame-Me'}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/photoshoot" element={
            <div> <Navbar /> <WebcamApp /></div>
          }/>
        <Route path="/photoshoot2" element={ 
            <div> <Navbar /> <WebcamApp2 /></div>
          }/>
        <Route path="/choiceimg" element={ 
            <div> <Navbar /> <ChoiceImg /></div>
          }/>
        <Route path="/frame" element={ 
            <div> <Navbar /> <Frame /></div>
          }/>
        <Route path="/ChoiceFrame" element={ 
            <div> <Navbar /> <ChoiceFrame /></div>
          }/>
        <Route path="/ChoiceFrame2" element={ 
            <div> <Navbar /> <ChoiceFrame2 /></div>
          }/>
        <Route path="/Write" element={ 
            <div> <Navbar /> <Write /></div>
          }/>
        <Route path="/Write2" element={ 
            <div> <Navbar /> <Write2 /></div>
          }/>
        <Route path="/Gallery" element={ 
            <div> <Navbar /> <Gallery /></div>
          }/>
        <Route path="/SearchSave" element={ 
            <div> <Navbar /> <SearchSave /></div>
          }/>
        <Route path="/Loding" element={ 
            <div> <Navbar /> <Loding /></div>
          }/>
        <Route path="/Result" element={ 
            <div> <Navbar /> <Result /></div>
          }/>
        <Route path="/Result2" element={ 
            <div> <Navbar /> <Result2 /></div>
          }/>
        <Route path="/filming" element={<Wepcam />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/Test2" element={<Test2 />} />
      </Routes>
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import '../main.css';
import choose2 from '../img/Vector1.png';
import Frameh1 from "../img/frameh1.png";
import Frameh2 from "../img/frameh2.png";
import Frameh3 from "../img/frameh3.png";
import Frameh4 from "../img/frameh4.png";
import Frameh5 from "../img/frameh5.png";
import Frameh6 from "../img/frameh6.png";
import Frameh7 from "../img/frameh7.png";
import Frameh8 from "../img/frameh8.png";
import Frameh9 from "../img/frameh9.png";
import Frameh10 from "../img/frameh10.png";
import { useNavigate } from "react-router-dom";

function Choiceframe() {

  const navigate = useNavigate();
  
  function handleClick() {
     navigate("/write");
  }

  const [selectedFrame, setSelectedFrame] = useState(null);

  const handleFrameClick = (frameId) => {
    setSelectedFrame(frameId);
  };

  const getDisplayStyle = (frameId) => {
    return selectedFrame === frameId ? 'block' : 'none';
  };

  const getBackgroundImage = () => {
    if (selectedFrame === 'f1') {
      localStorage.setItem('selectedImages', JSON.stringify(Frameh1));
      return `url(${Frameh1})`;
    }
    if (selectedFrame === 'f2') {
      localStorage.setItem('selectedImages', JSON.stringify(Frameh2));
      return `url(${Frameh2})`;
    }
    if (selectedFrame === 'f3') {
      localStorage.setItem('selectedImages', JSON.stringify(Frameh3));
      return `url(${Frameh3})`;
    }
    if (selectedFrame === 'f4') {
      localStorage.setItem('selectedImages', JSON.stringify(Frameh4));
      return `url(${Frameh4})`;
    }
    if (selectedFrame === 'f5') {
      localStorage.setItem('selectedImages', JSON.stringify(Frameh5));
      return `url(${Frameh5})`;
    }
    if (selectedFrame === 'f6') {
      localStorage.setItem('selectedImages', JSON.stringify(Frameh6));
      return `url(${Frameh6})`;
    }
    if (selectedFrame === 'f7') {
      localStorage.setItem('selectedImages', JSON.stringify(Frameh7));
      return `url(${Frameh7})`;
    }
    if (selectedFrame === 'f8') {
      localStorage.setItem('selectedImages', JSON.stringify(Frameh8));
      return `url(${Frameh8})`;
    }
    if (selectedFrame === 'f9') {
      localStorage.setItem('selectedImages', JSON.stringify(Frameh9));
      return `url(${Frameh9})`;
    }
    if (selectedFrame === 'f10') {
      localStorage.setItem('selectedImages', JSON.stringify(Frameh10));
      return `url(${Frameh10})`;
    }
  };

  const frameImgStyle = {
    backgroundImage: getBackgroundImage(),
  };

  const style2 = {
    width: 219.98, 
    height: 140.77,
    backgroundSize: 'cover'
  }

  const storedImages = JSON.parse(localStorage.getItem('selectedImages')) || [];

  return (
    <div>
      <h1>프레임을 선택해주세요</h1>
      <div id="frameimg" style={frameImgStyle}>
        <div id="photoboxw1"></div>
        <div id="photoboxw2"></div>
        <div id="photoboxw3"></div>
        <div id="photoboxw4"></div>
      </div>
      <div style={{position: 'absolute', display: 'grid',left: 268, top: 290, gridRowGap: 10, rowGap: 10}}>
      <div style={{ ...style2, backgroundImage: `url(${storedImages[0]})` }} />
      <div style={{ ...style2, backgroundImage: `url(${storedImages[1]})` }} />
      <div style={{ ...style2, backgroundImage: `url(${storedImages[2]})` }} />
      <div style={{ ...style2, backgroundImage: `url(${storedImages[3]})` }} />
      </div>
      <div id="fragr">
        <div className="fragr" id="f1" onClick={() => handleFrameClick('f1')}>
          <img
            src={choose2}
            width="95"
            height="95"
            alt="click"
            style={{
              display: getDisplayStyle('f1'),
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              marginBottom: "50%",
            }}
          />
        </div>
        <div className="fragr" id="f2" onClick={() => handleFrameClick('f2')}>
          <img
            src={choose2}
            width="95"
            height="95"
            alt="click"
            style={{
              display: getDisplayStyle('f2'),
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              marginBottom: "50%",
            }}
          />
        </div>
        <div className="fragr" id="f3" onClick={() => handleFrameClick('f3')}>
          <img
            src={choose2}
            width="95"
            height="95"
            alt="click"
            style={{
              display: getDisplayStyle('f3'),
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              marginBottom: "50%",
            }}
          />
        </div>
        <div className="fragr" id="f4" onClick={() => handleFrameClick('f4')}>
          <img
            src={choose2}
            width="95"
            height="95"
            alt="click"
            style={{
              display: getDisplayStyle('f4'),
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              marginBottom: "50%",
            }}
          />
        </div>
        <div className="fragr" id="f5" onClick={() => handleFrameClick('f5')}>
          <img
            src={choose2}
            width="95"
            height="95"
            alt="click"
            style={{
              display: getDisplayStyle('f5'),
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              marginBottom: "50%",
            }}
          />
        </div>
        <div className="fragr" id="f6" onClick={() => handleFrameClick('f6')}>
          <img
            src={choose2}
            width="95"
            height="95"
            alt="click"
            style={{
              display: getDisplayStyle('f6'),
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              marginBottom: "50%",
            }}
          />
        </div>
        <div className="fragr" id="f7" onClick={() => handleFrameClick('f7')}>
          <img
            src={choose2}
            width="95"
            height="95"
            alt="click"
            style={{
              display: getDisplayStyle('f7'),
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              marginBottom: "50%",
            }}
          />
        </div>
        <div className="fragr" id="f8" onClick={() => handleFrameClick('f8')}>
          <img
            src={choose2}
            width="95"
            height="95"
            alt="click"
            style={{
              display: getDisplayStyle('f8'),
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              marginBottom: "50%",
            }}
          />
        </div>
        <div className="fragr" id="f9" onClick={() => handleFrameClick('f9')}>
          <img
            src={choose2}
            width="95"
            height="95"
            alt="click"
            style={{
              display: getDisplayStyle('f9'),
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              marginBottom: "50%",
            }}
          />
        </div>
        <div className="fragr" id="f10" onClick={() => handleFrameClick('f10')}>
          <img
            src={choose2}
            width="95"
            height="95"
            alt="click"
            style={{
              display: getDisplayStyle('f10'),
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              marginBottom: "50%",
            }}
          />
        </div>
        <button id="button" style={{
          position: 'absolute',
          borderRadius: '30px',
          width: '196px',
          height: '60px',
          left: '1633px',
          top: '980px',
          backgroundBlendMode: 'overlay',
          background: 'white'
        }} onClick={handleClick}
        >
        다음&nbsp;&nbsp;&nbsp;〉
        </button>
      </div>
    </div>
  );

}

export default Choiceframe;
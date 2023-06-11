import React, { useState } from 'react';
import '../main.css';
import choose2 from '../img/Vector1.png';
import Framew1 from "../img/framew1.png";
import Framew2 from "../img/framew2.png";
import Framew3 from "../img/framew3.png";
import Framew4 from "../img/framew4.png";
import Framew5 from "../img/framew5.png";
import Framew6 from "../img/framew6.png";
import Framew7 from "../img/framew7.png";
import Framew8 from "../img/framew8.png";
import Framew9 from "../img/framew9.png";
import Framew10 from "../img/framew10.png";
import { useNavigate } from "react-router-dom";

function Choiceframe2() {
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

  const getFrameImage = () => {
    if (selectedFrame === 'f1') {
      localStorage.setItem('selectedFrame', JSON.stringify(Framew1));
      return Framew1;
    }
    if (selectedFrame === 'f2') {
      localStorage.setItem('selectedFrame', JSON.stringify(Framew2));
      return Framew2;
    }
    if (selectedFrame === 'f3') {
      localStorage.setItem('selectedFrame', JSON.stringify(Framew3));
      return Framew3;
    }
    if (selectedFrame === 'f4') {
      localStorage.setItem('selectedFrame', JSON.stringify(Framew4));
      return Framew4;
    }
    if (selectedFrame === 'f5') {
      localStorage.setItem('selectedFrame', JSON.stringify(Framew5));
      return Framew5;
    }
    if (selectedFrame === 'f6') {
      localStorage.setItem('selectedFrame', JSON.stringify(Framew6));
      return Framew6;
    }
    if (selectedFrame === 'f7') {
      localStorage.setItem('selectedFrame', JSON.stringify(Framew7));
      return Framew7;
    }
    if (selectedFrame === 'f8') {
      localStorage.setItem('selectedFrame', JSON.stringify(Framew8));
      return Framew8;
    }
    if (selectedFrame === 'f9') {
      localStorage.setItem('selectedFrame', JSON.stringify(Framew9));
      return Framew9;
    }
    if (selectedFrame === 'f10') {
      localStorage.setItem('selectedFrame', JSON.stringify(Framew10));
      return Framew10;
    }
  };

  const frameImgStyle = {
    backgroundImage: `url(${getFrameImage()})`,
  };

  const style2 = {
    width: 219.98,
    height: 140.77,
    backgroundSize: 'cover',
  };

  const storedFrame = JSON.parse(localStorage.getItem('selectedFrame')) || [];

  return (
    <div>
      <h1>프레임을 선택해주세요</h1>
      <div id="frameimg" style={frameImgStyle}></div>
      <div style={{ position: 'absolute', display: 'grid', left: 268, top: 290, gridRowGap: 10, rowGap: 10 }}>
        <div style={{ ...style2, backgroundImage: `url(${storedFrame[0]})` }} />
        <div style={{ ...style2, backgroundImage: `url(${storedFrame[1]})` }} />
        <div style={{ ...style2, backgroundImage: `url(${storedFrame[2]})` }} />
        <div style={{ ...style2, backgroundImage: `url(${storedFrame[3]})` }} />
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

export default Choiceframe2;
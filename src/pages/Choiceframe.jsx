import React, { useState } from 'react';
import '../main.css';
import choose2 from '../img/Vector1.png';
import frame5 from "../img/frame5.png";
import Mainframe1 from "../img/Mainframe1.png";
import Mainframe2 from "../img/Mainframe2.png";
import Mainframe3 from "../img/Mainframe3.png";
import Mainframe4 from "../img/Mainframe4.png";
import Mainframe5 from "../img/Mainframe5.png";
import Mainframe6 from "../img/Mainframe6.png";
import Mainframe7 from "../img/Mainframe7.png";
import Mainframe8 from "../img/Mainframe8.png";
import Mainframe9 from "../img/Mainframe9.png";
import Mainframe10 from "../img/Mainframe10.png";

function Choiceframe() {
  const [selectedFrame, setSelectedFrame] = useState(null);

  const handleFrameClick = (frameId) => {
    setSelectedFrame(frameId);
  };

  const getDisplayStyle = (frameId) => {
    return selectedFrame === frameId ? 'block' : 'none';
  };

  const getBackgroundImage = () => {
    if (selectedFrame === 'f1') {
      return `url(${Mainframe1})`;
    }
    if (selectedFrame === 'f2') {
      return `url(${Mainframe2})`;
    }
    if (selectedFrame === 'f3') {
      return `url(${Mainframe3})`;
    }
    if (selectedFrame === 'f4') {
      return `url(${Mainframe4})`;
    }
    if (selectedFrame === 'f5') {
      return `url(${Mainframe5})`;
    }
    if (selectedFrame === 'f6') {
      return `url(${Mainframe6})`;
    }
    if (selectedFrame === 'f7') {
      return `url(${Mainframe7})`;
    }
    if (selectedFrame === 'f8') {
      return `url(${Mainframe8})`;
    }
    if (selectedFrame === 'f9') {
      return `url(${Mainframe9})`;
    }
    if (selectedFrame === 'f10') {
      return `url(${Mainframe10})`;
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
      <div id="frameimg" style={frameImgStyle}></div>
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
        }}
        >
        다음&nbsp;&nbsp;&nbsp;〉
        </button>
      </div>
    </div>
  );

}

export default Choiceframe;

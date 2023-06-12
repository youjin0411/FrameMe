import React, { useState, useEffect } from 'react';
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
import styled from 'styled-components';
import { grayscaleFilter, brightnessFilter,originalFilter } from './filters.js';

function useCanvasRefs(count) {
  const [canvasRefs, setCanvasRefs] = useState([]);

  useEffect(() => {
    setCanvasRefs(Array.from({ length: count }, () => React.createRef()));
  }, [count]);

  return canvasRefs;
}

function Choiceframe() {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [isHovering3, setIsHovering3] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handleMouseOver2 = () => {
    setIsHovering2(true);
  };
  const handleMouseOut2 = () => {
    setIsHovering2(false);
  };
  const handleMouseOver3 = () => {
    setIsHovering3(true);
  };
  const handleMouseOut3 = () => {
    setIsHovering3(false);
  };
  
  function handleClick() {
    const updatedStoredImages = [...storedImages];
  
    canvasRefs.forEach((canvasRef, index) => {
      const canvas = canvasRef.current;
      const filteredImageSrc = canvas.toDataURL();
      updatedStoredImages[index] = filteredImageSrc;
    });
  
    localStorage.setItem('selectedImages', JSON.stringify(updatedStoredImages));
    navigate("/write", { state: frameimage});
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
      return `url(${Frameh1})`;
    }
    if (selectedFrame === 'f2') {
      return `url(${Frameh2})`;
    }
    if (selectedFrame === 'f3') {
      return `url(${Frameh3})`;
    }
    if (selectedFrame === 'f4') {
      return `url(${Frameh4})`;
    }
    if (selectedFrame === 'f5') {
      return `url(${Frameh5})`;
    }
    if (selectedFrame === 'f6') {
      return `url(${Frameh6})`;
    }
    if (selectedFrame === 'f7') {
      return `url(${Frameh7})`;
    }
    if (selectedFrame === 'f8') {
      return `url(${Frameh8})`;
    }
    if (selectedFrame === 'f9') {
      return `url(${Frameh9})`;
    }
    if (selectedFrame === 'f10') {
      return `url(${Frameh10})`;
    }
  };

  const frameImgStyle = {
    backgroundImage: getBackgroundImage(),
  };

  const frameimage = getBackgroundImage()

  const style2 = {
    width: 221, 
    height: 140.77,
    backgroundSize: 'cover'
  }

  const storedImages = JSON.parse(localStorage.getItem('selectedImages')) || [];
  const canvasRefs = useCanvasRefs(storedImages.length);  

const applyFilter = (filterFunction) => {
  const updatedStoredImages = [...storedImages];

  canvasRefs.forEach((canvasRef, index) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.onload = () => {
      canvas.width = 219.98;
      canvas.height = 140.77;
      ctx.drawImage(image, 0, 0, 219.98, 140.77);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const imageCopy = new ImageData(imageData.width, imageData.height);
      imageCopy.data.set(imageData.data);

      filterFunction(imageCopy);

      ctx.putImageData(imageCopy, 0, 0);

      const filteredImageSrc = canvas.toDataURL();
      updatedStoredImages[index] = filteredImageSrc;
    };
    image.src = storedImages[index];
  });
  localStorage.setItem('selectedImages', JSON.stringify(storedImages));
};

// 필터 버튼 클릭 시 적용할 필터 함수
const handleFilterButtonClick = (filterFunction) => {
  applyFilter(filterFunction);
};
  return (
    <div>
      <h1>프레임을 선택해주세요</h1>
      <div id="frameimg" style={frameImgStyle}>
      </div>
      <div style={{ position: 'absolute', display: 'grid', left: 268.8, top: 290.7, gridRowGap: 8.5, rowGap: 8.5 }}>
      {storedImages.map((imageSrc, index) => (
        <canvas key={index} ref={canvasRefs[index]} style={{ ...style2, backgroundImage: `url(${imageSrc})` }} />
      ))}
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
              marginTop: "-738px",
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
              marginTop: "-738px",
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
              marginTop: "-738px",
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
              marginTop: "-738px",
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
              marginTop: "-738px",
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
              marginTop: "-738px",
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
              marginTop: "-738px",
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
              marginTop: "-738px",
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
              marginTop: "-738px",
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
              marginTop: "-738px",
              marginBottom: "50%",
            }}
          />
        </div>
      </div>

      <Btn style={{left: 938, backgroundColor: isHovering ? "#FFFAE0" : "white"}}        
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          brightnessFilter
          onClick={() => { handleFilterButtonClick(brightnessFilter)}}
      >밝게</Btn>
      <Btn style={{left: 1230, backgroundColor: isHovering2 ? "#FFFAE0" : "white"}}
          onMouseOver={handleMouseOver2}
          onMouseOut={handleMouseOut2}
          onClick={() => { handleFilterButtonClick(grayscaleFilter) }}
      >흑백</Btn>
      <Btn style={{left: 1525, backgroundColor: isHovering3 ? "#FFFAE0" : "white"}}
          onMouseOver={handleMouseOver3}
          onMouseOut={handleMouseOut3}
          onClick={() => handleFilterButtonClick(originalFilter)}
      >원본</Btn>

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
  );
}

const Btn = styled.button`
  position: absolute;
  width: 196px;
  height: 60px;
  top: 719px;
  background: white;
  background-blend-mode: overlay;
  border-radius: 30px;
  background: white;
  outline: none;
  border: none;
  box-shadow: -5px 5px 30px 2px rgb(239, 239, 239);
`
export default Choiceframe;
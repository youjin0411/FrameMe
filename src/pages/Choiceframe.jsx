import React, { useState, useEffect } from 'react';
import '../main.css';
import choose2 from '../img/Vector1.png';
import Frameh1 from "../img/이미지/frame_1.png";
import Frameh2 from "../img/이미지/frame2_1.png";
import Frameh3 from "../img/이미지/frame3_1.png";
import Frameh4 from "../img/이미지/frame4_1.png";
import Frameh5 from "../img/이미지/frame5_1.png";
import Frameh6 from "../img/이미지/frmae6_1.png";
import Frameh7 from "../img/이미지/frame7_1.png";
import Frameh8 from "../img/이미지/frame8_1.png";
import Frameh9 from "../img/이미지/frame9_1.png";
import Frameh10 from "../img/이미지/frame10_1.png";
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
  const [buttonColor, setButtonColor] = useState('#BDBDBD');
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
  
    navigate("/write", { state: frameimage});
  };

  const [selectedFrame, setSelectedFrame] = useState(null);

  const handleFrameClick = (frameId) => {
    setSelectedFrame(frameId);
    setButtonColor('#2B2B2B');
  };

  const getDisplayStyle = (frameId) => {
    return selectedFrame === frameId ? 'block' : 'none';
  };

  const getFrameImage = () => {
    if (selectedFrame === 'f1') {
      return Frameh1;
    }
    if (selectedFrame === 'f2') {
      return Frameh2;
    }
    if (selectedFrame === 'f3') {
      return Frameh3;
    }
    if (selectedFrame === 'f4') {
      return Frameh4;
    }
    if (selectedFrame === 'f5') {
      return Frameh5;
    }
    if (selectedFrame === 'f6') {
      return Frameh6;
    }
    if (selectedFrame === 'f7') {
      return Frameh7;
    }
    if (selectedFrame === 'f8') {
      return Frameh8;
    }
    if (selectedFrame === 'f9') {
      return Frameh9;
    }
    if (selectedFrame === 'f10') {
      return Frameh10;
    }
  };

  const frameImgStyle = {
    backgroundImage: getFrameImage() ? `url(${getFrameImage()})` : null,
  };

  const frameimage = getFrameImage()
  console.log(frameimage)

  const style2 = {
    width: 218, 
    height: 141,
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
      canvas.width = 220;
      canvas.height = 140;
      ctx.drawImage(image, 0, 0, 220, 140);
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
      <Text>프레임을 선택해주세요</Text>
      <div style={{margin:'0 auto', background:'white', width: 1820, height:967, backgroundBlendMode: 'overlay', borderRadius: '30px 30px 0px 0px',boxShadow: '0px 0px 49px 3px #F5F5F5'}}>
          <div id="frameimg" style={frameImgStyle}>
              <div style={{display: 'grid', gridTemplateColumns: '218px', gridRowGap: 7, rowGap: 7 , marginTop: 21, marginLeft: 21}}>
                  {storedImages.map((imageSrc, index) => (
                    <canvas key={index} ref={canvasRefs[index]} style={{ ...style2, backgroundImage: `url(${imageSrc})` }} />
                  ))}
              </div>
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
              opacity: "78%"
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
              opacity: "78%"
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
              opacity: "78%"
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
              opacity: "78%"
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
              opacity: "78%"
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
              opacity: "78%"
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
              opacity: "78%"
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
              opacity: "78%"
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
              opacity: "78%"
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
              opacity: "78%"
            }}
          />
        </div>
      </div>

      <Btn style={{left: 1022.5, backgroundColor: isHovering ? "#FFFAE0" : "white"}}        
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          brightnessFilter
          onClick={() => { handleFilterButtonClick(brightnessFilter)}}
      >밝게</Btn>
      <Btn style={{left: 1255, backgroundColor: isHovering2 ? "#FFFAE0" : "white"}}
          onMouseOver={handleMouseOver2}
          onMouseOut={handleMouseOut2}
          onClick={() => { handleFilterButtonClick(grayscaleFilter) }}
      >흑백</Btn>
      <Btn style={{left: 1473.5, backgroundColor: isHovering3 ? "#FFFAE0" : "white"}}
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
          background: 'white',
          color : buttonColor,
        }} onClick={handleClick}
        >
        다음&nbsp;&nbsp;&nbsp;〉
        </button> 
    </div>
    </div>
  );
}
const Text = styled.div`
    font-family: "Noto Serif";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    color: rgb(43, 43, 43);
    text-align: center;
    margin-bottom: 20px;
    margin-top: 40px;
}
`
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
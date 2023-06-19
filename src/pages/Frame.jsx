import React, { useState } from 'react';
import '../main.css';
import choose from '../img/Vector.png';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

function Frame() {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [intent, setIntent] = useState(-1);
  const [buttonColor, setButtonColor] = useState('#BDBDBD');

  const navigate = useNavigate();
  
  function photoshootintent() {
    if(intent === 1){
      navigate("/photoshoot");
    }else if(intent === 2){
      navigate("/photoshoot2")
    }else{
      
    }
  }
  const handleClick = (frameId) => {
    setSelectedFrame(frameId);
    setButtonColor('#2B2B2B');
  };

  const isImageVisible = (frameId) => {
    return selectedFrame === frameId;
  };

  return (
    <div>
      <Text>프레임을 선택해주세요</Text>
      <Background></Background>
      <div id="frame">
        <div
          id="fra1"
          onClick={() => {
            handleClick('c1')
            setIntent(1)
          }}
          style={{
            opacity: isImageVisible('c1') ? '100%' : '50%'
          }}
        >
          {isImageVisible('c1') && (
            <img
              src={choose}
              id="ch1"
              width="80"
              height="80"
              alt="click"
              style={{
                display: 'block',
                margin: '50% auto',
              }}
            />
          )}
        </div>
        <div
          id="fra2"
          onClick={() => {
            handleClick('c2')
            setIntent(2)
          }}
          style={{
            opacity: isImageVisible('c2') ? '100%' : '50%'
          }}
        >
          {isImageVisible('c2') && (
            <img
              src={choose}
              id="ch2"
              width="80"
              height="80"
              alt="click"
              style={{
                display: 'block',
                margin: '50% auto',
              }}
            />
          )}
        </div>
        <button
          id="button"
          style={{
            position: 'absolute',
            borderRadius: '30px',
            width: '196px',
            height: '60px',
            left: '1633px',
            top: '980px',
            backgroundBlendMode: 'overlay',
            background: 'white',
            color: buttonColor
          }} onClick={photoshootintent}
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
    color: #2B2B2B;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 20px;
`
const Background = styled.div`
    background: linear-gradient(297.97deg, rgba(255, 255, 255, 0.15) 6.99%, rgba(255, 255, 255, 0.35) 94.43%);
    box-shadow: 0px 4px 36px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(15px);
    border-radius: 30px 30px 0px 0px;
    margin: 0 auto;
    background: 'white';
    width: 1820px;
    height: 900px;
    left: 50px;
    top: 180px;
    background-blendMode: overlay;
`
export default Frame;
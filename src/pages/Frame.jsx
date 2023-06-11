import React, { useState } from 'react';
import '../main.css';
import choose from '../img/Vector.png';
import { useNavigate } from "react-router-dom";

function Frame() {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [intent, setIntent] = useState(-1);

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
  };

  const isImageVisible = (frameId) => {
    return selectedFrame === frameId;
  };

  return (
    <div>
      <h1>프레임을 선택해주세요</h1>
      <div
        style={{
          margin: '0 auto',
          background: 'white',
          width: 1820,
          height: 900,
          left: 50,
          top: 180,
          backgroundBlendMode: 'overlay',
          borderRadius: '30px 30px 0px 0px',
          boxShadow: '0px 0px 2px 2px #F5F5F5',
          marginTop: 70,
        }}
      ></div>
      <div id="frame">
        <div
          id="fra1"
          onClick={() => {
            handleClick('c1')
            setIntent(1)
          }}
          style={{
            // opacity: selectedFrame === 'c1' ? '100%' : undefined,
            opacity: intent===-1 ? '100%' : isImageVisible('c1') ? '100%' : '50%'
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
            //opacity: selectedFrame === 'c2' ? '100%' : undefined,
            opacity: intent===-1 ? '100%' : isImageVisible('c2') ? '100%' : '50%'
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
          }} onClick={photoshootintent}
        >
        다음&nbsp;&nbsp;&nbsp;〉
        </button>
      </div>
    </div>
  );
}

export default Frame;
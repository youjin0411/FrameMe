import React, { useState } from 'react';
import '../main.css';
import choose from '../img/Vector.png';

function Frame() {
  const [selectedFrame, setSelectedFrame] = useState(null);

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
          onClick={() => handleClick('c1')}
          style={{
            // opacity: selectedFrame === 'c1' ? '100%' : undefined,
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
          onClick={() => handleClick('c2')}
          style={{
            //opacity: selectedFrame === 'c2' ? '100%' : undefined,
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
          }}
        >
        다음&nbsp;&nbsp;&nbsp;〉
        </button>
      </div>
    </div>
  );
}

export default Frame;
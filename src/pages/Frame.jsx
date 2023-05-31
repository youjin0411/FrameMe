import React, { useState } from 'react';
import '../main.css';
import choose from '../img/Vector.png';
import { useEffect } from 'react';

function Frame() {
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [seconds, setSeconds] = useState(60);
  let temp = -1;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if(seconds === 0) {
      console.log("1분 지남");
    }
  }, [seconds]);

  const formatTime = (time) => {
    const minute = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minute.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  const handleClick = (frameId) => {
    setSelectedFrame(frameId);
    temp = 0;
  };

  const isImageVisible = (frameId) => {
    return selectedFrame === frameId;
    temp = 1;
  };

  return (
    <div>
      <h1>프레임을 선택해주세요</h1>
      <div id="frame">
        <div
          id="fra1"
          onClick={() => handleClick("c1")}
          style={{
            background: isImageVisible("c1") ? "black" : "gray",
            opacity: isImageVisible("c1") ? "70%" : "30%"
          }}
        >
          {isImageVisible("c1") && (
            <img
              src={choose}
              id="ch1"
              width="80"
              height="80"
              alt="click"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "50%",
                marginBottom: "50%",
              }}
            />
          )}
        </div>
        <div
          id="fra2"
          onClick={() => handleClick("c2")}
          style={{
            background: isImageVisible("c2") ? "black" : "gray",
            opacity: isImageVisible("c2") ? "70%" : "30%"
          }}
        >
          {isImageVisible("c2") && (
            <img
              src={choose}
              id="ch2"
              width="80"
              height="80"
              alt="click"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "50%",
                marginBottom: "50%",
              }}
            />
          )}
        </div>
      </div>
      <div id="count">{formatTime(seconds)}</div>
    </div>
  );
}

export default Frame;

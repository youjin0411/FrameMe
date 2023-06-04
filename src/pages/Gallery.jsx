import React, { useState, useEffect } from 'react';
import { gsap, Power1 } from "gsap";
import './gallery.css';
import pinkframe from '../img/pinkframe.png';
import charcoalframe from '../img/charcoalframe.png';
import skyblueframe from '../img/skyblueframe.png';
import yellowframe from '../img/yellowframe.png';
import frame1 from '../img/frame1.png';
import frame2 from '../img/frame2.png';
import frame3 from '../img/frame3.png';
import frame4 from '../img/frame4.png';
import frame5_1 from '../img/frame5-1.png';
import frame6_1 from '../img/frame6-1.png';
import Xicon from '../img/Xicon.png';
import backgroundImage from '../img/backgroundImage.png';

function Gallery() {
  const frames = [
    { image: frame1, comment: '유리언니의 전시기록' },
    { image: frame2, comment: '소리언니의 전시기록' },
    { image: frame3, comment: '유진언니의 전시기록' },
    { image: frame4, comment: '해원이의 전시기록' },
    { image: frame5_1, comment: '가윤이의 전시기록' },
    { image: frame6_1, comment: '프레임미 최고' }
  ];

  const [selectedFrame, setSelectedFrame] = useState(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const clonedFrames = [...frames, ...frames]; // 원본 요소를 복제하여 새로운 배열 생성

  const openPopup = (frame) => {
    setSelectedFrame(frame);
  };

  const closePopup = () => {
    setSelectedFrame(null);
  };
  
  const getClonedFrames = () => {
    return clonedFrames;
  };  

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    const currentDate = currentDateTime.toLocaleDateString('ko-KR');
    const currentTime = currentDateTime.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: false });
    const formattedDate = currentDate.replace('.', '');
    const formattedTime = currentTime.replace('오후', '').replace('오전', '');
    return { date: formattedDate, time: formattedTime };
  };

  useEffect(() => {
    function random(min, max) {
      return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    }    
  
    function UpDown(selector, delay, size){
      gsap.to(selector, random(1.5, 2.5), {
        y: size,
        repeat: -1,
        yoyo: true,
        ease: Power1.easeInOut,
        delay: random(0, delay)
      })
    }

    const slideInterval = setInterval(() => {
      setCurrentFrameIndex((prevIndex) => (prevIndex + 1) % clonedFrames.length);
    }, 3000);

    UpDown('.frame.position-1', 1, 15);
    UpDown('.frame.position-2', 0.5, 15);
    UpDown('.frame.position-3', 1.5, 20);
    UpDown('.frame.position-4', 0.5, 15);
    UpDown('.frame.position-5', 1.5, 20);
    UpDown('.frame.position-6', 0.5, 15);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div className='gallery'>
      <div className='bar'>
        <h1 className='text'>GALLERY</h1>
        <p className='barcomment'>사진을 눌러 큐알코드로 이미지를 다운받아보세요!</p>
        <div className='search'>
          <input type="text" placeholder='이름, 날짜, 시간 검색'></input>
        </div>
      </div>
      <div className="background">
        <div className="frames">
          {frames.map((frame, index) => (
            <div className={`container${index % 2 === 0 ? '' : '2'}`} key={index}>
              <div className={`frame position-${index + 1}`} onClick={() => openPopup(frame)}>
                <img src={frame.image} width="322" height="375" alt={`frame${index + 1}`} />
                <div className='comment'>{frame.comment}</div>
                <div className='day'>{getCurrentDateTime().date}</div>
                <div className='time'>{getCurrentDateTime().time}</div>
              </div>
            </div>
          ))}
          {clonedFrames.map((frame, index) => (
            <div className={`container${index % 2 === 0 ? '' : '2'}`} key={index}>
              <div className={`frame position-${index + 1}`} onClick={() => openPopup(frame)}>
                <img src={frame.image} width="322" height="375" alt={`frame${index + 1}`} />
                <div className='comment'>{frame.comment}</div>
                <div className='day'>{getCurrentDateTime().date}</div>
                <div className='time'>{getCurrentDateTime().time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFrame && (
        <div className="popup">
          <div className="popup-content">
            <img src={selectedFrame.image} width="590" height="684" alt="selected-frame" />
            <button className="close-button" onClick={closePopup}><img src={Xicon} width="15" height="15" alt="close"></img></button>
            <div className='comment'>{selectedFrame.comment}</div>
            <div className='day'>{getCurrentDateTime().date}</div>
            <div className='time' style={{ marginLeft: '50px' }}>{getCurrentDateTime().time}</div>
          </div>
          <div className='QR'></div>
        </div>
      )}
    </div>
  );
}

export default Gallery;

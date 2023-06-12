import React, { useState, useEffect } from 'react';
import { gsap, Power1 } from "gsap";
import './gallery.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import axios from 'axios'; 

import 'swiper/css';
import 'swiper/css/bundle';

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
import search from '../img/search-icon.png'
import backgroundImage from '../img/backgroundImage.png';

function Gallery() {
  const [data, setData] = useState(null);
  useEffect(() => {
      try {
        const response = axios.get("http://localhost:3001/api/select");
        response.then(response => {
          console.log("성공")
          setData(response.data);
        })
      } catch (error) {
        console.error("오류 발생:", error);
      }
  }, []);
  console.log(data)
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
  
    function UpDown(selector, delay, size) {
      gsap.to(selector, random(3, 4), {
        y: size,
        repeat: -1,
        yoyo: true,
        ease: Power1.easeInOut,
        delay: random(0, delay)
      });
    }
  
    const slideInterval = setInterval(() => {
      setCurrentFrameIndex((prevIndex) => (prevIndex + 1) % clonedFrames.length);
    }, 3000);
  
    const originalFrames = document.querySelectorAll('.frame');
    originalFrames.forEach((frame, index) => {
      UpDown(frame, 1 + index * 0.5, 5 + index * 3);
    });
  
    const clonedFrames = document.querySelectorAll('.clone');
    clonedFrames.forEach((frame, index) => {
      UpDown(frame, 1 + index * 0.5, 5 + index * 3);
    });
  
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
          <button className='searchBtn'><img src={search} width={48} height={39}></img></button>
        </div>
      </div>
      <div className="background">
        <div className="frames">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false
          }}
          slidesPerView={5.4}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {frames.map((frame, index) => (
            <SwiperSlide key={index}>
              <div className={`container`}>
                <div className={`frame position-${index + 1}`} onClick={() => openPopup(frame)}>
                  <img src={frame.image} width="322" height="375" alt={`frame${index + 1}`} />
                  <div className='comment'>{frame.comment}</div>
                  <div className='day'>{getCurrentDateTime().date}</div>
                  <div className='time'>{getCurrentDateTime().time}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
           {clonedFrames.map((frame, index) => (
            <SwiperSlide key={index}>
              <div className={`container`}>
                <div className={`frame position-${(index % frames.length) + 1}`} onClick={() => openPopup(frame)}>
                  <img src={frame.image} width="322" height="375" alt={`frame${index + 1}`} />
                  <div className='comment'>{frame.comment}</div>
                  <div className='day'>{getCurrentDateTime().date}</div>
                  <div className='time'>{getCurrentDateTime().time}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        </div>
      </div>

      {selectedFrame && (
        <div className="popup">
          <div className="popup-content">
            <img src={selectedFrame.image} width="590" height="684" alt="selected-frame" />
            <button className="close-button" onClick={closePopup} style={{ marginLeft: '8px' }}><img src={Xicon} width="22" height="22" alt="close"></img></button>
            <div className='comment p1'>{selectedFrame.comment}</div>
            <div className='day p2'>{getCurrentDateTime().date}</div>
            <div className='time p2' style={{ marginLeft: '50%' }}>{getCurrentDateTime().time}</div>
          </div>          
          <div className='QR'></div>
          <div className='back' onClick={closePopup}></div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
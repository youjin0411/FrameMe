import React, { useState, useEffect } from 'react';
import { gsap, Power1 } from "gsap";
import './gallery.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import { useNavigate, useLocation } from "react-router-dom"
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/bundle';
import Xicon from '../img/Xicon.png';
import searchs from '../img/search-icon.png'
import frame_s from '../img/frame_s.png'
import frame_y1 from '../img/frame_y1.png'
import frame_y2 from '../img/frame_y2.png'
import frame_h from '../img/frame_h.png'
import frame_g from '../img/frame_g.png'
import frame_me from '../img/frame_me.png'
function Gallery() {
  const navigate = useNavigate(); 
  
  const [search,setSearch] = useState(null)

  const [frames, setFrames] = useState(
    [
      {name: '유리', day: '2023.6.21', time: '9:38', qr: null, frame: frame_y2},
      {name: '뇸', day: '2023.6.21', time: '9:38', qr: null, frame: frame_s},
      {name: '유진', day: '2023.6.21', time: '9:38', qr: null, frame: frame_y1},
      {name: '해원', day: '2023.6.21', time: '9:38', qr: null, frame: frame_h},
      {name: '가윤', day: '2023.6.21', time: '9:38', qr: null, frame: frame_g},
      {name: '프레임미', day: '2023.6.21', time: '9:38', qr: null, frame: frame_me}
    ]
  );
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const clonedFrames = [...frames, ...frames]; // 원본 요소를 복제하여 새로운 배열 생성

  useEffect(() => {
    try {
      const response = axios.get("https://port-0-framemeserver-7xwyjq992llisq9g9j.sel4.cloudtype.app/select");
      response.then(response => {
        const newData = response.data.map(item => ({
          name: item.name,
          day: item.day,
          time: item.time,
          qr: item.qr,
          frame: item.frame
        }));
        console.log("ddfsf", newData);
        setFrames(frames => frames.concat(newData));
      });
    } catch (error) {
      console.error("오류 발생:", error);
    }
  }, []);
  
  
  const openPopup = (frame) => {
    setSelectedFrame(frame);
  };

  const closePopup = () => {
    setSelectedFrame(null);
  };
  const nextPage = () => {
    navigate("/SearchSave", { state: search});
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate("/SearchSave", { state: search });
    }
  };
  
  useEffect(() => {
    function random(min, max) {
      return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    }
    function UpDown(selector, delay, size) {
      gsap.to(selector, random(4, 5), {
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

  const handleSwiperInit = (swiper) => {
    const slideInterval = setInterval(() => {
      setCurrentFrameIndex((prevIndex) => (prevIndex + 1) % clonedFrames.length);
    }, 3000);
    swiper.autoplay.start();

    return () => {
      clearInterval(slideInterval);
    };
  };

  return (
    <div className='gallery'>
      <div className='bar'>
        <h1 className='text'>GALLERY</h1>
        <p className='barcomment'>사진을 눌러 큐알코드로 이미지를 다운받아보세요!</p>
        <div className='search'>
          <input
            type="text"
            placeholder='이름, 날짜, 시간 검색'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
          <button className='searchBtn'>
            <img src={searchs} width={48} height={39} alt='search-icon' onClick={nextPage} />
          </button>
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
            onSwiper={handleSwiperInit}
          >
            {frames.map((framee, index) => (
              <SwiperSlide key={index}>
                <div className={`container`}>
                  <div className={`frame position-${(index % 6) + 1}`} onClick={() => openPopup(framee)}>
                    <img src={framee.frame} width="300" height="443" alt={`frame${index + 1}`} />
                    <div className='comment'>{framee.name}</div>
                    <div className='day'>{framee.day}</div>
                    <div className='time'>{framee.time}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            {clonedFrames.map((frame, index) => (
              <SwiperSlide key={index}>
                <div className={`container`}>
                  <div className={`frame position-${(index % 6) + 1}`} onClick={() => openPopup(frame)}>
                    <img src={frame.frame} width="300" height="443" alt={`frame${index + 1}`} />
                    <div className='comment'>{frame.name}</div>
                    <div className='day'>{frame.day}</div>
                    <div className='time'>{frame.time}</div>
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
            <img src={selectedFrame.frame} width="450" height="664" alt="selected-frame" />
            <button className="close-button" onClick={closePopup} style={{ marginLeft: '8px' }}>
              <img src={Xicon} width="22" height="22" alt="close"></img>
            </button>
            <div className='comment p1'>{selectedFrame.name}</div>
            <div className='day p2'>{selectedFrame.day}</div>
            <div className='time p2' style={{ marginLeft: '50%' }}>{selectedFrame.time}</div>
          </div>
          <div className='QR' style={{ backgroundImage: `url(${selectedFrame.qr})` }}></div>
          <div className='back' onClick={closePopup}></div>
        </div>
      )}
    </div>
  );
}

export default Gallery;

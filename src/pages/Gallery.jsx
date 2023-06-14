import React, { useState, useEffect } from 'react';
import { gsap, Power1 } from "gsap";
import './gallery.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { useNavigate } from "react-router-dom"
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
  const navigate = useNavigate(); 
  const [search,setSearch] = useState(null)

  const [data, setData] = useState(null)
  const [frames, setFrames] = useState(
    [
      {name: '유리', day: '2023.6.13', time: '9:38', qr: null, frame: frame1},
      {name: '소리', day: '2023.6.13', time: '9:38', qr: null, frame: frame2},
      {name: '유진', day: '2023.6.13', time: '9:38', qr: null, frame: frame3},
      {name: '해원', day: '2023.6.13', time: '9:38', qr: null, frame: frame4},
      {name: '가윤', day: '2023.6.13', time: '9:38', qr: null, frame: frame5_1},
      {name: '프레임미', day: '2023.6.13', time: '9:38', qr: null, frame: frame6_1}
    ]
  );
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const clonedFrames = [...frames, ...frames]; // 원본 요소를 복제하여 새로운 배열 생성

  useEffect(() => {
    try {
      const response = axios.get("http://localhost:3001/api/select");
      response.then(response => {
        const arr = response.data.results
        setFrames(frames => frames.concat(arr.reverse()));
      });
    } catch (error) {
      console.error("오류 발생:", error);
    }
  }, []);

  

  console.log(frames) 

  const openPopup = (frame) => {
    setSelectedFrame(frame);
  };

  const closePopup = () => {
    setSelectedFrame(null);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const nextPage = () => {
    navigate("/SearchSave", { 
      state: {
        search: search,
      },
    });
  }

  
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
        {/* <div style={{backgroun frame:`url(${data.results.frame})`}}></div> */}
        <div className='search'>
          <input type="text" 
          placeholder='이름, 날짜, 시간 검색'
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }} ></input>
          <button className='searchBtn'><img src={search} width={48} height={39} alt="search" onClick={nextPage}></img></button>
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
                  <div className={`frame position-${(index % 6) + 1}`} onClick={() => openPopup(frame)}>
                    <img src={frame.frame} width="322" height="375" alt={`frame${index + 1}`} />
                  <div className='comment'>{frame.name}</div>
                  <div className='day'>{frame.day}</div>
                  <div className='time'>{frame.time}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
            {clonedFrames.map((frame, index) => (
              <SwiperSlide key={index}>
                <div className={`container`}>
                  <div className={`frame position-${(index % 6) + 1}`} onClick={() => openPopup(frame)}>
                    <img src={frame.frame} width="322" height="375" alt={`frame${index + 1}`} />
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
            <img src={selectedFrame.frame} width="590" height="684" alt="selected-frame" />
            <button className="close-button" onClick={closePopup} style={{ marginLeft: '8px' }}><img src={Xicon} width="22" height="22" alt="close"></img></button>
            <div className='comment p1'>{selectedFrame.name}</div>
            <div className='day p2'>{selectedFrame.day}</div>
            <div className='time p2' style={{ marginLeft: '50%' }}>{selectedFrame.time}</div>
          </div>          
          <div className='QR' style={{backgroundImage: `url(${selectedFrame.qr})`}}></div>
          <div className='back' onClick={closePopup}></div>
        </div>
      )}
    </div>
  );
}

export default Gallery;

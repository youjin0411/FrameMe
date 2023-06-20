import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import './gallery.css';
import pinkframe from '../img/pinkframe.png';
import charcoalframe from '../img/charcoalframe.png';
import skyblueframe from '../img/skyblueframe.png';
import yellowframe from '../img/yellowframe.png';
import frame1 from '../img/frame1.png';
import frame2 from '../img/frame2.png';
import frame3 from '../img/frame3.png';
import frame4 from '../img/frame4.png';
import frame5 from '../img/frame5.png';
import frame6 from '../img/frame6.png';
import frame5_1 from '../img/frame5.png';
import frame6_1 from '../img/frame6-1.png';
import Xicon from '../img/Xicon.png';
import search from '../img/search-icon.png'
import backgroundImage from '../img/backgroundImage.png';

function SearchSave() {
  const { state } = useLocation();
  console.log(state);
  const [frames, setFrames] = useState([
    { name: '유리', day: '2023.6.13', time: '9:38', qr: null, frame: frame1 },
    { name: '소리', day: '2023.6.13', time: '9:38', qr: null, frame: frame2 },
    { name: '유진', day: '2023.6.13', time: '9:38', qr: null, frame: frame3 },
    { name: '해원', day: '2023.6.13', time: '9:38', qr: null, frame: frame4 },
    { name: '가윤', day: '2023.6.13', time: '9:38', qr: null, frame: frame5_1 },
    { name: '프레임미', day: '2023.6.13', time: '9:38', qr: null, frame: frame6_1 }
  ]);

  const [selectedFrame, setSelectedFrame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFrames, setFilteredFrames] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    try {
      const response = axios.get('http://localhost:3001/api/select');
      response.then(response => {
        const arr = response.data.results;
        setFrames(frames => frames.concat(arr));
      });
    } catch (error) {
      console.error('오류 발생:', error);
    }
  }, []);

  useEffect(() => {
    const filtered = frames.filter(frame =>
      (frame.name.includes(state) ||
        frame.day.includes(state) ||
        frame.time.includes(state))
    );
    setFilteredFrames(filtered);
    setShowResults(true);
  }, [state]);  

  const handleSearch = () => {
    const filtered = frames.filter(frame =>
      (state && (frame.name.includes(state) || frame.day.includes(state) || frame.time.includes(state))) ||
      frame.name.includes(searchQuery) ||
      frame.day.includes(searchQuery) ||
      frame.time.includes(searchQuery)
    );
    setFilteredFrames(filtered);
    setShowResults(true);
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const openPopup = (frame) => {
    setSelectedFrame(frame);
  };

  const closePopup = () => {
    setSelectedFrame(null);
  };

  const openGallery = () => {
    window.location.href = '/gallery';
  };


  return (
    <div className='gallery'>
      <div className='bar'>
        <h1 className='text' onClick={openGallery}>GALLERY</h1>
        <p className='barcomment'>사진을 눌러 큐알코드로 이미지를 다운받아보세요!</p>
        <div className='search'>
          <input
            type='text'
            placeholder='이름, 날짜, 시간 검색'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className='searchBtn'>
            <img src={search} width={48} height={39} alt='search-icon' onClick={handleSearch} />
          </button>
        </div>
      </div>
      <div className='background1'>
        {filteredFrames.length > 0 ? (
          <div className='frames1'>
            {filteredFrames.map((frame, index) => (
              <div className={`container1`} key={index}>
                <div className={`frame1`} onClick={() => openPopup(frame)}>
                  <img src={frame.frame} width='322' height='375' alt={`frame${index + 1}`} />
                  <div className='comment'>{frame.name}</div>
                  <div className='day'>{frame.day}</div>
                  <div className='time'>{frame.time}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='noResult'>검색 결과가 없습니다.</p>
        )}
      </div>

      {selectedFrame && (
        <div className='popup'>
          <div className='popup-content'>
            <img src={selectedFrame.frame} width='590' height='684' alt='selected-frame' />
            <button className='close-button' onClick={closePopup} style={{ marginLeft: '8px' }}>
              <img src={Xicon} width='22' height='22' alt='close' />
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

export default SearchSave;
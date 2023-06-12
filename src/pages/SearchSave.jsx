import React, { useState } from 'react';
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
import frame5_1 from '../img/frame5-1.png';
import frame6_1 from '../img/frame6-1.png';
import Xicon from '../img/Xicon.png';
import search from '../img/search-icon.png'
import backgroundImage from '../img/backgroundImage.png';

function SearchSave() {
  const frames1 = [
    { image: frame1, comment: '유리언니의 전시기록' },
    { image: frame2, comment: '소리언니의 전시기록' },
    { image: frame3, comment: '유진언니의 전시기록' },
    { image: frame4, comment: '해원이의 전시기록' },
    { image: frame5_1, comment: '가윤이의 전시기록' },
    { image: frame6_1, comment: '프레임미 최고' }
  ];
  const [selectedFrame, setSelectedFrame] = useState(null);

  const openPopup = (frame1) => {
    setSelectedFrame(frame1);
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
      <div className="background1">
        <div className="frames1">
          {frames1.map((frame1, index) => (
            <div className={'container1'}>
              <div className={'frame1'} onClick={() => openPopup(frame1)}>
                <img src={frame1.image} width="322" height="374" alt={`frame1${index + 1}`} />
                <div className='comment'>{frame1.comment}</div>
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
            <button className="close-button" onClick={closePopup}><img src={Xicon} width="22" height="22" alt="close"></img></button>
            <div className='comment p1'>{selectedFrame.comment}</div>
            <div className='day p2'>{getCurrentDateTime().date}</div>
            <div className='time p2' style={{ marginLeft: '50%' }}>{getCurrentDateTime().time}</div>
          </div>
          <div className='QR'></div>
        </div>
      )}
    </div>
  );
}

export default SearchSave;
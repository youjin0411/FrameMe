import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import Webcam from 'react-webcam';

// 비디오 콘테이너
const videoConstraints = {
  width: 1001,
  height: 641,
  facingMode: 'user',
};


const WebcamApp = () => {
  const maxCount = 8;
  const [count, setCount] = useState(0);
  // 촬영 후 이미지를 보여주는지 여부 
  const [showResult, setShowResult] = useState(false);
  // 촬영한 사진 배열
  const [images, setImages] = useState([]);
  // 6초 촬영 타이머
  const [timeLeft, setTimeLeft] = useState(6);
  // 6초 감소 시킬 timeRef
  const timeRef = useRef(Date.now());
  // webcam 
  const webcamRef = useRef(null);

  // localstorage에 넣을 이미지 배열을 담을 변수
  const [selectedImages, setSelectedImages] = useState([]);

  //localStorage에서 "selectedImages"라는 키로 저장된 데이터를 가져오기
  useEffect(() => {
    const storedImages = localStorage.getItem('selectedImages');
    if (storedImages) {
      setSelectedImages(JSON.parse(storedImages));
    }
  }, []);

  // selectedImages 배열이 변경될 때마다 실행
  useEffect(() => {
    localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
  }, [selectedImages]);

  // 촬영한 사진 클릭 시 localstorage에 넣기
  const handleImageClick = (image) => {
    let updatedSelectedImages;
    // localstorage에 넣을 배열 추가
    if (selectedImages.length < 4) {
      updatedSelectedImages = [...selectedImages, image];
    } else {
      updatedSelectedImages = [...selectedImages.slice(1), image];
    }
    setSelectedImages(updatedSelectedImages);
  };
  
  // 프레임 위의 박스 이미지 출력 코드 
  const renderDivBoxes = () => {
    const divBoxes = [];
    for (let i = 0; i < 4; i++) {
      // selectedImages의 배열들을 순차대로 이미지 넣기 
      const selectedImage = selectedImages[i % selectedImages.length];
      const backgroundImage = selectedImage ? `url(${selectedImage})` : 'none';
      divBoxes.push(
        <div
          key={i}
          style={{
            width: 219.98,
            height: 140.77,
            left: 1043.56,
            top: 300.68,
            marginLeft: 38.56,
            backgroundImage,
            backgroundSize: 'cover',
          }}
        />
      );
    }
    return divBoxes;
  };  

  // 캡쳐 함수 
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages((imgs) => imgs.concat(imageSrc));
    setCount((c) => {
      // 0부터 8이 되기 전까지 돌아보기 
      if (c === maxCount - 1) setShowResult(true);
      return c + 1;
    });
  }, [webcamRef, maxCount]);

  // 타임에 맞추어 타이머 돌리기 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = Math.max(0, prevTimeLeft - 0.1);
        if (newTimeLeft === 0) {
          clearInterval(intervalId);
          capture();
          setCount(1);
          setShowResult(true);
        }
        return newTimeLeft;
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, [capture]);

  // 8장 이하로 촬영하기 
  useEffect(() => {
    const timer = setTimeout(() => {
      if (images.length < 8) {
        capture();
        setTimeLeft(6);
        timeRef.current = Date.now();
      }
    }, timeLeft * 1000);

    return () => clearTimeout(timer);
  }, [images, capture, timeLeft]);

  // photoshoot 경로에서만 실행되게 하기 
  const pathname = window.location.pathname;
  if (pathname.includes('/photoshoot')) {
    // '/photoshoot' 경로 또는 '/photoshoot'을 포함한 경로에서 실행하는 코드 작성
    if (showResult) {
      return (
        <>
          <div style={{ fontSize: 24, textAlign: 'center', fontWeight: 600, marginTop: 40 }}>
            사진을 선택해주세요
          </div>
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
              marginTop: 80,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '245px 245px',
                marginLeft: '262px',
                marginTop: '94px',
                position: 'absolute',
                columnGap: '10px',
                gridColumnGap: '45px',
                gridRowGap: '35px',
              }}
            >
              {images.map((i, index) => (
                <img src={i} onClick={() => handleImageClick(i)} style={{width: 219.98, height:140.77 }} />
              ))}
            </div>
            {/* 9.39 */}
            <div
              style={{
                position: 'absolute',
                width: 583, height:683, left:105, top:259, background:'#000000',marginLeft:900, marginTop:60,}}>
                    <div style={{display:'grid', gridTemplateColumns:'219.98px', gridRowGap:9, marginTop: 17}}>
                    {renderDivBoxes()}
                    </div>
                </div>
            </div>
            </>
        )
    }
  }

    return (
        <div>
            <div style={{margin:'0 auto', background:'white', width: 1820, height:900, left: 50, top: 130, backgroundBlendMode: 'overlay', borderRadius: '30px 30px 0px 0px', boxShadow:'0px 0px 2px 2px #F5F5F5', marginTop:85}}>
            <div style={{display:'flex', justifyContent:'center', alignItems: 'center', fontSize: 40}}>{`${count}/${maxCount}`}</div>
            <div style={{display:'flex', justifyContent:'center', alignItems: 'center', fontSize: 70}}>{Math.round(timeLeft)}</div>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Webcam
                style={{ 
                    width: 1001, 
                    height: 641, 
                    background: "black",
                    marginTop: 60}}
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            /></div>
            </div>
            <br />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<WebcamApp />);

export default WebcamApp;
import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import Webcam from 'react-webcam';
import { grayscaleFilter, brightnessFilter } from './filters.js';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const ImageEditor = (props) => {
  const canvasRef = useRef();
  const [originalImage, setOriginalImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      canvas.width = 220;
      canvas.height = 140;
      ctx.drawImage(image, 0, 0, 220, 140);
      setOriginalImage(image);
    };

    image.src = props.imageSrc;
  }, [props.imageSrc]);

  const applyFilter = (filterFunction) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (originalImage) {
      ctx.drawImage(originalImage, 0, 0, 220, 140);
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    filterFunction(imageData);
    ctx.putImageData(imageData, 0, 0);
  };

  const resetFilter = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (originalImage) {
      ctx.drawImage(originalImage, 0, 0, 220, 140);
    }
  };

  // Image Choice
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const storedImages = localStorage.getItem('selectedImages');
    if (storedImages) {
      setSelectedImages(JSON.parse(storedImages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
  }, [selectedImages]);

  const handleImageClick = (image) => {
    console.log(1); 
    let updatedSelectedImages;
    if (selectedImages.length < 4) {
      updatedSelectedImages = [...selectedImages, image];
    } else {
      updatedSelectedImages = [...selectedImages.slice(1), image];
    }
    setSelectedImages(updatedSelectedImages);
  };
  const renderDivBoxes = useCallback(() => {
    const divBoxes = [];
    for (let i = 0; i < 4; i++) {
      const selectedImage = selectedImages[i % selectedImages.length];
      const backgroundImage = selectedImage ? `url(${selectedImage})` : 'none';

      divBoxes.push(
        <div
          key={i}
          style={{
            width:219.98, height:140.77, left:1043.56, top:300.68, background:'#ffffff', marginLeft:38.56,
            backgroundImage,
            backgroundSize: 'cover',
          }}
        />
      );
    }
    return divBoxes;
  }, [selectedImages]);

  return (
    <div>
      <canvas 
      ref={canvasRef} 
      width="219.98" height="140.77" onClick={() => handleImageClick(props.imageSrc)}/>
      {/* <br /> 
        <div style={{display:'grid', gridTemplateColumns:'45px 45px 45px'}}>
            <button onClick={() => { applyFilter(grayscaleFilter) }}>흑백</button>
            <button onClick={() => { applyFilter(brightnessFilter) }}>밝게</button>
            <button onClick={resetFilter}>원본</button> 
        </div> */}
    </div>
  );
};

const WebcamApp = (props) => {
  const maxCount = 8;
  const [count, setCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [images, setImages] = useState([]);
  const [timeLeft, setTimeLeft] = useState(6);
  const timeRef = useRef(Date.now());
  const webcamRef = useRef(null);

  const renderDivBoxes = useCallback(() => {
    const divBoxes = [];
    for (let i = 0; i < 4; i++) {
      const selectedImage = images[i % images.length];
      const backgroundImage = selectedImage ? `url(${selectedImage})` : 'none';

      divBoxes.push(
        <div
          key={i}
          style={{
            width: 219.98, height: 140.77, left: 1043.56, top: 300.68, background: '#ffffff', marginLeft: 38.56,
            backgroundImage,
            backgroundSize: 'cover',
          }}
        />
      );
    }
    return divBoxes;
  }, [images]);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages((imgs) => imgs.concat(imageSrc));
    setCount((c) => {
      if (c === maxCount - 1) setShowResult(true);
      return c + 1;
    });
  }, [webcamRef, maxCount]);

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
              marginTop: 65,
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 196,
                height: 60,
                left: 1633,
                top: 249,
                borderRadius: 30,
                background: '#white',
                backgroundBlendMode: 'overlay',
                boxShadow: '0px 0px 2px 2px #F5F5F5',
              }}
            ></div>
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
                <ImageEditor key={index} imageSrc={i} style={{ background: '#000000' }} />
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
            <div style={{margin:'0 auto', background:'white', width: 1820, height:900, left: 50, top: 130, backgroundBlendMode: 'overlay', borderRadius: '30px 30px 0px 0px', boxShadow:'0px 0px 2px 2px #F5F5F5', marginTop:70}}>
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
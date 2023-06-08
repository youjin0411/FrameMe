import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import LoadingPage from './Loding';

// 비디오 콘테이너
const videoConstraints = {
  width: 1001,
  height: 641,
  facingMode: 'user',
};
const style2 = {
  width: 219.98,
  height: 140.77,
  left: 1043.56,
  top: 300.68,
  background: 'white',
  marginLeft: 38.56,
  backgroundSize: 'cover',
}

const WebcamApp = () => {
  const maxCount = 8;
  const [count, setCount] = useState(0);
  // 촬영 후 이미지를 보여주는지 여부
  const [showResult, setShowResult] = useState(false);
  // 촬영한 사진 배열
  const [images, setImages] = useState([]);
  // 6초 촬영 타이머
  const [timeLeft, setTimeLeft] = useState(1); //수정
  // 6초 감소 시킬 timeRef
  const timeRef = useRef(Date.now());
  // webcam 
  const webcamRef = useRef(null);
  const [newQ, setNewQ] = useState(Array(4).fill(null));
  //useEffect 실행 체크
  let check = Array(4).fill(null);
  let Qnew = Array(4).fill(null);

  const [showLoadingPage, setShowLoadingPage] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    setShowWebcam(true);
    setShowLoadingPage(true);
    setTimerStarted(true)

    const webcamTimeout = setTimeout(() => {
      setShowLoadingPage(false);

    }, 3000);

    return () => clearTimeout(webcamTimeout);
  }, []);


  function HandleImageClick(size, renderCallback) {
    const [q, setQ] = useState(Array(size).fill(null));
    const [currentIdx, setCurentIdx] = useState(0); 
    this.push = function (data) {
      Qnew = [...q]; // 현재 큐를 기반으로 새로운 배열 생성
      console.log(Qnew)
      if (currentIdx === size) { // 4 == 4일 경우 
        Qnew[0] = data;
        setCurentIdx(1)
      } else {
        Qnew[currentIdx] = data;
        setCurentIdx(idx => idx+1)
      }
      if (Qnew.length === size + 1) {
        Qnew.shift(); // 가장 처음에 넣은 데이터 제거
      }
      localStorage.setItem('selectedImages', JSON.stringify(Qnew)); // 데이터를 로컬스토리지에 저장
      setQ(Qnew);; // 현재 큐를 업데이트
      check.push(Qnew)
      renderCallback([...Qnew]); // 업데이트된 큐를 전달하여 콜백 함수 호출
    };
  }
  const renderQueue = useCallback(
    (queue) => {
      return queue.map((selectedImage, index) => {
        const key = `${selectedImage}_${index}`;
        return (
          <div
            key={key}
            style={{
              ...style2,
              backgroundImage: selectedImage ? `url("${selectedImage}")` : null
            }}
          ></div>
        );
      });
    },
    [newQ]
  );

  const q = new HandleImageClick(4, setNewQ);

  // 로컬 스토리지에서 저장된 이미지를 가져와 newQ 상태를 업데이트
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('selectedImages'));
    if (storedImages) {
      setNewQ(storedImages);
    }
  }, [check]);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages((imgs) => imgs.concat(imageSrc));
    setCount((c) => {
      // 0부터 8이 되기 전까지 돌아보기 
      if (c === maxCount - 1) {
        setShowResult(true);
      }
      return c + 1;
    });
  }, [webcamRef, maxCount]);
  
  // 타임에 맞추어 타이머 돌리기 
  useEffect(() => {
    if (timerStarted) {
      const timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
          setTimeLeft((prevTimeLeft) => {
            const newTimeLeft = Math.max(0, prevTimeLeft - 0.1);
            if (newTimeLeft === 0) {
              clearInterval(intervalId);
              capture();
            }
            return newTimeLeft;
          });
        }, 100);
    
        return () => clearInterval(intervalId);
      }, 3500);
  
      return () => clearTimeout(timeoutId);
    }
  }, [capture, timerStarted]);
  

  // 8장 이하로 촬영하기 
  useEffect(() => {
    const timer = setTimeout(() => {
      if (images.length < 8) {
        capture();
        setTimeLeft(1); //수정 
        timeRef.current = Date.now();
      }
    }, timeLeft * 3500);

    return () => clearTimeout(timer);
  }, [images, capture, timeLeft]);

  // photoshoot 경로에서만 실행되게 하기 
  const pathname = window.location.pathname;

  if (pathname.includes('/photoshoot')) {
    if (showResult) {
      return (
        <>
          <div style={{ fontSize: 24, textAlign: 'center', fontWeight: 600, marginTop: 40, fontFamily: 'Noto Serif'}}>
            사진을 선택해주세요
          </div>
          <Frames>
            <Choice>
              {images.map((i, index) => (
                <img key={index} src={i} onClick={() => {
                  q.push(i)
                }} style={{width: 219.98, height:140.77 }} />
              ))}
            </Choice>
            <div style={{ position: 'absolute', width: 583, height:683, left:105, top:206, background:'#000000',marginLeft:900, marginTop:60,}}>
                <div style={{display:'grid', gridTemplateColumns:'219.98px', gridRowGap:9, marginTop: 17}} id='print'>
                {renderQueue(newQ)}
                </div>
              </div>
            </Frames>
            <Btn><Links href="/ChoiceFrame">다음&nbsp;&nbsp;&nbsp;〉</Links></Btn>
            </>
        )
    }
  }
    return (
        <div>
            <div style={{margin:'0 auto', background:'white', width: 1820, height:967, left: 50, top: 130, backgroundBlendMode: 'overlay', borderRadius: '30px 30px 0px 0px',boxShadow: '0px 0px 49px 3px #F5F5F5', marginTop:70}}>
               <div style={{display:'flex', justifyContent:'center', alignItems: 'center', fontSize: 40}}>{`${count}/${maxCount}`}</div>
               <div style={{display:'flex', justifyContent:'center', alignItems: 'center', fontSize: 70}}>{Math.round(timeLeft)}</div>
               <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
               <div>
                {showLoadingPage && <LoadingPage />}
                {showWebcam && (
                  <>
                    <Webcam
                      style={{width: 1001,height: 641,background: 'black',marginTop: 60,}}
                      audio={false}
                      height={720}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={1280}
                      videoConstraints={videoConstraints}/>
                  </>
                )}
                </div>
                </div>
            </div>
            <br />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<WebcamApp />);

const Links = styled.a`
  font-size: 20px;
  font-family: 'Noto Serif';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #BDBDBD;
  width: 196px;
  height: 60px;
  text-decoration: none;
  text-align: center;
`;
const Btn = styled.button`
  position: absolute;
  border-radius: 30px;
  width: 196px;
  height: 60px;
  left: 1633px;
  top: 980px;
  background-blend-mode: overlay;
  background: white;
  box-shadow: 0px 0px 2px 2px #F5F5F5;
  border: none;
  padding: 10px 10px 10px 10px;
`
const Frames = styled.div`
    margin: 0 auto;
    marginTop: 23px;
    background: white;
    width: 1820px;
    height: 967px;
    left: 50px;
    top: 190px;
    background-blend-mode: overlay;
    border-radius: 30px 30px 0px 0px;
    box-shadow: 0px 0px 49px 3px #F5F5F5;
    margin-top: 15px;
`
const Choice = styled.div`
    display: grid;
    grid-template-columns: 245px 245px;
    margin-left: 262px;
    margin-top: 94px;
    position: absolute;
    column-gap: 10px;
    grid-column-gap: 45px;
    grid-row-gap:35px;
    `
export default WebcamApp;
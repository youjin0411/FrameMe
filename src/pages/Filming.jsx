import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

function Filming() {
  // imageSrcs: 캡쳐한 이미지들을 저장하는 배열
  const [imageSrcs, setImageSrcs] = useState([]);
  // timeLeft: 8초 간격으로 캡쳐하기 위한 변수
  const [timeLeft, setTimeLeft] = useState(8);
  // imageCount: 캡쳐한 이미지의 개수
  const [imageCount, setImageCount] = useState(0);

  // webcamRef: 웹캠을 사용하기 위한 변수
  const webcamRef = React.useRef(null);
  // timeRef: 8초 간격으로 캡쳐하기 위한 변수
  const timeRef = React.useRef(Date.now());

  // 캡쳐 함수
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrcs(prevImageSrcs => [...prevImageSrcs, imageSrc]);
    // 캡쳐한 이미지의 개수를 1 증가
    setImageCount(count => count + 1); 
  }, [webcamRef, setImageSrcs, setImageCount]);

  // 8초 간격으로 캡쳐
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      // Data.now() - timeRef.current: (현재 시간 - 8초 전 시간) / 1000은 8초 간격으로 캡쳐하기 위한 변수
      const elapsed = (Date.now() - timeRef.current) / 1000;
      // 8초 이상 캡쳐하면 캡쳐 중지 후 timeRef.current를 현재 시간으로 초기화
      const newTimeLeft = Math.max(0, 8 - elapsed);
      // newTimeLeft가 0이면 캡쳐 중지
      setTimeLeft(newTimeLeft);
      if (newTimeLeft === 0) {
        // 캡쳐 중지
        clearInterval(intervalId);
        // timeRef.current를 현재 시간으로 초기화
        timeRef.current = Date.now();
      }
      // 8초 간격으로 캡쳐
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      // 8초 이상 캡쳐하면 캡쳐 중지
      if (imageSrcs.length < 8) {
        capture();
        // 8초 간격으로 캡쳐
        setTimeLeft(8);
        timeRef.current = Date.now();
      }
      // 8초 이상 캡쳐하면 캡쳐 중지
    }, timeLeft * 1000);

    return () => clearTimeout(timer);
  }, [imageSrcs, capture, timeLeft]);

  const saveImage = imageSrc => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = 'captured.jpg';
      link.href = canvas.toDataURL('image/jpeg');
      link.click();
    };
  };

  return (
    <Container>
      <Row>
        <div
        style={{
          marginTop:'1vw',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          fontWeight:'bold',
          fontSize:'1.5vw',
      }}>{imageCount}/8</div>
        <div 
        style={{
          marginTop:'1vw',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          fontWeight:'bold',
          fontSize:'1.5vw',
      }}>{Math.round(timeLeft)}</div>
        <Content>
          <Col>
            <Webcam
              width="1001px"
              height="660px"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-100 h-100"
            />
          </Col>
        </Content>
        <div style={{marginTop:'2vw'}}>
        <Col
        style={{    
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'}}>
          {imageSrcs.map((imageSrc, index) => (
            <div key={index}>
              <img
                width="200px"
                height="180px"
                src={imageSrc}
                alt={`captured-${index}`}
                className="w-100"
                onClick={() => saveImage(imageSrc)}
              />
            </div>
          ))}
          <br />
        </Col>
        </div>
      </Row>
    </Container>
  );
}

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 60vh;
  margin-top: 2vw;
`;

export default Filming;

import React, { useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Filming() {
  // imageSrcs: 캡쳐한 이미지들을 저장하는 배열
  const [imageSrcs, setImageSrcs] = useState([]);
  // timeLeft: 6초 간격으로 캡쳐하기 위한 변수
  const [timeLeft, setTimeLeft] = useState(6);
  // imageCount: 캡쳐한 이미지의 개수
  const [imageCount, setImageCount] = useState(0);
  // webcamRef: 웹캠을 사용하기 위한 변수
  const webcamRef = React.useRef(null);
  // timeRef: 6초 간격으로 캡쳐하기 위한 변수
  const timeRef = React.useRef(Date.now());

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // 프록시 서버의 주소
});

// 이미지 업로드 함수
const uploadImage = useCallback(async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await axiosInstance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}, [axiosInstance]); // 추가

// 캡쳐 함수
const capture = useCallback(async () => {
  const imageSrc = webcamRef.current.getScreenshot();
  const response = await fetch(imageSrc);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append('image', blob);
  setImageSrcs((prevImageSrcs) => [...prevImageSrcs, imageSrc]);
  setImageCount((count) => count + 1);
  uploadImage(formData);
}, [webcamRef, setImageSrcs, setImageCount, uploadImage]);

  // 8초 간격으로 캡쳐
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      // Data.now() - timeRef.current: (현재 시간 - 8초 전 시간) / 1000은 8초 간격으로 캡쳐하기 위한 변수
      const elapsed = (Date.now() - timeRef.current) / 1000;
      // 8초 이상 캡쳐하면 캡쳐 중지 후 timeRef.current를 현재 시간으로 초기화
      const newTimeLeft = Math.max(0, 6 - elapsed);
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
        setTimeLeft(6);
        timeRef.current = Date.now();
      }
      // 8초 이상 캡쳐하면 캡쳐 중지
    }, timeLeft * 1000);
    return () => clearTimeout(timer);
  }, [imageSrcs, capture, timeLeft]);
  return (
    <Container>
      <Row>
        <div
        style={{
          marginTop:'120px',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          fontWeight:'bold',
          fontSize:'40px',
      }}>{imageCount}/8</div>
        <div 
        style={{
          marginTop:'4px',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          fontWeight:'bold',
          fontSize:'70px',
      }}>{Math.round(timeLeft)}</div>
        <Content>
          <Col>
            <Webcam
              width="1001px"
              height="641px"
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
          <br />
        </Col>
        <Link to={{pathname: '/image-page', state: { imageSrcs }}}>
          <button>이미지 보기</button>
        </Link>
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
import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

function Filming() {
  const [imageSrcs, setImageSrcs] = useState([]);
  const [timeLeft, setTimeLeft] = useState(8);

  const webcamRef = React.useRef(null);
  const timeRef = React.useRef(Date.now());

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrcs(prevImageSrcs => [...prevImageSrcs, imageSrc]);
  }, [webcamRef, setImageSrcs]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const elapsed = (Date.now() - timeRef.current) / 1000;
      const newTimeLeft = Math.max(0, 8 - elapsed);
      setTimeLeft(newTimeLeft);
      if (newTimeLeft === 0) {
        clearInterval(intervalId);
        timeRef.current = Date.now();
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (imageSrcs.length < 8) {
        capture();
        setTimeLeft(8);
        timeRef.current = Date.now();
      }
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
        <div>{Math.round(timeLeft)} seconds left</div>
        <Content>
          <Col>
            <Webcam
              width="853px"
              height="485px"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-100 h-100"
            />
          </Col>
        </Content>
        <Col>
          {imageSrcs.map((imageSrc, index) => (
            <div key={index}>
              <img
                src={imageSrc}
                alt={`captured-${index}`}
                className="w-100"
                onClick={() => saveImage(imageSrc)}
              />
            </div>
          ))}
          <br />
        </Col>
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
  margin-top: 20vw;
`;

export default Filming;

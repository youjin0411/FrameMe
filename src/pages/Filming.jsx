import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

function Filming() {
  const [imageSrcs, setImageSrcs] = useState([]);

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrcs(prevImageSrcs => [...prevImageSrcs, imageSrc]);
  }, [webcamRef, setImageSrcs]);

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
        <Content>
          <Col>
            <Webcam
              width="853px"
              heigth="485px"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-100 h-100"
            />
            <br />
            <Button onClick={() => {
              for (let i = 0; i < 8; i++) {
                setTimeout(capture, i * 1000);
              }
            }}>Capture photos automatically</Button>
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
        </Col>
      </Row>
    </Container>
  );
};

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
  
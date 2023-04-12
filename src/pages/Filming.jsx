import React, { useState } from 'react';
// 모듈 설치 : npm install react-webcam
import Webcam from 'react-webcam';
// 모듈 설치 : npm install react-bootstrap bootstrap
import { Button, Container, Row, Col } from 'react-bootstrap';

function Filming() {
  // 이미지를 저장할 상태 변수
  // useState() 함수는 배열을 반환하는 함수로, 배열의 첫 번째 요소는 상태 변수이고 두 번째 요소는 상태를 변경하는 함수다.
  const [imageSrc, setImageSrc] = useState(null);

  // React.useRef() 함수는 ref를 생성하는 함수다.
  const webcamRef = React.useRef(null);

  // capture
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef, setImageSrc]);

  const saveImage = () => {
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
        <Col>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-100"
          />
          <Button onClick={capture}>Capture photo</Button>
          {imageSrc && (
            <Button onClick={saveImage}>Save</Button>
          )}
        </Col>
        <Col>
          {imageSrc && (
            <img
              src={imageSrc}
              alt="captured"
              className="w-100"
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Filming;

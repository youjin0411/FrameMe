import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const frameimage = state.frameimage;
  const review = state.review;
  const name = state.name;
  const gallery = state.gallery;
  const qr = state.qr;
	const [shortUrl, setShortUrl] = useState('');
  const storedImages = JSON.parse(localStorage.getItem('selectedImages2'));

  const divRef = useRef(null);
  const [scannedImage, setScannedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (divRef.current) {
      setIsLoading(true);
      const { width, height } = divRef.current.getBoundingClientRect();
      html2canvas(divRef.current, {
        width: width,
        height: height,
      })
        .then(function (canvas) {
          const image = canvas.toDataURL('image/png');
          setScannedImage(image);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.error('Image conversion error:', error);
          setIsLoading(false);
        });
    }
  }, []);

  // useEffect(() => {
  //   if (divRef.current) {
  //     setIsLoading(true);
  //     const { width, height } = divRef.current.getBoundingClientRect();

  //     // QR 코드 생성
  //     QRCode.toDataURL(JSON.stringify(storedImages), { width, height })
  //       .then(function (url) {
  //         setScannedImage(url);
  //         setIsLoading(false);
  //       })
  //       .catch(function (error) {
  //         console.error('QR Code generation error:', error);
  //         setIsLoading(false);
  //       });
  //   }
  // }, []);
  const date = {
    currentDate: new Date(),
  };
  const { currentDate } = date;
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  function handleClick() {
    navigate('/gallery');
  }

  function handleClick2() {
    navigate('/write');
  }

  const style2 = {
    width: 500,
    height: 143,
    backgroundSize: 'cover',
  }
  return (
    <div>
      <Mt>사진을 저장하세요</Mt>
        <Print ref={divRef}>
          <div
            id="framee"
            style={{
              backgroundImage: frameimage,
							display: 'flex',
							justifyCcontent: 'center',
							top: 175,
							left: 666,
							alignItems: 'center',
							margin: '0 auto',
							marginTop: 36
            }}
          ></div>
      <div style={{ position: 'absolute', display: 'grid', left: 702, top: 339, gridRowGap: 5, rowGap: 5 }}>
      <div style={{ ...style2, backgroundImage: `url(${storedImages[0]})` }} />
      <div style={{ ...style2, backgroundImage: `url(${storedImages[1]})` }} />
      <div style={{ ...style2, backgroundImage: `url(${storedImages[2]})` }} />
          </div>
					<Review>{review}</Review>
			</Print>
        {isLoading ? (
          <p>Loading...</p>
        ) : scannedImage ? (
          <div>
            {/* <img src={scannedImage} alt="Scanned Image" /> */}
            <a href={scannedImage} download>
              Download Image
            </a>
						{/* <QRCode value={scannedImage} /> */}
				</div>
				) : null}

			<Name>{name}의 전시기록</Name>
			<Names>{year}.{month}.{day}</Names>
			<button
				id="button"
				type="submit"
				style={{
					position: 'absolute',
					borderRadius: '30px',
					width: '196px',
					height: '60px',
					left: '1633px',
					top: '980px',
					background: 'white',
					backgroundBlendMode: 'overlay',
				}}
				onClick={handleClick}
			>
			갤러리 &nbsp;&nbsp;&nbsp;〉
			</button>
			<Button onClick={handleClick2}>&nbsp;&nbsp;&nbsp;이전으로</Button>
      </div>
  );
}
const Review = styled.div`
	position: absolute;
	word-break:break-all;
	width: 208px;
	left: 49.52%;
	right: 37.81%;
	top: 73.52%;
	bottom: 34.81%;
	font-family: 'Noto Serif';
	font-style: normal;
	font-weight: 500;
	font-size: 15px;
	line-height: 30px;
	color: #FFFFFF;
`
const Name = styled.div`
position: absolute;
left: 34.24%;
right: 53.75%;
top: 87.15%;
bottom: 8.15%;

font-family: 'Noto Serif';
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 27px;

color: #3C3C3C;
`
const Names = styled.div`
position: absolute;
left: 34.24%;
right: 59.17%;
top: 91%;
bottom: 4.91%;

font-family: 'Noto Serif';
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 20px;

color: #B9B9B9;
`
const Button = styled.button`
position: absolute;
width: 196px;
height: 60px;
top: 980px;
background: white;
background-blend-mode: overlay;
border-radius: 30px;
background: white;
outline: none;
border: none;
box-shadow: -5px 5px 30px 2px rgb(239, 239, 239);
`
const Print = styled.div`
display: flex;
width: 588px;
height: 683px;
justify-content: center;
align-items: center;
margin: 0 auto;
margin-top: 125px;
`
const Mt = styled.div`
position: absolute;
left: 45.21%;
right: 45.26%;
top: 11.76%;
bottom: 85.19%;
width : 199px;
font-family: 'Noto Serif';
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 33px;
/* identical to box height */
margin: 0 auto;
text-align: center;
/* 타이틀 */

color: #2B2B2B;
`
export default Result;

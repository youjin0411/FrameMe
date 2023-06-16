import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode.react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';  

function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const frameimage = state.frameimage;
  const review = state.review;
  const name = state.name;
  const qr = state.qr;
  const gallery = state.gallery;
  const storedImages = JSON.parse(localStorage.getItem('selectedImages'));
  const qrCodeRef = useRef(null);
  const [qrCodeImage, setQrCodeImageURL] = useState(null);
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
        })
        .catch(function (error) {
          console.error('Image conversion error:', error);
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    const generateQRCodeImage = async () => {
      if (qrCodeRef.current) {
        const canvas = await html2canvas(qrCodeRef.current);
        const image = canvas.toDataURL('image/png');
        setQrCodeImageURL(image);
      }
    };

    generateQRCodeImage();
  }, []);
  useEffect(() => {
    if (scannedImage != null) {
      handleUpload();
    }
    console.log(scannedImage);
  }, [scannedImage]);
  const date = {
    currentDate: new Date(),
  };
  const { currentDate } = date;
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const time = `${currentDate.getHours()}:${currentDate.getMinutes()}`
  const today = `${year}.${month}.${day}`
  const [qrImgUrl, setQrImgUrl] = useState(null)

  function handleClick() {
    navigate('/write');
  }

  const handleInsert = async () => {
    if(gallery){
      try {
        const response = await axios.post("http://localhost:3001/api/insert", {
          name: name, 
          today: today, 
          time: time, 
          qrCodeImage: qrImgUrl,  // 변경
          frameimage : qrCodeImage
        });
        if(response) {
          console.log("성공")
          navigate('/gallery');
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    }else{
      navigate('/gallery');
    }
  };

  const handleUpload = async () => {
    try {
      if (!scannedImage) {
        console.error('No image to upload');
        return;
      }
      const blobImage = await fetch(scannedImage).then((res) => res.blob());
      const formData = new FormData();
      formData.append('image', blobImage);
      const response = await axios.post('https://port-0-framemeserver-7xwyjq992llisq9g9j.sel4.cloudtype.app/upload', formData, {
        withCredentials: true,
        crossDomain: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const qrCodeURL = response.data.downloadLink;
      setQrImgUrl(response.data.qrimgLinkprint)
      setQrCodeImageURL(qrCodeURL); // Set the QR code URL to state
      setIsLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
const style2 = {
  width: 223, 
  height: 142,
  backgroundSize: 'cover'
};
  return (
    <div>
      <Mt>사진을 저장하세요</Mt>
      <Print ref={divRef}>
        <div
          id="framee"
          style={{
            backgroundImage: frameimage,
            display: 'flex',
            justifyContent: 'center',
            top: 175,
            left: 662,
            alignItems: 'center',
            margin: '0 auto',
            marginTop: 36,
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            display: 'grid',
            left: 700,
              top: 227.14,
              gridRowGap: 8.65,
            }}
          >
            <div style={{ ...style2, backgroundImage: `url(${storedImages[0]})` }} />
            <div style={{ ...style2, backgroundImage: `url(${storedImages[1]})` }} />
            <div style={{ ...style2, backgroundImage: `url(${storedImages[2]})` }} />
            <div style={{ ...style2, backgroundImage: `url(${storedImages[3]})` }} />
          </div>
					<Review>{review}</Review>
			</Print>
        {isLoading ? (<p style={{marginTop: -50, marginLeft: 1395}}>Loading...<br/>잠시 후 QR이 생설될 것 입니다.</p>) : qr ? (
          <div style={{marginTop: -17}}>
						<QRCode value={qrCodeImage} renderAs="canvas" style={{marginTop: -350, marginLeft: 1388}}/>
				  </div>
				) : null}

			<Name>{name}</Name>
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
				onClick={handleInsert}
			>
			갤러리 &nbsp;&nbsp;&nbsp;〉
			</button>
			<Button onClick={handleClick}>&nbsp;&nbsp;&nbsp;이전으로</Button>
      </div>
  );
}
const Review = styled.div`
	position: absolute;
	word-break:break-all;
	width: 208px;
	left: 50.35%;
	right: 37.81%;
	top: 48.52%;
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
left: 34.2%;
right: 53.75%;
top: 85.15%;
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

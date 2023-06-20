import React, { useRef, useState, useEffect } from 'react';
import ReactToPrint from "react-to-print";
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
  const storedImages = JSON.parse(localStorage.getItem('selectedImages2'));
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

  function handleClick2() {
    navigate('/write2');
  }
  function Printhandler() {
    
  }
  
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
  const handleInsert = async () => {
    if(gallery){
      try {
        const response = await axios.post("http://localhost:3001/api/insert", {
          name: name, 
          today: today, 
          time: time, 
          qrCodeImage: qrImgUrl, 
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
  const style2 = {
    width: 402.79,
    height: 140.24,
    backgroundSize: 'cover',
  }
  return (
    <div>
      <Mt>사진을 저장하세요</Mt>
      <Save ref={divRef} style={{backgroundImage: `url(${frameimage}`}}>
          <div style={{display: 'grid', gridRowGap: 7.79, gridTemplateColumns: '402.79px', paddingTop: 81, justifyContent:'center'}}>
              <div style={{ ...style2, backgroundImage: `url(${storedImages[0]})` }} />
              <div style={{ ...style2, backgroundImage: `url(${storedImages[1]})` }} />
              <div style={{ ...style2, backgroundImage: `url(${storedImages[2]})` }} />
          </div>
					<Review>{review}</Review>
      </Save>
      {isLoading ? (<p style={{marginTop: -50, marginLeft: 1207}}>Loading...<br/>잠시 후 QR이 생설될 것 입니다.</p>) : qr ? (
          <div style={{marginTop: -17}}>
						<QRCode value={qrCodeImage} renderAs="canvas" style={{marginTop: -350, marginLeft: 1197}}/>
				  </div>
				) : null}
			<Name>{name}</Name>
			<Names>{year}.{month}.{day}</Names>
      <ReactToPrint
          trigger={() => 
            <button
            id="button"
            type="submit"
            style={{
              position: 'absolute',
              borderRadius: '30px',
              width: '196px',
              height: '60px',
              left: '1633px',
              top: '900px',
              background: 'white',
              backgroundBlendMode: 'overlay',
            }}
            onClick={Printhandler}
          >
          인쇄하기 &nbsp;&nbsp;&nbsp;〉
          </button>
          }
          content={() => divRef.current}
        />
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
			<Button onClick={handleClick2}>&nbsp;&nbsp;&nbsp;이전으로</Button>
      </div>
  );
}

const Save = styled.div`
    justify-content: center;
    margin: 0 auto;
    margin-top: 36px
    position: absolute;
    width: 465px;
    height: 686px;
    background-color: #232323;
    background-size: cover;
`
const Review = styled.div`
    position: absolute;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 30px;
    color: rgb(255, 255, 255);
    margin-top: 62px;
    margin-left: 200px;
`
const Name = styled.div`
position: absolute;
left: 38.24%;
right: 53.75%;
top: 85%;
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
left: 38.24%;
right: 59.17%;
top: 88%;
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
const Mt = styled.div`
    width: 199px;
    font-family: "Noto Serif";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    margin: 0px auto;
    text-align: center;
    color: rgb(43, 43, 43);
    padding-top: 41px;
    padding-bottom: 55px;
`
export default Result;

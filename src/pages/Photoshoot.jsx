import React, { useEffect, useRef, useState, useCallback } from 'react'
    import ReactDOM from 'react-dom/client';
import Webcam from "react-webcam";
// https://dev-momo.tistory.com/entry/Javascript-Image-Filter-%EB%A7%8C%EB%93%A4%EA%B8%B0
import { grayscaleFilter, brightnessFilter} from './filters.js';

// 비디오
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

// 사진 촬영 후 이미지 편집(필터 설정 등 )
const ImageEditor = (props) => {
// 캔버스 요소에 접근하기 위한 useRef 훅 사용
  const canvasRef = useRef();
  // 이전 필터 상태 추가
  const [originalImage, setOriginalImage] = useState(null); // 원본 이미지 상태 추가
  useEffect(() => {
    // 캔버스 요소 가져오기
    const canvas = canvasRef.current;
    // 2D 그래픽 컨텍스트 가져오기
    const ctx = canvas.getContext('2d');
    // 새로운 이미지 객체 생성
    const image = new Image();
    // 이미지가 로드되면 캔버스에 이미지를 그린다
    image.onload = () => {
    // 캔버스 너비를 이미지 너비로 설정
      canvas.width = 245;
      // 캔버스 높이를 이미지 높이로 설정
      canvas.height = 158;
      // 이미지를 캔버스에 그리기
      ctx.drawImage(image, 0, 0, 245, 158);
      setOriginalImage(image); // 원본 이미지 설정
    };
    image.src = props.imageSrc; // props로 전달된 이미지 소스를 설정한다
    // props.imageSrc가 변경될 때마다 useEffect 실행
  }, [props.imageSrc]);

  const applyFilter = (filterFunction) => {
    // 캔버스 요소 가져오기
    const canvas = canvasRef.current;
    // 2D 그래픽 컨텍스트 가져오기
    const ctx = canvas.getContext('2d');
    // 이전 필터가 있으면 초기화하기
    if (originalImage) {
        // 원본 이미지로 초기화
        ctx.drawImage(originalImage, 0, 0, 245, 158);
    }
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    filterFunction(imageData);
    ctx.putImageData(imageData, 0, 0);
    };

    const resetFilter = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (originalImage) {
            ctx.drawImage(originalImage, 0, 0, 245, 158);
        }
  };
    return (
        <div>
            <canvas ref={canvasRef} width="245" height="158" />
            <br />
            {/*  
            <div style={{display:'grid', gridTemplateColumns:'45px 45px 45px'}}>
                <button onClick={() => { applyFilter(grayscaleFilter) }}>흑백</button>
                <button onClick={() => { applyFilter(brightnessFilter) }}>밝게</button>
                <button onClick={resetFilter}>원본</button> 
            </div>
            */}
        </div>  
)}

const WebcamApp = (props) => {
    const maxCount = 8;
    // count는 내가 현재 몇 장 찍었는지 상태 확인 
    const [count, setCount] = useState(1);
    // 사진을 모두 다 촬영할 때 True
    const [showResult, setShowResult] = useState(false);
    // 캡쳐한 이미지들을 저장하는 배열 
    const [images, setImages] = useState([]);
    // timeLeft: 6초 간격으로 캡쳐하기 위한 변수
    const [timeLeft, setTimeLeft] = useState(6);
    // timeRef: 6초 간격으로 캡쳐하기 위한 변수
    const timeRef = React.useRef(Date.now());
    const webcamRef = React.useRef(null);

    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImages(imgs => imgs.concat(imageSrc))
        setCount(c => {
            if(c === maxCount) setShowResult(true);
            return c + 1
        })
    }, [webcamRef]);
  // 8초 간격으로 캡쳐
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const elapsed = (Date.now() - timeRef.current) / 1000;
      const newTimeLeft = Math.max(0, 6 - elapsed);
      // newTimeLeft가 0이면 캡쳐 중지
      setTimeLeft(newTimeLeft);
      if (newTimeLeft === 0) {
        // 캡쳐 중지
        clearInterval(intervalId);
        // timeRef.current를 현재 시간으로 초기화
        timeRef.current = Date.now();
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

React.useEffect(() => {
    const timer = setTimeout(() => {
      // 8초 이상 캡쳐하면 캡쳐 중지
      if (images.length < 8) {
        capture();
        // 8초 간격으로 캡쳐
        setTimeLeft(6);
        timeRef.current = Date.now();
      }
      // 8초 이상 캡쳐하면 캡쳐 중지
    }, timeLeft * 1000);
    return () => clearTimeout(timer);
  }, [images, capture, timeLeft]);

    if(showResult) {
        return (
            <>
            <div style={{fontSize:24, textAlign:'center',fontWeight:600, marginTop:40}}>사진을 선택해주세요</div>
            <div style={{margin:'0 auto', background:'white', width: 1820, height:900, left: 50, top: 180, backgroundBlendMode: 'overlay', borderRadius: '30px 30px 0px 0px', boxShadow:'0px 0px 2px 2px #F5F5F5', marginTop:70}}>
                <div style={{position:'absolute', width:196, height:60, left:1633,top:249, borderRadius: 30, background:'#white',backgroundBlendMode: 'overlay', boxShadow:'0px 0px 2px 2px #F5F5F5'}}></div>
                <div style={{display:'grid', gridTemplateColumns:'245px 245px', marginLeft:328, marginTop:100, position:'absolute', gridColumnGap: 10}}>
                    {images.map((i, index) => <ImageEditor key={index} imageSrc={i} />)}
                </div>
                {/* 9.39 */}
                <div style={{position:'absolute', width:583, height:683, left:105, top:259, background:'#000000',marginLeft:900, marginTop:60,}}>
                    <div style={{display:'grid', gridTemplateColumns:'219.98px', gridRowGap:9, marginTop:-5}}>
                        <div style={{width:219.98, height:140.77, left:1043.56, top:300.68, background:'#ffffff', marginTop:20, marginLeft:38.56}}></div>
                        <div style={{width:219.98, height:140.77, left:1043.56, top:300.68, background:'#ffffff', marginLeft:38.56}}></div>
                        <div style={{width:219.98, height:140.77, left:1043.56, top:300.68, background:'#ffffff', marginLeft:38.56}}></div>
                        <div style={{width:219.98, height:140.77, left:1043.56, top:300.68, background:'#ffffff', marginLeft:38.56}}></div>
                    </div>
                </div>
            </div>
                {/* <button onClick={() => {
                    setCount(1);
                    setShowResult(false);
                    setImages([]);  
                }}>다시 찍기</button> */}
            </>
        )
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
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<WebcamApp />)

export default WebcamApp;
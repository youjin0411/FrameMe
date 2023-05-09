import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom/client';
// npm install react-webcam
import Webcam from "react-webcam";
// 필터 
import { grayscaleFilter, brightnessFilter} from './filters.js';

// 비디오
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

// 사진 촬영 후 이미지 편집(필터 설정 등 )
const ImageEditor = (props) => {
    const canvasRef = useRef();
    const applyFilter = (filterFunction) => {
        var canvas = canvasRef.current;
        var ctx = canvas.getContext('2d');
        var image = new Image(245, 157);
        image.src = props.imageSrc;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        var pixels = ctx.getImageData(0,0, canvas.width, canvas.height);
        var filteredData = filterFunction(pixels);
        ctx.putImageData(filteredData, 0 , 0);
    }
    
    return (
    <div style={{display:'grid', gridTemplateColumns: '245px 245px'}}>
        <img src={props.imageSrc} />
        <canvas ref={canvasRef} width="320" height="180" />
        <br />
        <button onClick={() => { applyFilter(grayscaleFilter) }}>invert</button>
        <button onClick={() => { applyFilter(brightnessFilter) }}>grayscale</button>
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
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            // console.log(imageSrc)
            // console.log(typeof(imageSrc))
            // https://dev-momo.tistory.com/entry/Javascript-Image-Filter-%EB%A7%8C%EB%93%A4%EA%B8%B0
            setImages(imgs => imgs.concat(imageSrc))
            setCount(c => {
                if(c === maxCount) setShowResult(true);
                return c + 1
            })
    }, [webcamRef]);

    if(showResult) {
        return (
            <>
                <div>
                    {/* images.map(i => <div><img style={{ width: 320, height: 180 }} src={i} /></div>) */}
                    { images.map(i => <ImageEditor imageSrc={i} /> )}
                </div>
                <button onClick={() => {
                    setCount(1);
                    setShowResult(false);
                    setImages([]);
                }}>다시 찍기</button>
            </>
        )
    }

    return (
        <div>
            <div style={{margin:'0 auto', background:'white', width: 1820, height:900, left: 50, top: 180, backgroundBlendMode: 'overlay', borderRadius: '30px 30px 0px 0px', boxShadow:'0px 0px 2px 2px #F5F5F5', marginTop:100}}>
            <div style={{display:'flex', justifyContent:'center', alignItems: 'center', fontSize: 40}}>{`${count}/${maxCount}`}</div>
            <div style={{display:'flex', justifyContent:'center', alignItems: 'center', fontSize: 70}}>Hello</div>
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
            <button onClick={capture}>Capture photo</button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<WebcamApp />)

export default WebcamApp;
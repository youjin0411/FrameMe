import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom/client';
// npm install react-webcam
import Webcam from "react-webcam";
import { grayscaleFilter, brightnessFilter} from './filters.js';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const ImageEditor = (props) => {
    const canvasRef = useRef();
    const applyFilter = (filterFunction) => {
        var canvas = canvasRef.current;
        var ctx = canvas.getContext('2d');
        var image = new Image(320, 180);
        image.src = props.imageSrc;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        var pixels = ctx.getImageData(0,0, canvas.width, canvas.height);
        var filteredData = filterFunction(pixels);
        ctx.putImageData(filteredData, 0 , 0);
    }
    
    return <div>
        <img src={props.imageSrc} />
        <canvas ref={canvasRef} width="320" height="180" />
        <br />
        <button onClick={() => { applyFilter(grayscaleFilter) }}>invert</button>
        <button onClick={() => { applyFilter(brightnessFilter) }}>grayscale</button>
    </div>
}

const WebcamApp = (props) => {
    const maxCount = 3;
    const [count, setCount] = useState(1);
    const [showResult, setShowResult] = useState(false);
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
            <h1>{`${count}/${maxCount}`}</h1>
            <Webcam
                style={{ width: 320, height: 180, background: "black" }}
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
            <br />
            <button onClick={capture}>Capture photo</button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<WebcamApp />)

export default WebcamApp;
import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import Mainframe1 from "../img/Mainframe1.png";

function App() {
  const divRef = useRef(null);
  const [scannedImage, setScannedImage] = useState(null);

  const handleScan = () => {
    if (divRef.current) {
      toPng(divRef.current)
        .then(function (dataUrl) {
          setScannedImage(dataUrl);
        });
    }
  };

  return (
    <div>
      <button onClick={handleScan}>Generate QR Code</button>
      <div ref={divRef}>
        <div className="target-div" style={{ backgroundImage: `url("${Mainframe1}")`, width: 100, height: 100 }}></div>
      </div>
      {scannedImage && (
        <div>
          <img src={scannedImage} alt="Scanned Image" />
          <a href={scannedImage} download>Download Image</a>
        </div>
      )}
    </div>
  );
}

export default App;

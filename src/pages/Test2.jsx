import React, { useState, useEffect } from 'react';

const ImageList = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // 서버로부터 이미지 경로 데이터를 가져오는 요청을 보냄
    fetch('http://localhost:3001/images')
      .then(response => response.json())
      .then(data => {
        // 이미지 URL들을 배열로 저장
        const urls = data.flatMap(imageObj => Object.values(imageObj));
        setImageUrls(urls);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{display: 'grid', gridTemplateColumns: '20px'}}>
      {imageUrls.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index}`}/>
      ))}
    </div>
  );
};

export default ImageList;
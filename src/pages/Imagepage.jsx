import React from 'react';

function Imagepage(props){
  // props 객체와 location 속성이 모두 존재하는지 확인
  if (!props || !props.location || !props.location.state || !props.location.state.imageSrcs) {
    return <div>이미지를 불러올 수 없습니다.</div>;
  }

  const images = props.location.state.imageSrcs;
  return (
    <div>
      {images.map((image, index) => (
        <div key={index}>
          <img
            width="200px"
            height="180px"
            src={image}
            alt={`captured-${index}`}
            className="w-100"
          />
        </div>
      ))}
    </div>
  );
}

export default Imagepage;

import React, { useState } from 'react';
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom"

function Write() {
  const navigate = useNavigate(); 
  const [nameValue, setNameValue] = useState('');
  const [impressionValue, setImpressionValue] = useState('');
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const { state } = useLocation();

  const handleCheckboxChange = (event) => {
    setIsChecked1(event.target.checked);
  };
  const handleCheckboxChange2 = (event) => {
    setIsChecked2(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  
  function handleClick() {
    navigate("/result", { 
      state: {
        frameimage: state,
        name: nameValue,
        review: impressionValue,
        gallery: isChecked1,
        qr: isChecked2,
      },
    });
  }
  const style2 = {
    width: 219.98, 
    height: 140.77,
    backgroundSize: 'cover'
  }

  const isButtonDisabled = !nameValue || !impressionValue;

  const storedImages = JSON.parse(localStorage.getItem('selectedImages'));

  console.log(localStorage.clear());

  return (
    <div>
      <h1>추억을 기록해보세요</h1>
      <div style={{ margin: '0 auto', background: 'white', width: 1820, height: 900, left: 50, top: 180, backgroundBlendMode: 'overlay', borderRadius: '30px 30px 0px 0px', boxShadow: '0px 0px 2px 2px #F5F5F5', marginTop: 70 }}>
        <div id="framee" style={{
         backgroundImage: state,
      }}>
      </div>
      <div style={{position: 'absolute', display: 'grid',left: 278, top: 326, gridRowGap: 10, rowGap: 9}}>
      <div style={{ ...style2, backgroundImage: `url(${storedImages[0]})` }} />
      <div style={{ ...style2, backgroundImage: `url(${storedImages[1]})` }} />
      <div style={{ ...style2, backgroundImage: `url(${storedImages[2]})` }} />
      <div style={{ ...style2, backgroundImage: `url(${storedImages[3]})` }} />
      </div>
        <form onSubmit={handleSubmit}>
          <h2 id="htext1" style={{
            position: 'relative',
            float: 'left',
            margin: '0 auto',
            top: '94px'
          }}>사진 이름</h2>
          <input
            id="Namep"
            placeholder="사진 이름을 작성해주세요"
            type="text"
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value);
            }}    
            style={{
              lineHeight: '20px',
              padding: '30px',
              width: '475px',
              height: '50px',
              left: '960px',
              top: '250px',
              backgroundBlendMode: 'overlay',
              borderRadius: '30px',
              margin: '131px 433px 348px 0px'
            }}
          />
          <h2 id="htext2" style={{
            position: 'relative',
            float: 'left',
            margin: '0 auto',
            top: '300px',
            left: '812px'
          }}>전시 소감</h2>
          <textarea
            id="Impressionp"
            placeholder="전시 소감을 작성해주세요. &#13;&#10;사진에 함께 들어갑니다."
            value={impressionValue}
            onChange={(e) => {
              setImpressionValue(e.target.value);
            }}    
            style={{
              padding: '30px',
              position: 'absolute',
              width: '475px',
              height: '110px',
              left: '960px',
              top: '250px',
              lineHeight: '20px',
              backgroundBlendMode: 'overlay',
              borderRadius: '30px',
              margin: '331px 433px 348px 0px'
            }}
          />
          <label
            style={{
              accentColor: '#617564'
            }}>
            <span id="checktx1">갤러리 전시</span>
            <input
              type="checkbox"
              id="check1"
              checked={isChecked1}
              onChange={handleCheckboxChange}
              style={{
                margin: '0 auto'
              }}
            />
          </label>
          <label
            style={{
              accentColor: '#617564'
          }}>
            <span id="checktx2">큐알코드</span>
            <input
              type="checkbox"
              id="check2"
              checked={isChecked2}
              onChange={handleCheckboxChange2}
              style={{
                margin: '0 auto'
              }}
            />
          </label>
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
              color: isButtonDisabled ? 'gray' : 'black',
            }}
            disabled={isButtonDisabled} 
            onClick={handleClick}
          >
          사진 받기 &nbsp;&nbsp;&nbsp;〉
          </button>
        </form>
      </div>
    </div>
  );
}

export default Write;

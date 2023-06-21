import React, { useState } from 'react';
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

function Write() {
  const navigate = useNavigate();
  const [nameValue, setNameValue] = useState('');
  const [impressionValue, setImpressionValue] = useState('');
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const { state } = useLocation();
  const [nameCharacterCount, setNameCharacterCount] = useState(0);

  const handleCheckboxChange = (event) => {
    setIsChecked1(event.target.checked);
  };

  const handleCheckboxChange2 = (event) => {
    setIsChecked2(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleNameInputChange = (event) => {
    const inputValue = event.target.value;
    setNameValue(inputValue);
    setNameCharacterCount(inputValue.length);
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
    width: 218,
    height: 141,
    backgroundSize: 'cover',
  };

  const isButtonDisabled = !nameValue || !impressionValue;

  const storedImages = JSON.parse(localStorage.getItem('selectedImages'));

  return (
    <div>
      <Text>추억을 기록해보세요</Text>
      <div
        style={{
          margin: '0 auto',
          background: 'white',
          width: 1820,
          height: 967,
          backgroundBlendMode: 'overlay',
          borderRadius: '30px 30px 0px 0px',
          boxShadow: '0px 0px 49px 3px #F5F5F5',
        }}
      >
        <div id="framee" style={{ backgroundImage: `url(${state}` }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '218px',
              height: '141px',
              rowGap: '7px',
              marginTop: 21,
              marginLeft: 21,
            }}
          >
            <div style={{ ...style2, backgroundImage: `url(${storedImages[0]})` }} />
            <div style={{ ...style2, backgroundImage: `url(${storedImages[1]})` }} />
            <div style={{ ...style2, backgroundImage: `url(${storedImages[2]})` }} />
            <div style={{ ...style2, backgroundImage: `url(${storedImages[3]})` }} />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 id="htext1">사진 이름</h2>
          <input
            id="Namep"
            placeholder="사진 이름을 작성해주세요"
            type="text"
            maxLength="7"
            autoComplete="off"
            value={nameValue}
            onChange={handleNameInputChange}
            style={{
              color: nameValue ? '#000000' : '#B7B7B7',
            }}
          />
          <span id="inputCnt">{nameCharacterCount} / 7</span>
          <h2 id="htext2">전시 소감</h2>
          <textarea
            id="Impressionp"
            placeholder="전시 소감을 작성해주세요. &#13;&#10;사진에 함께 들어갑니다."
            value={impressionValue}
            onChange={(e) => {
              setImpressionValue(e.target.value);
            }}
          />
          <label
            style={{
              accentColor: '#617564',
            }}
          >
            <span id="checktx1">갤러리 전시</span>
            <input
              type="checkbox"
              id="check1"
              checked={isChecked1}
              onChange={handleCheckboxChange}
              style={{
                margin: '0 auto',
              }}
            />
          </label>
          <label
            style={{
              accentColor: '#617564',
            }}
          >
            <span id="checktx2">큐알코드</span>
            <input
              type="checkbox"
              id="check2"
              checked={isChecked2}
              onChange={handleCheckboxChange2}
              style={{
                margin: '0 auto',
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

const Text = styled.div`
  font-family: 'Noto Serif';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: rgb(43, 43, 43);
  text-align: center;
  margin-bottom: 20px;
  margin-top: 40px;
`;

export default Write;

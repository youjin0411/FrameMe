import React from 'react';
import styled from 'styled-components';
function Loding(){
return (
  <Frames>
    <div>
      <Text>잠시 후 촬영이 시작됩니다.</Text>
    </div>
    </Frames>
  );
}
const Text = styled.div`
  position: absolute;
  width: 500px;
  height: 54px;
  left: 696px;
  top: 365px;

  font-family: 'Noto Serif';
  font-style: normal;
  font-weight: 540;
  font-size: 40px;
  line-height: 54px;

  color: #2B2B2B;
`;
const Frames = styled.div`
    position: absolute;
    margin: 0 auto;
    marginTop: 23px;
    background: white;
    width: 1820px;
    height: 967px;
    left: 50px;
    top: 180px;
    background-blend-mode: overlay;
    border-radius: 30px 30px 0px 0px;
    box-shadow: 0px 0px 49px 3px #F5F5F5;
    margin-top: -25px;
    `
export default Loding;
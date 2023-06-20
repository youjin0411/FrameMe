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
top: 20vw;
left: 37vw;
font-family: "Noto Serif";
font-style: normal;
font-weight: 540;
font-size: 2vw;
line-height: 5.4vw;
color: rgb(43, 43, 43);
`;
const Frames = styled.div`
position: absolute;
margin: 0 auto;
background: white;
width: 100%;
height: 51vw;
left: 0%;
top: 7.5vw;
background-blend-mode: overlay;
border-radius: 3vw 3vw 0 0;
box-shadow: 0px 0px 3.9vw 0.3vw #F5F5F5;
margin-top: 0.5vw;`;
export default Loding;
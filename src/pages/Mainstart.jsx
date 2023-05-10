/*
import React from 'react';
import mlogo from '../img/frameloginsmall.png'
import '../main.css';
function Mainstart(){
	
	return (
		<div id="background">
			<div id="backdrop">
				<div id="logo">
					<img src={mlogo} width="275" height="125" alt="logo"/>
				</div>
				<div id="btnSt">사진 촬영하기</div>
			</div>
		</div>
	);
}
export default Mainstart;
*/

import React from 'react';
import DropdownMenu from "../navbar/DropdownMenu"
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
// import image from '../img/framelogo'
import image2 from '../img/frameloginsmall.png'

function Mainstart(){
   
   return (
	  // 사진도 가윤이가 추가했을 것 같아서 !! backgroundColor로 일단 대처해서 코드 작성했어 ! 여기에 이제 backgroundColor대신 backgrondImage 사용하면 돼 ! ex) backgroundImage: `url(${Imagepage})` 
	  // 여기서 Imagepage => 위에서 import Imagepage from "경로"
	  <body style={{height: '100%', width: '100%',position: 'absolute', backgroundSize: 'cover', backgroundColor: 'pink'}}>
		 <Container>
		 <Nav>
			<Bars />
			<NavMenu>
			   <Logo to='/'>
				  <img src={image2} width="107" height="52" alt="logo" style={{ padding: '10px', paddingTop: '10px'}}/>
			   </Logo>
			   <Blank/>
			   <DropdownMenu />
			</NavMenu>
		 </Nav>
	  </Container>
		 <h1>메인화면</h1>   
	  </body>
   );
}
const Container = styled.div`
   height: 85px;
   width: 98%;
   margin: 0 auto;
`;

const Nav = styled.nav`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   width: 100vw;
   height: 80px;
   display: flex;
   justify-content: flex-end;
   margin: 0 auto;
   z-index: 12;
`;

const Logo = styled(Link)`
   color: #000000;
   text-decoration: none;
   margin-top: 10px;
`;

const Blank = styled.div`
   width: 45vw;
`

const NavMenu = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
width: 1920px;
column-gap: 100px;
@media screen and (max-width: 768px) {
   display: none;
}
`;

const Bars = styled(FaBars)`
display: none;
color: #808080;
@media screen and (max-width: 768px) {
   display: block;
   position: absolute;
   top: 0;
   right: 0;
   transform: translate(-100%, 75%);
   font-size: 1.8rem;
   cursor: pointer;
}

`;
export default Mainstart;
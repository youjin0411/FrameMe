import React from 'react';
import DropdownMenu from "../navbar/DropdownMenu"
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
// import image from '../img/framelogo'
import image2 from '../img/whitelogo.png'
import mainimg from '../img/Mainbg.png'

function Mainstart(){
   return (
	  <body style={{height: '100%', width: '100%',position: 'absolute', backgroundSize: 'cover', backgroundImage: `url(${mainimg})`}}>
		 <Container>
		 <Nav>
			<Bars />
			<NavMenu>
			   <Logo to='/'>
				  <img src={image2} width="107" height="52" alt="logo" style={{ padding: '10px', paddingTop: '10px'}}/>
			   </Logo>
			   <Blank/>
			   		<Wrapper>
							<Links href="/filming">PHOTO</Links>
							<Links href="/">네컷갤러리</Links>
		</Wrapper>
			</NavMenu>
		 </Nav>
	  </Container>
		 <div id="backdrop">
				<div id="logo">
					<img src={image2} width="275" height="125" alt="logo"/>
				</div>
				<div id="btnSt">사진 촬영하기</div>
			</div>
	  </body>
   );
}
const Container = styled.div`
   height: 85px;
   width: 98%;
   margin: 0 auto;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  column-gap: 44px;
  color: white;
  font-size: 15px;
  width: 220px;
`;

const Links = styled.a`
	font-family: 'Noto Serif';
  font-weight: 500;
  text-decoration: none;
  color: white;
  font-size: 15px;
  width: 50%;
  display: block;
  text-align: center;
  border-radius: 24px;
  box-shadow: 1px 1px 1px 1px ##BDBDBD;
  &:hover {
    transition: all .3s;
    border: 1px solid #ABBF98;
  }
`;
const Nav = styled.nav`	
	background-blend-mode: overlay;
	background-color: rgba( 0, 0, 0, 0.5 );
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
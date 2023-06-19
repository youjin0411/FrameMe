import React from 'react';
import DropdownMenu from './DropdownMenu';
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import image2 from '../img/frameloginsmall.png';

const Navbar = () => {
  return (
    <Container>
      <Nav>
        <Bars />
        <NavMenu>
          <Logo to='/'>
            <LogoImage src={image2} alt="logo" />
          </Logo>
          <Blank />
          <DropdownMenu />
        </NavMenu>
      </Nav>
    </Container>
  );
};

const Container = styled.div`
	height: 8vh;
  border-bottom: 0.05vw solid #656565;
  width: 98%;
  margin: 0 auto;
`;

const Nav = styled.nav`
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 8%;
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  z-index: 12;
`;

const Logo = styled(Link)`
  color: #000000;
  text-decoration: none;
  margin-top: 1%;
  width: 5%;
  height: auto;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  padding: 1%;
`;

const Blank = styled.div`
  
`;

const NavMenu = styled.div`
		display: flex;
    justify-content: space-evenly;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    column-gap: 19%;
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

export default Navbar;

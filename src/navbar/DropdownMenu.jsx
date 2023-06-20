import React from "react";
import styled from "styled-components";

const DropdownMenu = () => {
  return (
    <>
      <Wrapper>
        <Link href="/photoshoot">PHOTO</Link>
        <Link href="/Gallery">네컷갤러리</Link>
      </Wrapper>
    </>
  );
};

export default DropdownMenu;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  column-gap: 3%;
  color: white;
  font-size: 1.5vw;
  width: 22%;
`;

const Link = styled.a`
  font-weight: 520;
  font-family: "Noto Serif";
  text-decoration: none;
  color: black;
  font-size: 0.8vw;
  width: 27%;
  display: block;
  text-align: center;
  border-radius: 2vw;
  padding: 0.1vw 0.1vw;
  box-shadow: 0.3vw 0.3vw 2.3vw 0.3vw rgb(235 235 235);
    &:hover {
      transition: all 0.3s;
      border: 0.2vw solid #abbf98;
    }
`;

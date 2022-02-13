import React, { useState } from "react";
import styled from "styled-components";
import Board from "./Board";
import Menu from "./Menu";
import Counter from "./Counter";
import backgroundImage from "../Assets/Images/Background.jpg";

const Game = () => {
  const [shouldGameStart, setShouldGameStart] = useState(false);

  const startGame = () => {
    setShouldGameStart(true);
  };

  return (
    <Container>
      <Counter />
      <Menu shouldGameStart={shouldGameStart} startGame={startGame} />
      <Board shouldGameStart={shouldGameStart} />
    </Container>
  );
};

export default Game;

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(10px);
    z-index: 1;
  }
`;

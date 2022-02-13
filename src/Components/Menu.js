import React, { useEffect } from "react";
import styled from "styled-components";

const Menu = ({ shouldGameStart, startGame }) => {
  useEffect(() => {
    if (shouldGameStart) {
      document.getElementById("menu").style.visibility = "hidden";
      document.getElementById("menu").style.opacity = "0";
      document.getElementById("menu").style.transition =
        "visibility 1s ease-in-out, opacity 1s ease-in-out";
    }

    return () => {};
  }, [shouldGameStart]);

  return (
    <Container id="menu" shouldGameStart={shouldGameStart}>
      <Instructions>
        This is a card game in which all of the cards are laid face down. two
        cards are flipped face up over each turn. The objective of the game is
        to turn over pairs of matching cards. Good luck!
      </Instructions>
      <DifficultyLevel>
        <p>Difficulty Level:</p>
        <InputGroup>
          <CardsCountRadio type="radio" id="3by3" name="cardscount" value="3" />
          <CardsCountLabel htmlFor="3by3">3 × 3</CardsCountLabel>
        </InputGroup>

        <InputGroup>
          <CardsCountRadio
            type="radio"
            id="4by4"
            name="cardscount"
            value="4"
            defaultChecked
          />
          <CardsCountLabel htmlFor="4by4">4 × 4</CardsCountLabel>
        </InputGroup>

        <InputGroup>
          <CardsCountRadio type="radio" id="5by5" name="cardscount" value="5" />
          <CardsCountLabel htmlFor="5by5">5 × 5</CardsCountLabel>
        </InputGroup>
      </DifficultyLevel>
      <StartButton onClick={startGame}>Start</StartButton>
    </Container>
  );
};

export default Menu;

const Container = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  padding: min(5vw, 3em);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: min(5vh, 2em);
  z-index: 10;
  font-family: var(--font-family);
  font-size: min(10vw, 2rem);
  text-align: center;
  background-color: #000000ea;
  color: #e4fdfb;
`;

const Instructions = styled.p`
  width: 65%;
`;

const DifficultyLevel = styled.div`
  display: flex;
`;

const InputGroup = styled.div``;

const CardsCountLabel = styled.label`
  padding: 0.2em 1.5em;
  border-radius: 50px;
  cursor: pointer;
`;

const CardsCountRadio = styled.input`
  visibility: hidden;

  &:checked + ${CardsCountLabel} {
    font-weight: 600;
    background-color: #9cd3cd5c;
    box-shadow: 0px 0px 0px 3px #7eb6b0;
  }
`;

const StartButton = styled.button`
  width: 25%;
  padding: min(2vw, 0.1em) min(10vw, 1em);
  font-family: var(--font-family);
  font-size: min(10vw, 2.5rem);
  font-weight: 600;
  border: none;
  border-radius: 50px;
  background-color: #7eb6b0;
  color: #0f1312;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

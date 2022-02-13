import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Card from "./Card";

const Board = ({ shouldGameStart }) => {
  const [cardsData, setCardsData] = useState([]);
  const cardsDataRef = useRef();
  cardsDataRef.current = cardsData;
  const [flippedCards, setFlippedCards] = useState([]);

  const waitingTime = 5000;

  useEffect(() => {
    let tempData = [];
    [...Array(8).keys()].forEach((element, index) => {
      tempData.push(
        {
          id: index * 2,
          url: `https://picsum.photos/200?random=${index}`,
          code: index,
          isFlipped: true,
        },
        {
          id: index * 2 + 1,
          url: `https://picsum.photos/200?random=${index}`,
          code: index,
          isFlipped: true,
        }
      );
    });

    setCardsData(shuffleArray([...tempData]));

    let temp;
    setTimeout(() => {
      temp = [...cardsDataRef.current];
      temp.map((element) => (element.isFlipped = false));
      temp.forEach((element) => {
        document.getElementById(element.id).style.transform = "rotateY(180deg)";
      });
      temp.forEach(
        (element, index) =>
          (document.getElementById(element.id).style.transition = `transform ${
            index * 0.2
          }s ease-in-out`)
      );
    }, waitingTime);

    setTimeout(() => {
      setCardsData([...temp]);
    }, waitingTime + 3000);

    return () => {};
  }, []);

  const RevealCard = (e) => {
    const cardDiv = e.currentTarget;
    const id = parseInt(cardDiv.id);
    const flippedCard = cardsData.find((element) => element.id === id);

    if (
      !flippedCard.isFlipped &&
      flippedCards.length < 2 &&
      flippedCards.filter((element) => element.id === id).length === 0
    ) {
      flippedCard.isFlipped = true;
      setFlippedCards([...flippedCards, flippedCard]);
    }
  };

  useEffect(() => {
    let temp = [...cardsDataRef.current];
    // When two cards are flipped, check if they are the same
    console.log(flippedCards);
    if (flippedCards.length === 2) {
      // If they're the same
      if (flippedCards[0].code === flippedCards[1].code) {
        setFlippedCards([]);
        setCardsData([...temp]);
        setTimeout(() => {
          flippedCards.forEach(
            (element) =>
              (document.getElementById(element.id).style.boxShadow =
                "rgba(51, 63, 45, 0.16) 0px 1px 5px, rgb(51, 63, 45) 0px 0px 0px 3px")
          );
        }, 800);

        // If they're not the same
      } else {
        flippedCards.forEach((card) => {
          const index = temp.findIndex((element) => element.id === card.id);
          if (index !== -1) {
            temp.splice(
              index,
              1,
              Object.assign({ ...card }, { isFlipped: false })
            );
          }
        });

        setTimeout(() => {
          flippedCards.forEach((element) => {
            document.getElementById(element.id).style.transform =
              "rotateY(-180deg)";
            document.getElementById(
              element.id
            ).style.transition = `transform 0.5s ease-in-out`;
          });
        }, 1000);
        setTimeout(() => {
          setFlippedCards([]);
          setCardsData([...temp]);
        }, 1400);
      }
    }

    return () => {};
  }, [flippedCards]);

  return (
    <GameBoard>
      {shouldGameStart &&
        cardsData.map((card) => {
          return (
            <Card
              id={card.id}
              url={card.url}
              code={card.code}
              isFlipped={card.isFlipped}
              RevealCard={RevealCard}
              key={`${card.id}_${card.url}`}
            ></Card>
          );
        })}
    </GameBoard>
  );
};

export default Board;

// Functions
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Styles
const GameBoard = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: min-content;
  gap: 1em;
  z-index: 3;
`;

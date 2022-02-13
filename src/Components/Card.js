import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import CoverImage from "../Assets/Images/Cover.jpg";

const Card = ({ id, url, code, isFlipped, RevealCard }) => {
  useEffect(() => {
    document.getElementById(id).style.transform = isFlipped
      ? "rotateY(0deg)"
      : "rotateY(180deg)";
    document.getElementById(id).style.transition = isFlipped
      ? "transform 0.7s ease-in-out"
      : "none";
    return () => {};
  }, [isFlipped]);

  return (
    <Container>
      <CardBody id={id} isFlipped={isFlipped} onClick={(e) => RevealCard(e)}>
        <CardFront></CardFront>
        <CardBack url={url}></CardBack>
      </CardBody>
    </Container>
  );
};

export default Card;

// Styles
const Container = styled.div`
  background-color: transparent;
  width: min(20vw, 15em);
  height: min(20vw, 15em);
  perspective: 1000px;
`;

const CardBody = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transform-style: preserve-3d;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border-radius: 8px;
`;

const SharedStyles = `
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 8px;
`;

const CardFront = styled.div`
  ${SharedStyles};
  background-image: url(${CoverImage});
  background-size: cover;
  color: black;
  transform: rotateY(180deg);
`;

const CardBack = styled.div`
  ${SharedStyles};
  background-image: url(${(props) => props.url});
  background-size: cover;
`;

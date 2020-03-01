import React from "react";
import styled from "styled-components";

const CircleAssetContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(40, 1fr);
  grid-gap: 20px;
  width: 800px;
  position: absolute;
  top: 1000px;
  left: -50px;
  z-index: -1;
  height: 400px;
  overflow: hidden;

  .circle {
    background-color: rgb(54, 172, 184);
    border-radius: 50%;
    width: 10px;
    height: 10px;
    min-height: 10px;
    min-width: 10px;
  }
`;

const CircleAsset = () => (
  <CircleAssetContainer>
    {new Array(800).fill(0, 0, 800).map(item => (
      <div className="circle" />
    ))}
  </CircleAssetContainer>
);

export default CircleAsset;

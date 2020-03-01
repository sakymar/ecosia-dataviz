import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: ${props => props.color};
  color: ${props => props.fontColor};
  border-radius: 8px;
  display: flex;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 120px;

  .labelKpi {
    font-size: 14px;
    margin: 0;
    margin-top: 10px;
    text-align: center;
  }

  .valueKpi {
    font-size: calc(16px + 1.5vw);
    font-weight: 600;
    letter-spacing: 0.5px;
    margin: 0px;
  }

  .subValueKpi {
    margin: 0;
    margin-top: -10px;
    font-weight: normal;
    font-size: calc(10px + 0.5vw);
  }
`;

const Kpi = ({ label, value, color, fontColor, subValue, styles }) => (
  <StyledContainer color={color} fontColor={fontColor} style={styles}>
    <h3 className="valueKpi">{value}</h3>
    <h4 className="subValueKpi">{subValue}</h4>
    <p className="labelKpi">{label}</p>
  </StyledContainer>
);

export default Kpi;

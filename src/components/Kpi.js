import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: rgb(74, 192, 204);
  color: #236f78;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .labelKpi {
    font-size: 18px;
  }

  .valueKpi {
    font-size: calc(16px + 1vw);
    font-weight: bold;
    margin-top: 0px;
  }

  .subValueKpi {
    margin: 0;
    margin-top: -30px;
    font-weight: normal;
    font-size: calc(12px + 0.8vw);
  }
`;

const Kpi = ({ label, value, subValue }) => (
  <StyledContainer>
    <p className="labelKpi">{label}</p>
    <h3 className="valueKpi">{value}</h3>
    <h4 className="subValueKpi">{subValue}</h4>
  </StyledContainer>
);

export default Kpi;

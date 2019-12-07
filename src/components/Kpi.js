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
`;

const Kpi = ({ label, value }) => (
  <StyledContainer>
    <p className="labelKpi">{label}</p>
    <h3 className="valueKpi">{value}</h3>
  </StyledContainer>
);

export default Kpi;

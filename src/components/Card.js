import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const Card = ({ children }) => <StyledContainer>{children}</StyledContainer>;

export default Card;

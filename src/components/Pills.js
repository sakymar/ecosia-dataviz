import React from "react";
import styled from "styled-components";

const PillsContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  height: 26px;
  background-color: ${props => props.theme.colors["grey-six"]};
  color: ${props => props.theme.colors["dark"]};
  border-radius: 16px;
  font-family: ${props => props.theme.fonts.sfcompact_text};
  font-size: 10px;
  padding-top: 3.5px;
  padding-left: 4.6px;
  padding-right: 4.6px;
  padding-bottom: 3.5px;
  ${props => props.styles};
`;

const PillContainer = styled.div`
  height: 100%;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 16px;
  min-width: 29px;
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.active ? "white" : props.theme.colors["grey-six"]};

  &:hover {
    cursor: pointer;
  }
`;

const Pills = ({ options = [], onChange, styles }) => {
  return (
    <PillsContainer styles={styles}>
      {options.map((option, index) => (
        <PillContainer
          {...option}
          onClick={() => onChange(option)}
          key={`pill-${index}`}
        >
          {option.label}
        </PillContainer>
      ))}
    </PillsContainer>
  );
};

export default Pills;

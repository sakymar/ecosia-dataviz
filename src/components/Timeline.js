import React, { Component } from "react";
import styled from "styled-components";

const TimelineContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 350px;
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;

  > *:not(:last-child) {
    margin-right: 15px;
  }
`;

const TimelineElement = styled.div`

    background-color:${props => (props.active ? "red" : "black")};
    width:4px;
    height:40px;
    ${props => (props.index === props.currentHover ? "height:80px" : "")}
    
    ${props =>
      props.currentHover !== null &&
      (props.index === props.currentHover - 1 ||
        props.index === props.currentHover + 1)
        ? "height:67px"
        : ""}
    
    ${props =>
      props.currentHover !== null &&
      (props.index === props.currentHover + 2 ||
        props.index === props.currentHover - 2)
        ? "height:53px"
        : ""}

    &:hover{
        cursor: pointer;
    }
    position:relative;
    
    transition: height 0.25s;
    
    .cancel{
        position:absolute;
        width:16px;
        height:16px;
        font-size:10px;
        color:white;
        background-color:red;
        top:-20px;
        left:-8px;
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius:50%;
        text-align:center;
        line-height:12px;

        &:hover{
            cursor: pointer;
            opacity:0.8
        }
    }
`;

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: null,
      currentHover: null
    };
  }
  render() {
    const { dates } = this.props;
    const { currentDate, currentHover } = this.state;

    return (
      <TimelineContainer
        onMouseLeave={() => this.setState({ currentHover: null })}
      >
        {dates.map((item, index) => (
          <TimelineElement
            className="element"
            onMouseEnter={() => this.setState({ currentHover: index })}
            onClick={() => this.setState({ currentDate: index })}
            active={currentDate === index}
            currentHover={currentHover}
            index={index}
          >
            {currentDate === index && (
              <div
                className="cancel"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.setState({ currentDate: null });
                }}
              >
                <p style={{ marginTop: 5, marginRight: 0 }}>x</p>
              </div>
            )}
          </TimelineElement>
        ))}
      </TimelineContainer>
    );
  }
}

export default Timeline;

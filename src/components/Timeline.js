import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";

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
    margin-right: -5px;
  }
`;

const TimelineElement = styled.div`
  padding: 10px;



    &:hover {
    cursor: pointer;
  }
  position: relative;

  .visibleElement {
  border-radius:4px;
  transition: height 0.15s;
    background-color: ${props =>
      props.active ? " rgb(255, 121, 80)" : "#091C1F"};
    width: 4px;
    height: 40px;
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
  }

  .cancel {
    position: absolute;
    width: 16px;
    height: 16px;
    font-size: 10px;
    color: white;
    background-color: rgb(255, 121, 80);
    top: -12px;
    left: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    text-align: center;
    line-height: 12px;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }

  .label{
    position:absolute;
    bottom:-45px;
    left:-25px;
    color:black;
    width:90px;
    
    p{
      font-size:18px;
      font-family:Raleway;
      letter-spacing:1px;
      font-weight:bold;
    }
  }

  .labelActive{
    position:absolute;
    bottom:-35px;
    left:-30px;
    color:black;
    width:90px;
    
    p{
      font-size:20px;
      font-family:Raleway;
      letter-spacing:1px;
      font-weight:bold;
      color: rgb(255, 121, 80);
    }
  }

  .labelActiveAlways{
    position:absolute;
    bottom:-35px;
    left:-30px;
    color:black;
    width:90px;
    
    p{
      font-size:20px;
      font-family:Raleway;
      letter-spacing:1px;
      font-weight:bold;
      color: rgb(255, 121, 80);
    }
  }
`;

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHover: null
    };
  }
  render() {
    const { dates, currentDate, setCurrentDate } = this.props;
    const { currentHover } = this.state;

    return (
      <TimelineContainer
        onMouseLeave={() => this.setState({ currentHover: null })}
      >
        {[...dates].reverse().map((item, index) => (
          <TimelineElement
            className="element"
            onMouseEnter={() => this.setState({ currentHover: index })}
            onClick={() => setCurrentDate({ index, date: item })}
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
                  setCurrentDate({ index: null, date: null });
                }}
              >
                <p style={{ marginTop: 7, marginRight: 0 }}>x</p>
              </div>
            )}
            <div className="visibleElement"></div>
            {currentDate !== index && currentHover === index && (
              <div
                className={`label ${
                  currentDate === index ? "labelActive" : ""
                }`}
              >
                <p>{moment(item).format("MM / YY")}</p>
              </div>
            )}
            {currentDate === index && (
              <div
                className={`label ${
                  currentDate === index ? "labelActiveAlways" : ""
                }`}
              >
                <p>{moment(item).format("MM / YY")}</p>
              </div>
            )}
          </TimelineElement>
        ))}
      </TimelineContainer>
    );
  }
}

export default Timeline;

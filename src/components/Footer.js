import React from "react";
import styled from "styled-components";
import img from "../github.png";

import VisibilitySensor from "../VisibilitySensor";
import { Spring } from "react-spring/renderprops";

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  margin-top: 200px;
  margin-bottom: 0px;
  overflow: hidden;

  a {
    color: black;
    text-decoration: none;
    color: rgb(54, 172, 184);
  }

  font-family: Open-Sans;
  color: rgb(54, 172, 184);

  .footerItem {
    color: white;
    background-color: rgb(54, 172, 184);
    border-radius: 24px;
    padding: 0px 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
  }

  .footerItem:hover {
    opacity: 0.8;
  }

  p {
    font-weight: 600;
    font-size: 14px;
    color: white;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <svg
        style={{ position: "absolute", left: 0, bottom: 0, zIndex: -1 }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 300"
      >
        <path
          fill="#E6F2F2"
          fill-opacity="1"
          d="M0,192L40,186.7C80,181,160,171,240,160C320,149,400,139,480,160C560,181,640,235,720,218.7C800,203,880,117,960,106.7C1040,96,1120,160,1200,186.7C1280,213,1360,203,1400,197.3L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>

      <VisibilitySensor once>
        {({ isVisible }) => (
          <Spring
            config={{ duration: 300 }}
            delay={0}
            to={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)"
            }}
          >
            {props => (
              <a
                href="https://github.com/sakymar/ecosia-dataviz/blob/master/LICENSE"
                target="_blank"
                style={props}
              >
                <div className="footerItem">
                  <p>Not affiliated to Ecosia / License MIT</p>
                </div>
              </a>
            )}
          </Spring>
        )}
      </VisibilitySensor>
      <VisibilitySensor once>
        {({ isVisible }) => (
          <Spring
            config={{ duration: 300 }}
            delay={0}
            to={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)"
            }}
          >
            {props => (
              <div className="footerItem" style={props}>
                <a
                  href="https://www.linkedin.com/in/antoine-mesnil/"
                  target="_blank"
                >
                  <p>Made by Antoine Mesnil</p>
                </a>
              </div>
            )}
          </Spring>
        )}
      </VisibilitySensor>
      <VisibilitySensor once>
        {({ isVisible }) => (
          <Spring
            config={{ duration: 300 }}
            delay={0}
            to={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)"
            }}
          >
            {props => (
              <a
                href="https://github.com/sakymar/ecosia-dataviz"
                target="_blank"
                style={props}
              >
                <div className="footerItem">
                  <p>Open sourced on Github </p>
                  <img
                    src={img}
                    frameborder="0"
                    scrolling="0"
                    width="25px"
                    height="25px"
                    style={{ marginLeft: 5 }}
                  ></img>
                </div>
              </a>
            )}
          </Spring>
        )}
      </VisibilitySensor>
    </FooterContainer>
  );
};

export default Footer;

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  margin-left: 4%;
  margin-top: 200px;

  a {
    color: black;
    text-decoration: none;
  }
`;

const Footer = () => (
  <FooterContainer>
    <svg
      style={{ position: "absolute", left: 0, bottom: 0, zIndex: -1 }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path
        fill="#E6F2F2"
        fill-opacity="1"
        d="M0,192L40,186.7C80,181,160,171,240,160C320,149,400,139,480,160C560,181,640,235,720,218.7C800,203,880,117,960,106.7C1040,96,1120,160,1200,186.7C1280,213,1360,203,1400,197.3L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
      ></path>
    </svg>
    <p>Not affiliated to Ecosia</p>
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <a href="https://www.linkedin.com/in/antoine-mesnil/" target="_blank">
        <p>Made by Antoine Mesnil</p>
      </a>
      <a href="https://www.linkedin.com/in/antoine-mesnil/" target="_blank">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/1200px-Linkedin.svg.png"
          style={{ width: 20, height: 20, marginLeft: 10 }}
        />
      </a>
    </div>
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <a href="https://github.com/sakymar/ecosia-dataviz" target="_blank">
        <p>Open sourced on Github</p>
      </a>
      <iframe
        src="https://ghbtns.com/github-btn.html?user=sakymar&repo=ecosia-dataviz&type=star&count=true&size=large"
        frameborder="0"
        scrolling="0"
        width="170px"
        height="25px"
      ></iframe>
    </div>
  </FooterContainer>
);

export default Footer;

import React, { useState } from "react";
import "./App.css";
import data from "./data.json";
import moment from "moment";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";
import Card from "./components/Card";
import styled from "styled-components";
import Kpi from "./components/Kpi";
import BarChartCard from "./components/BarChartCard";
import test from "./test2.svg";
import Map from "./components/Map";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";
import CircleAsset from "./components/CircleAsset";
import StripeBackground from "./components/StripeBackground";
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "./VisibilitySensor";
import { animated, useSpring } from "react-spring";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10vh;
  width: 90%;
  margin-left: 5%;

  .containerKpi {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
`;

function getProgression(data, property) {
  return parseInt(
    (data[data.length - 1][property] / data[data.length - 13][property]) * 100,
    10
  );
}

function App() {
  let cumulatedTotal = 0;
  let cumulatedMoney = 0;
  const cumulatedData = [...data]
    .sort(
      (a, b) =>
        moment(a.date).format("YYYYMMDD") - moment(b.date).format("YYYYMMDD")
    )
    .map((item, index) => {
      cumulatedTotal += item.treePlanted;
      cumulatedMoney += item.income;
      return {
        ...item,
        treePlanted: cumulatedTotal,
        income: cumulatedMoney
      };
    });

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 1000 },
    delay: 1000
  });

  const progressionTrees = getProgression(cumulatedData, "treePlanted");
  const progressionIncome = getProgression(cumulatedData, "income");
  const [currentDate, setCurrentDate] = useState({ index: null, date: null });

  return (
    <div
      className="App"
      style={{
        position: "relative",
        zIndex: 2,
        paddingBottom: 5,
        marginBottom: 5
      }}
    >
      <animated.div style={fadeIn}>
        <img
          src={test}
          style={{
            opacity: 0.7,
            width: 1300,
            position: "absolute",
            right: -400,
            top: -400,
            zIndex: 0
          }}
        />

        <StyledContainer>
          <div>
            <Spring
              config={{ duration: 300 }}
              delay={1500}
              to={{
                opacity: 1,
                transform: "translateY(0)"
              }}
              from={{
                opacity: 0,
                transform: "translateY(-10px)"
              }}
            >
              {props => (
                <h1
                  style={{
                    fontWeight: 800,
                    letterSpacing: 2,
                    color: "#222",
                    ...props
                  }}
                >
                  ECOSIA
                  <span style={{ color: "rgb(74,192,204)" }}>DATAVIZ</span>
                </h1>
              )}
            </Spring>
            <Spring
              config={{ duration: 300 }}
              delay={1800}
              to={{
                opacity: 1,
                transform: "translateY(0)"
              }}
              from={{
                opacity: 0,
                transform: "translateY(-10px)"
              }}
            >
              {props => (
                <h3
                  style={{
                    width: "80%",
                    lineHeight: 1.4,
                    fontWeight: 600,
                    ...props
                  }}
                >
                  Hey, I'm Antoine. I gost frustrated to not see charts on
                  Ecosia's blog and I was bored, so I decided to do it.
                </h3>
              )}
            </Spring>
          </div>
          <div />

          <div className="containerKpi">
            <Spring
              config={{ duration: 300 }}
              delay={2000}
              to={{
                opacity: 1
              }}
              from={{
                opacity: 0
              }}
            >
              {props => (
                <Kpi
                  color="rgb(211, 218, 48)"
                  fontColor="rgb(130,130,20)"
                  label="Planted trees progress over the last 12 months "
                  value={`${progressionTrees} %`}
                  styles={props}
                />
              )}
            </Spring>
            <Spring
              config={{ duration: 350 }}
              delay={2100}
              to={{
                opacity: 1
              }}
              from={{
                opacity: 0
              }}
            >
              {props => (
                <Kpi
                  color="rgb(255, 121, 80)"
                  fontColor="rgb(153,72,47)"
                  label="Total number of planted trees"
                  value={`${cumulatedData[
                    cumulatedData.length - 1
                  ].treePlanted.toLocaleString("fr-FR")}`}
                  styles={props}
                />
              )}
            </Spring>
            <Spring
              config={{ duration: 350 }}
              delay={2100}
              to={{
                opacity: 1
              }}
              from={{
                opacity: 0
              }}
            >
              {props => (
                <Kpi
                  color="rgb(54, 172, 184)"
                  fontColor="rgb(0,100,100)"
                  label="Income progress over the last 12 months"
                  value={`${progressionIncome} %`}
                  styles={props}
                />
              )}
            </Spring>
            <Spring
              config={{ duration: 400 }}
              delay={2200}
              to={{
                opacity: 1
              }}
              from={{
                opacity: 0
              }}
            >
              {props => (
                <Kpi
                  color="rgb(0, 200, 171)"
                  fontColor="rgb(0,120,95)"
                  label="Surface equivalence"
                  value={`${Number(
                    cumulatedData[cumulatedData.length - 1].treePlanted /
                      500 /
                      100
                  )
                    .toFixed(0)
                    .toLocaleString("fr-FR")} Km²`}
                  subValue={`(${Number(
                    cumulatedData[cumulatedData.length - 1].treePlanted /
                      500 /
                      10000
                  ).toFixed(0)}x Paris size)`}
                  styles={props}
                />
              )}
            </Spring>
          </div>
          <div></div>
          <BarChartCard
            title="number of trees planted each month"
            data={data
              .map(item => ({
                ...item,
                value: item.treePlanted,
                name: moment(item.date).format("MM/YY")
              }))
              .sort(
                (a, b) =>
                  moment(a.date).format("YYYYMMDD") -
                  moment(b.date).format("YYYYMMDD")
              )}
          />
          <BarChartCard
            title="cumulated number of trees planted"
            data={cumulatedData
              .map(item => ({
                ...item,
                value: item.treePlanted,
                name: moment(item.date).format("MM/YY")
              }))
              .sort(
                (a, b) =>
                  moment(a.date).format("YYYYMMDD") -
                  moment(b.date).format("YYYYMMDD")
              )}
          />
          <BarChartCard
            title="revenues by month"
            data={data
              .map(item => ({
                ...item,
                value: item.income,
                name: moment(item.date).format("MM/YY")
              }))
              .sort(
                (a, b) =>
                  moment(a.date).format("YYYYMMDD") -
                  moment(b.date).format("YYYYMMDD")
              )}
          />
          <BarChartCard
            title="revenues by month"
            data={cumulatedData
              .map(item => ({
                ...item,
                value: item.income,
                name: moment(item.date).format("MM/YY")
              }))
              .sort(
                (a, b) =>
                  moment(a.date).format("YYYYMMDD") -
                  moment(b.date).format("YYYYMMDD")
              )}
          />
        </StyledContainer>
        <Map currentDate={currentDate} />
        <StripeBackground />
        <Timeline
          dates={data.map(item => item.date)}
          currentDate={currentDate.index}
          setCurrentDate={value => setCurrentDate(value)}
        />
        <Footer />
      </animated.div>
    </div>
  );
}

export default App;

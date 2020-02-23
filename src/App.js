import React from "react";
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

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5vh;

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
  const colors = [
    "rgb(211, 218, 48)",
    "rgb(54, 172, 184)",
    "rgb(255, 121, 80)",
    "rgb(0, 200, 171)"
  ];

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

  const progressionTrees = getProgression(cumulatedData, "treePlanted");
  const progressionIncome = getProgression(cumulatedData, "income");

  return (
    <div
      className="App"
      style={{ position: "relative", zIndex: 2, paddingBottom: 5 }}
    >
      <img
        src={test}
        style={{
          opacity: 0.7,
          width: 1500,
          position: "absolute",
          right: -500,
          top: -500,
          zIndex: 0
        }}
      />
      <h1>ECOSIA DATAVIZ</h1>
      <h3>
        Hey, I'm Antoine. I gost frustrated to not see graphs on Ecosia's blog
        and I was bored, so I decided to do it.
      </h3>
      <StyledContainer>
        <div className="containerKpi">
          <Kpi
            label="Progression d'arbres plantés sur les 12 derniers mois"
            value={`${progressionTrees} %`}
          />
          <Kpi
            label="Progression des revenues sur les 12 derniers mois"
            value={`${progressionIncome} %`}
          />
          <Kpi
            label="Nombre total plantés"
            value={`${cumulatedData[cumulatedData.length - 1].treePlanted}`}
          />
          <Kpi
            label="Equivalence en surface"
            value={`${Number(
              cumulatedData[cumulatedData.length - 1].treePlanted / 500 / 100
            ).toFixed(0)}Km²`}
            subValue={`${Number(
              cumulatedData[cumulatedData.length - 1].treePlanted / 500 / 10000
            ).toFixed(0)}x Paris size`}
          />
        </div>
        <div></div>
        <BarChartCard
          title="tree planted each month"
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
          title="cumulated number of trees"
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
      <Map />
      <Timeline dates={data.map(item => item.date)} />
      <Footer />
    </div>
  );
}

export default App;

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
import Map from "./components/Map";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5vh;

  .containerKpi {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }
`;

function getProgression(data) {
  return parseInt(
    (data[data.length - 1].treePlanted / data[data.length - 13].treePlanted) *
      100,
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
  const cumulatedData = [...data]
    .sort(
      (a, b) =>
        moment(a.date).format("YYYYMMDD") - moment(b.date).format("YYYYMMDD")
    )
    .map((item, index) => {
      cumulatedTotal += item.treePlanted;
      return {
        ...item,
        treePlanted: cumulatedTotal
      };
    });

  const progressionTrees = getProgression(cumulatedData);

  return (
    <div className="App">
      <h1>ECOSIA DATAVIZ</h1>
      <h3>
        Hey, I'm Antoine. I gost frustrated to not see graphs on Ecosia's blog
        and I was bored, so I decided to do it.
      </h3>
      <StyledContainer>
        <div className="containerKpi">
          <Kpi
            label="Progression des revenues sur les 12 derniers mois"
            value={`${progressionTrees} %`}
          />
          <Kpi
            label="Progression des revenues sur les 12 derniers mois"
            value={`${progressionTrees} %`}
          />
          <Kpi
            label="Progression des revenues sur les 12 derniers mois"
            value={`${progressionTrees} %`}
          />
          <Kpi
            label="Progression des revenues sur les 12 derniers mois"
            value={`${progressionTrees} %`}
          />
        </div>
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
      </StyledContainer>
      {/* <Map /> */}
    </div>
  );
}

export default App;

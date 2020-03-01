import React, { Component } from "react";
import styled from "styled-components";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer
} from "recharts";

const StyledContainer = styled.div`
  background-color: #fffff5;
  padding: 10px;
  border-radius: 8px;

  h3 {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 14px;
    margin-left: 65px;
  }

  .recharts-cartesian-grid-horizontal line {
    opacity: 0.4 !important;
  }

  .recharts-cartesian-axis line {
    stroke: grey;
    opacity: 0.7;
  }

  .XAxis .recharts-cartesian-axis-tick {
    margin-top: 10;
  }
`;

class BarChartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //value >= 1000000 ? value / 1000000 + " M" : value / 1000 + " K"

  transformTick(value) {
    const formattedTick = value.toFixed(0);
    return formattedTick >= 1000000
      ? (formattedTick / 1000000).toFixed(0) + " M"
      : (formattedTick / 1000).toFixed(0) + " K";
  }

  render() {
    const { data, title } = this.props;
    return (
      <StyledContainer>
        <h3>{title}</h3>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" minTickGap={30} tickMargin={5} />
            <YAxis
              width={60}
              domain={[0, dataMax => dataMax + dataMax / 10]}
              tickMargin={10}
              tickFormatter={value => this.transformTick(value)}
            />
            <Tooltip
              formatter={(value, name, props) =>
                Number(value).toLocaleString("fr-FR")
              }
            />
            <Bar
              dataKey="value"
              fill="#DA7F4E"
              strokeLinecap="round"
              barSize={20}
              animationDuration={2000}
            />
          </BarChart>
        </ResponsiveContainer>
      </StyledContainer>
    );
  }
}

export default BarChartCard;

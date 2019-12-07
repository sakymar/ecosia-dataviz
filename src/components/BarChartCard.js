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
import Card from "./Card";

const StyledContainer = styled.div``;

class BarChartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data, title } = this.props;
    return (
      <StyledContainer>
        <Card>
          <h3>{title}</h3>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name, props) =>
                  Number(value).toLocaleString("fr-FR")
                }
              />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </StyledContainer>
    );
  }
}

export default BarChartCard;

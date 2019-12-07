import React, { Component } from "react";
import styled from "styled-components";

import { StaticMap } from "react-map-gl";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";

const StyledContainer = styled.div``;

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2FreW1hciIsImEiOiJjazJ6eTl6cDQwMmZ2M25yY2R4N29rMmQ4In0.WRByp2Gxeb2Ofd2LgsBATg"; // eslint-disable-line

// Source data CSV
const DATA_URL =
  "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv"; // eslint-disable-line

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2
});

const INITIAL_VIEW_STATE = {
  longitude: -1.4157267858730052,
  latitude: 52.232395363869415,
  zoom: 6.6,
  minZoom: 2,
  maxZoom: 8,
  pitch: 40.5,
  bearing: -27.396674584323023
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const elevationScale = { min: 1, max: 50 };

class Map extends Component {
  static get defaultColorRange() {
    return colorRange;
  }

  constructor(props) {
    super(props);
    this.state = {
      elevationScale: elevationScale.min,
      data: []
    };
  }

  async componentWillMount() {
    await require("d3-request").csv(DATA_URL, (error, response) => {
      console.log("RESPONSE", response);
      if (!error) {
        const data = response.map(d => [Number(d.lng), Number(d.lat)]);
        this.setState({ data });
      }
    });
  }

  _renderLayers() {
    const { radius = 1000, upperPercentile = 100, coverage = 1 } = this.props;

    const { data } = this.state;

    return [
      new HexagonLayer({
        id: "heatmap",
        colorRange,
        coverage,
        data,
        elevationRange: [0, 3000],
        elevationScale: data && data.length ? 50 : 0,
        extruded: true,
        getPosition: d => d,
        onHover: this.props.onHover,
        opacity: 1,
        pickable: Boolean(this.props.onHover),
        radius,
        upperPercentile,

        transitions: {
          elevationScale: 3000
        }
      })
    ];
  }

  render() {
    const { mapStyle = "mapbox://styles/mapbox/dark-v9" } = this.props;
    return (
      <StyledContainer>
        <DeckGL
          layers={this._renderLayers()}
          effects={[lightingEffect]}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
        >
          <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>
      </StyledContainer>
    );
  }
}

export default Map;

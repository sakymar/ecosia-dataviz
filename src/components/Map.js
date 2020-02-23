import React, { Component } from "react";
import styled from "styled-components";

import { StaticMap } from "react-map-gl";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";
import dataEcosia from "../data.json";
import countries from "../countries.json";
import test from "../test.json";

const StyledContainer = styled.div`
  height: 500px;
  width: 90%;
  margin-left: 5%;
  margin-top: 40px;
  position: relative;
`;

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2FreW1hciIsImEiOiJjazJ6eTl6cDQwMmZ2M25yY2R4N29rMmQ4In0.WRByp2Gxeb2Ofd2LgsBATg"; // eslint-disable-line

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
  longitude: 0,
  latitude: 0,
  zoom: 2,
  minZoom: 1,
  maxZoom: 4,
  pitch: 30,
  bearing: 0
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const DATA_URL =
  "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv"; // eslint-disable-line

class Map extends Component {
  static get defaultColorRange() {
    return colorRange;
  }

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  formatData() {
    const formatedData = {};
    dataEcosia.forEach(entry => {
      if (entry.places) {
        entry.places.forEach(place => {
          if (!formatedData[place.name]) {
            formatedData[place.name] = { ...place };
            const dataCountry = countries.find(
              item => item.name === place.name
            );
            if (dataCountry) {
              formatedData[place.name].lat = Number(dataCountry.Latitude);
              formatedData[place.name].long = Number(dataCountry.Longitude);
            } else {
              console.log(place.name);
            }
          } else {
            formatedData[place.name].invested =
              formatedData[place.name].invested + place.invested;
          }
        });
      }
    });
    return Object.values(formatedData);
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
    const data = this.formatData();
    const testData = [];
    for (let place of data) {
      for (let i = 0; i < place.invested / 100; i++) {
        if (place.long) testData.push([place.long, place.lat]);
      }
    }
    console.log(testData);
    console.log(data);
    console.log(this.state.data);

    const megaTest = this.state.data.map((item, index) =>
      testData[index] ? testData[index] : item
    );

    return [
      new HexagonLayer({
        id: "heatmap",
        colorRange,
        data: testData,
        elevationRange: [0, 3000],
        elevationScale: testData && testData.length ? 1500 : 0,
        extruded: true,
        getPosition: d => d,
        onHover: this.props.onHover,
        opacity: 1,
        pickable: Boolean(this.props.onHover),
        radius: 100000,
        transitions: {
          elevationScale: 3000
        }
      })
    ];
  }

  render() {
    const { mapStyle = "mapbox://styles/mapbox/light-v9" } = this.props;
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

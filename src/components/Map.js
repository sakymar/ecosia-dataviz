import React, { Component } from "react";
import styled from "styled-components";

import { StaticMap } from "react-map-gl";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";
import dataEcosia from "../data.json";
import countries from "../countries.json";
import get from "lodash/get";
import Timeline from "./Timeline.js";

const StyledContainer = styled.div`
  height: 500px;
  width: calc(100% + 80px);
  margin-left: -40px;
  margin-top: 80px;
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
  zoom: 1.8,
  minZoom: 1,
  maxZoom: 1.6,
  pitch: 30
};

const colorRange = [
  [54, 172, 184],
  [0, 200, 171],
  [211, 218, 48],
  [255, 121, 80]
];

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

    const { currentDate } = this.props;
    let data = [...dataEcosia];
    console.log(data);
    if (currentDate && currentDate.date) {
      console.log(currentDate);
      data = data.filter(item => item.date === currentDate.date);
    }
    console.log("AFTER", data);
    data.forEach(entry => {
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

  _renderLayers() {
    const data = this.formatData();
    console.log("DATA", data);
    const testData = [];
    for (let place of data) {
      for (let i = 0; i < place.invested / 10000; i++) {
        if (place.long)
          testData.push({ ...place, position: [place.long, place.lat] });
      }
    }

    return [
      new HexagonLayer({
        id: "heatmap",
        colorRange,
        data: testData,
        elevationRange: [0, 3000],
        elevationScale: testData && testData.length ? 1500 : 0,
        extruded: true,
        getPosition: d => d.position,
        opacity: 1,
        pickable: true,
        radius: 100000,
        onHover: info =>
          this.setState({
            hoveredObject: info.object,
            pointerX: info.x,
            pointerY: info.y
          }),
        transitions: {
          elevationScale: 3000
        }
      })
    ];
  }

  _renderTooltip() {
    const { hoveredObject, pointerX, pointerY } = this.state || {};

    return (
      hoveredObject && (
        <div
          style={{
            position: "absolute",
            zIndex: 999,
            pointerEvents: "none",
            left: pointerX,
            top: pointerY,
            backgroundColor: "white",
            padding: "10px 20px",
            borderRadius: 8,
            fontFamily: "Open Sans"
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              fontFamily: "Raleway",
              letterSpacing: 1
            }}
          >
            {get(hoveredObject, "points[0].name")}
          </p>
          <p>
            {get(hoveredObject, "points[0].invested", 0).toLocaleString(
              "fr-FR",
              {
                currency: "EUR",
                style: "currency",
                maximumFractionDigits: 0,
                minimumFractionDigits: 0
              }
            )}
          </p>
        </div>
      )
    );
  }

  render() {
    const {
      mapStyle = "mapbox://styles/mapbox/outdoors-v11",
      dates
    } = this.props;
    return (
      <StyledContainer>
        <DeckGL
          layers={this._renderLayers()}
          effects={[lightingEffect]}
          initialViewState={INITIAL_VIEW_STATE}
          controller={{ scrollZoom: false }}
          scrollZoom={false}
        >
          <StaticMap
            scrollZoom={false}
            reuseMaps
            captureScroll={false}
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />

          {this._renderTooltip()}
        </DeckGL>
      </StyledContainer>
    );
  }
}

export default Map;

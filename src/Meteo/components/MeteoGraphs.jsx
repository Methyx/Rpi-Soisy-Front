// import { useState, useEffect } from "react";

import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";

import { CircularProgress } from "@mui/material";

// components
import MeteoGraph from "./MeteoGraph";

// style
import "../style/meteo-graphs.css";

const MeteoGraphs = ({ meteoData, isLoading }) => {
  return (
    <div className="meteo-graphs">
      {isLoading ? (
        <div className="wait">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className="meteo-graphs-content">
          <section className="graph-section1">
            <MeteoGraph
              meteoData={meteoData}
              syncId={"meteo"}
              dataXKey={"forecast"}
              dataYKey={"2_metre_temperature"}
              unit={"°C"}
              titleIcon={<ThermostatIcon />}
              title={"Températures"}
              color={"#eea29a"}
            />
            <MeteoGraph
              meteoData={meteoData}
              syncId={"meteo"}
              dataXKey={"forecast"}
              dataYKey={"precipitation"}
              unit={" mm"}
              titleIcon={<UmbrellaIcon />}
              title={"Précipitations"}
              color={"#36486b"}
            />
          </section>

          <section className="graph-section2">
            <MeteoGraph
              meteoData={meteoData}
              syncId={"meteo"}
              dataXKey={"forecast"}
              dataYKey={"10m_wind_speed"}
              unit={" km/h"}
              titleIcon={<AirIcon />}
              title={"Vent"}
              color={"#6B5B95"}
            />
            <MeteoGraph
              meteoData={meteoData}
              syncId={"meteo"}
              dataXKey={"forecast"}
              dataYKey={"cloud_cover"}
              unit={"%"}
              titleIcon={<CloudQueueIcon />}
              title={"Couvertue nuageuse"}
              color={"#80ced6"}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default MeteoGraphs;

import { useState, useEffect } from "react";
import { Button } from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

// components
import InputAddress from "../components/InputAddress";
import MeteoGraphs from "../components/MeteoGraphs";
import HamsterLoader from "../components/HamsterLoader";
import Map from "../components/Map";

// functions
import getGeoLocation from "../functions/getGeoLocation";
import getAddressByCoordinates from "../functions/getAddressByCoordinates";
import getMeteoForecast from "../functions/getMeteoForecast";

// Paris to init
const paris = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [2.347, 48.859],
  },
  properties: {
    label: "Paris",
    score: 0.9703654545454544,
    id: "75056",
    type: "municipality",
    name: "Paris",
    postcode: "75001",
    citycode: "75056",
    x: 652089.7,
    y: 6862305.26,
    population: 2145906,
    city: "Paris",
    context: "75, Paris, Île-de-France",
    importance: 0.67402,
    municipality: "Paris",
  },
};

// style
import "../style/meteo-page.css";

const MeteoPage = () => {
  const [location, setLocation] = useState(null);
  const [isLocated, setIsLocated] = useState(null);
  const [geoPosition, setGeoPosition] = useState([]);
  const [meteoData, setMeteoData] = useState({});
  const [isLoadingMeteoData, setIsLoadingMeteoData] = useState(true);
  const [meteoPointPosition, setMeteoPointPosition] = useState(null);
  const [meteoPointAddress, setMeteoPointAddress] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    getGeoLocation(setIsLocated, setGeoPosition);
  }, []);

  useEffect(() => {
    const initLocation = async () => {
      const geoLocation = await getAddressByCoordinates(
        geoPosition.lat,
        geoPosition.lng
      );
      if (geoLocation) {
        setLocation(geoLocation);
        setIsReady(true);
      }
    };
    if (isLocated === false) {
      setLocation(paris);
      setIsReady(true);
    } else if (isLocated) {
      initLocation();
    }
  }, [isLocated, geoPosition]);

  useEffect(() => {
    const getMeteoData = async () => {
      setIsLoadingMeteoData(true);
      const meteo = await getMeteoForecast([
        location.geometry.coordinates[1],
        location.geometry.coordinates[0],
      ]);
      setMeteoData(meteo);
      const meteoPoint = [meteo[0].position[1], meteo[0].position[0]];
      setMeteoPointPosition([meteoPoint[1], meteoPoint[0]]);
      if (meteoPoint) {
        const address = await getAddressByCoordinates(
          meteoPoint[1],
          meteoPoint[0]
        );
        if (address) {
          setMeteoPointAddress(address.properties.label);
        } else {
          setMeteoPointAddress("inconnu");
        }
      } else {
        setMeteoPointAddress("");
      }
      setIsLoadingMeteoData(false);
    };
    if (location) {
      getMeteoData();
    }
  }, [location]);

  return (
    <div className="meteo-page">
      <h1>La météo de précision de Météo France</h1>
      {isLocated === null ? (
        <div className="wait">
          <p>Recherche de votre position ... </p>
          <HamsterLoader />
        </div>
      ) : (
        <div className="meteo-page-content">
          {isReady && (
            <div className="meteo-container">
              <div className="location">
                <InputAddress
                  initValue={location?.properties?.label}
                  setLocation={setLocation}
                  validation={false}
                />
              </div>
              <h2>Point météo le plus proche : {meteoPointAddress}</h2>
              <Button
                className="show-map"
                color="secondary"
                variant="outlined"
                size="small"
                onClick={() => {
                  setIsMapVisible(!isMapVisible);
                }}
              >
                <p>{isMapVisible ? "Masquer la carte" : "Afficher la Carte"}</p>
                {isMapVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </Button>
              {isMapVisible && (
                <div className="map">
                  <Map
                    mapCenter={[
                      location.geometry.coordinates[1],
                      location.geometry.coordinates[0],
                    ]}
                    meteoPoint={meteoPointPosition}
                  />
                </div>
              )}
              <div className="meteo">
                <MeteoGraphs
                  meteoData={meteoData}
                  isLoading={isLoadingMeteoData}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MeteoPage;

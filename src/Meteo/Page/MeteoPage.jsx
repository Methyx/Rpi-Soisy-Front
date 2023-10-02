import { useState, useEffect } from "react";

// components
import InputAddress from "../components/InputAddress";
import MeteoGraphs from "../components/MeteoGraphs";
import HamsterLoader from "../components/HamsterLoader";

// functions
import getGeoLocation from "../functions/getGeoLocation";
import getAddressByCoordinates from "../functions/getAddressByCoordinates";
import getNearestMeteoPoint from "../functions/getNearestMeteoPoint";

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
  const [meteoPointPosition, setMeteoPointPosition] = useState(null);
  const [meteoPointAddress, setMeteoPointAddress] = useState("");
  const [isReady, setIsReady] = useState(false);

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
  }, [isLocated]);

  useEffect(() => {
    const getMeteoPoint = async () => {
      const meteoPoint = await getNearestMeteoPoint([
        location.geometry.coordinates[1],
        location.geometry.coordinates[0],
      ]);
      setMeteoPointPosition(meteoPoint);
      const address = await getAddressByCoordinates(
        meteoPoint[0],
        meteoPoint[1]
      );
      setMeteoPointAddress(address.properties.label);
    };
    if (location) {
      getMeteoPoint();
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
            <>
              <div className="location">
                <InputAddress
                  initValue={location?.properties?.label}
                  setLocation={setLocation}
                  validation={false}
                />
              </div>
              <h2>Point météo le plus proche : {meteoPointAddress}</h2>

              <div className="meteo">
                <MeteoGraphs position={meteoPointPosition} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MeteoPage;

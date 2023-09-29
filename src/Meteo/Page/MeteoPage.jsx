import { useState } from "react";

// components
import InputAddress from "../components/InputAddress";
import MeteoGraphs from "../components/MeteoGraphs";

// Paris
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
  const [location, setLocation] = useState(paris);
  return (
    <div className="meteo-page">
      <h1>La météo de précision de Météo France</h1>
      <div className="location">
        <InputAddress
          initValue={location?.properties?.label}
          setLocation={setLocation}
          validation={false}
        />
      </div>
      <div className="meteo">
        <MeteoGraphs
          position={[
            location?.geometry?.coordinates[1],
            location?.geometry?.coordinates[0],
          ]}
        />
      </div>
    </div>
  );
};

export default MeteoPage;

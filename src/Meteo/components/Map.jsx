// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// style
import "../style/map.css";

import centerIcon from "../img/marker-icon-blue.png";
import meteoIcon from "../img/marker-icon-purple.png";

const Map = ({ mapCenter, meteoPoint }) => {
  return (
    <MapContainer
      className="map-container"
      key={JSON.stringify(mapCenter)}
      center={mapCenter}
      zoom={12}
      maxZoom={18}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker
        position={mapCenter}
        icon={
          new Icon({
            iconUrl: centerIcon,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>Votre Position</Popup>
      </Marker>
      <Marker
        position={meteoPoint}
        icon={
          new Icon({
            iconUrl: meteoIcon,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>Point Météo</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesCOntext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const [lat, lng] = useUrlPosition();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isPositionLoading,
    position: geoLocation,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (geoLocation) setMapPosition([geoLocation.lat, geoLocation.lng]);
  }, [geoLocation]);
  useEffect(() => {
    console.log(lat);
    console.log(lng);
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);
  return (
    <div className={styles.mapContainer}>
      {!geoLocation && (
        <Button type={"position"} onClick={getPosition}>
          {isPositionLoading ? "Loading..." : "Get Current Location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            key={city.id}
            alt="this is the pointer"
            position={city.position}
          >
            <Popup>
              {city.emoji}
              {city.cityname} <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <ChangesCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangesCenter({ position }) {
  const map = useMap();
  map.setView(position);
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;

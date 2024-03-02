import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("form");
      }}
      className={styles.mapContainer}
    >
      Map
    </div>
  );
}

export default Map;

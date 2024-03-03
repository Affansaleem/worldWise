import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesCOntext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
function CityItem({ city }) {
  const { cityName, date, emoji, id, position } = city;
  const { CurrentCity, deleteCity } = useCities();

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
    console.log("City deleted!");
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === CurrentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lon=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;

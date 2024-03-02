import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
function CityList({ cities, isLoading }) {
  if (!cities.length)
    return <Message message={"Add your first city by clicking on the map"} />;
  return isLoading ? (
    <Spinner />
  ) : (
    <ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;

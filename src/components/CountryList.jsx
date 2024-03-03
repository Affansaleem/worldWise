import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesCOntext";
function CountryList() {
  const { cities, isLoading } = useCities();
  if (!cities.length)
    return <Message message={"Add your first city by clicking on the map"} />;

  const countries = cities.reduce((arr, cur) => {
    if (!arr.map((el) => el.country).includes(cur.country))
      return [...arr, { country: cur.country, emoji: cur.emoji }];
    else return arr;
  }, []);
  return isLoading ? (
    <Spinner />
  ) : (
    <ul className={styles.countriesList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountryList;

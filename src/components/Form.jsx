// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import { useAsyncValue, useNavigate } from "react-router-dom";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesCOntext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

function Form() {
  const { createCity, isLoading } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const [emoji, setemoji] = useState("");
  const [geoLoading, setgeoLoading] = useState(false);
  const [geoError, setgeoError] = useState("");

  useEffect(() => {
    async function fetchingCityData() {
      try {
        setgeoLoading(true);
        setgeoError("");
        const res = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error("That doesnot seem to be a city😁");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setemoji(data.countryCode);
      } catch (err) {
        setgeoError(err.message);
      } finally {
        setgeoLoading(false);
      }
    }
    fetchingCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }
  if (geoLoading) return <Spinner />;
  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map"} />;
  if (geoError) return <Message message={geoError} />;
  return (
    <form
      className={`${styles.form}${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <ReactCountryFlag countryCode={emoji} svg />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;

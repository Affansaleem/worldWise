import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import { useState, useEffect } from "react";
import Form from "./components/Form";

const BASE_URL = "http://localhost:8000";
function App() {
  const [cities, setcities] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    async function fetchCities() {
      try {
        setisLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setcities(data);
      } catch (err) {
        alert(err.message);
        console.log(err.message);
      } finally {
        setisLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}>
          Home{" "}
        </Route>
        <Route path="login" element={<Login />}>
          Login{" "}
        </Route>
        <Route path="product" element={<Product />}>
          Products{" "}
        </Route>
        <Route path="pricing" element={<Pricing />}>
          Products{" "}
        </Route>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to={"cities"} />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />}>
          Products{" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

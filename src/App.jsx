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
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesCOntext";
import { UserAuthenticationProvider } from "./contexts/UserAuthenticationContext";
function App() {
  return (
    <UserAuthenticationProvider>
      <CitiesProvider>
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
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />}>
              Products{" "}
            </Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </UserAuthenticationProvider>
  );
}

export default App;

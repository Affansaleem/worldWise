import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Homepage from "./Pages/Homepage";
// import Login from "./Pages/Login";
// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import AppLayout from "./Pages/AppLayout";
// import PageNotFound from "./Pages/PageNotFound";
import SpinnerFullPage from "./components/SpinnerFullPage";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesCOntext";
import { UserAuthenticationProvider } from "./contexts/UserAuthenticationContext";
import { Suspense, lazy } from "react";
const Homepage = lazy(() => import("./Pages/Homepage"));
const Login = lazy(() => import("./Pages/Login"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

function App() {
  return (
    <UserAuthenticationProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </UserAuthenticationProvider>
  );
}

export default App;

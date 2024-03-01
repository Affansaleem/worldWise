import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}>
          Home{" "}
        </Route>
        <Route path="/login" element={<Login />}>
          Login{" "}
        </Route>
        <Route path="/product" element={<Product />}>
          Products{" "}
        </Route>
        <Route path="/pricing" element={<Pricing />}>
          Products{" "}
        </Route>
        <Route path="*" element={<PageNotFound />}>
          Products{" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

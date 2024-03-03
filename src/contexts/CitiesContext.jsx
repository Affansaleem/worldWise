import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  CurrentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payLoad,
      };
    case "city/loaded":
      return { ...state, isLoading: false, CurrentCity: action.payLoad };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payLoad],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    default:
      throw new Error("Unknown action type");
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, CurrentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setcities] = useState([]);
  // const [isLoading, setisLoading] = useState(false);
  // const [CurrentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payLoad: data });
      } catch (err) {
        dispatch({ type: "rejected", payLoad: "Their was error Loading data" });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === CurrentCity.id) return;
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payLoad: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payLoad: "Their was error Loading cities",
        });
      }
    },
    [CurrentCity.id]
  );
  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payLoad: data });
    } catch (err) {
      dispatch({ type: "rejected", payLoad: "City not created" });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payLoad: id });
    } catch (err) {
      dispatch({ type: "rejected", payLoad: "City not deleted" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        getCity: getCity,
        CurrentCity: CurrentCity,
        createCity: createCity,
        deleteCity: deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("The context is only accessible inside the provider");
  return context;
}

export { CitiesProvider, useCities };

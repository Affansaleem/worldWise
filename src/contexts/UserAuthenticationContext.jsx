import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payLoad,
        isAuthenticated: true,
        error: false,
      };

    case "logout":
      return {
        ...initialState,
      };
    case "rejected":
      return {
        ...state,
        error: true,
      };

    default:
      throw new Error("No this type of actions available");
  }
}
const FAKE_USER = {
  name: "Affan Saleem",
  email: "example@gmail.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function UserAuthenticationProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payLoad: FAKE_USER });
    else {
      dispatch({ type: "rejected" });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  function rejected() {
    dispatch({ type: "rejected" });
  }
  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
        error: error,
        rejected: rejected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Place the Context inside the provider");
  console.log(context);
  return context;
}

export { UserAuthenticationProvider, useAuth };

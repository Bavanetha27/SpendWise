import { createContext, useEffect, useReducer, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token); // decode payload part of JWT
        const currentTime = Date.now() / 1000; // in seconds

        if (decoded.exp && decoded.exp > currentTime) {
          dispatch({ type: "LOGIN", payload: token });
        } else {
          // Token expired
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);
  if(!loading)
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
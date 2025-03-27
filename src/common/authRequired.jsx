import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

function AuthRequired({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accesstoken"));
  const location = useLocation();

  useEffect(() => {
    setAccessToken(localStorage.getItem("accesstoken"));
  }, [location]);

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children || <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "black" }}>Unauthorized</h1>;
}

export default AuthRequired;

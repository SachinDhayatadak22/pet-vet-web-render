
import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

function Unauthorized({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accesstoken"));
  const location = useLocation();

  useEffect(() => {
    setAccessToken(localStorage.getItem("accesstoken"));
  }, [location]);

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
}

export default Unauthorized;

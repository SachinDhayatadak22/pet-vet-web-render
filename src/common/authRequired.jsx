import { useLocation, Navigate } from 'react-router-dom';

function AuthRequired({ children }) {

  let accessToken = localStorage.getItem('accesstoken')
  let location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if(children)  {
      return children;
  }else{
    return <h1 style={{display:"flex",justifyItems:"center", alignItems:"center", color:"black"}}>Un authorised</h1>
  }
}

export default AuthRequired;

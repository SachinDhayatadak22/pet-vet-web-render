import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import MainRouter from './routes';
import { axiosApi } from './services/axios';
import { addUserAction, loginUser } from './reducers/userSlice';
import { useDispatch } from 'react-redux';


function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const dispatch = useDispatch()
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  
  const  getCurrentUser = async () => {
    const token = localStorage.getItem('refreshToken')
    console.log("token",token);
    
    await dispatch(addUserAction(token)).unwrap();
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <>
    <MainRouter/>
    </>
  );

}

export default App;

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import MainRouter from './routes';
import { axiosApi } from './services/axios';
import { addAdminAction, addVetAction , loginUser } from './reducers/userSlice';
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

  
  const  getCurrentAdmin = async () => {
    const token = localStorage.getItem('accesstoken')
    await dispatch(addAdminAction(token)).unwrap();
  }

  const  getCurrentVet = async () => {
    const token = localStorage.getItem('accesstoken')
    await dispatch(addVetAction(token)).unwrap();
  }

  useEffect(() => {
    getCurrentAdmin()
    getCurrentVet()
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

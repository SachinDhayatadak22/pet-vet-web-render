import React, { useEffect, useState } from 'react';
import Dashboard from '../pages/Dashboard/Dashboard';
import Appointments from '../pages/Appointments';
import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import Profile from '../pages/Profile';
import FormLayout from '../pages/Form/FormLayout';
import Settings from '../pages/Settings';

import PageLogin from '../pages/Authentication/PageLogin';
import PageSignUp from '../pages/Authentication/PageSignUp';
import { Outlet, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import PageTitle from '../components/PageTitle';
import { useSelector } from 'react-redux';
// import searchIcon from "../images/icon/search-icon.svg";

import AuthRequired from '../common/authRequired';
import Unauthorized from '../common/unAuthorized';
import VerifyEmailRegistration from '../pages/Authentication/VerifyEmailRegistration'
import PageForgetPasswordEmail from '../pages/Authentication/PageForgetPasswordEmail';
import PageForgetPasswordOTP from '../pages/Authentication/PageForgetPasswordOTP';
import PageResetPassword from '../pages/Authentication/PageResetPassword';
import ComingSoon from '../pages/ComingSoon';
import PetList from '../pages/PetList';
import ClinicalProfile from '../pages/ClinicalProfile/index.jsx';
import AddAppointment from '../pages/AddAppointment/index.jsx';
import AddPatient from '../pages/AddPatient/index.jsx';
import AddVets from '../pages/AddVets/index.jsx';
import VetProfile from '../pages/VetProfile/index.jsx';
import VetsList from '../pages/VetsList.jsx';

const AdminProtectedRoutes = [
  {
    path: '',
    component: <Home />,
    title: 'Landing Page | Pet Vet',
  },
  {
    path: '/dashboard',
    component: <Dashboard />,
    title: 'Dashboard | Pet Vet',
  },
  {
    path: 'clinic-profile',
    component: <ClinicalProfile />,
    title: 'Profile',
  },
  {
    path: '/vets/vet-profile',
    component: <VetProfile />,
    title: 'Vet Profile'
  },
  {
    path: '/appointments',
    component: <Appointments />,
    title: 'Appointments'
  },
  {
    path: '/pet-patients',
    component: <PetList />,
    title: 'Pet List | Pet Vet'
  },
  {
    path: 'appointments/add',
    component: <AddAppointment />,
    title: 'Add Appointment',
  },
  {
    path: '/pet-patients/add',
    component: <AddPatient />,
    title: 'Add Patience'
  },
  {
    path: '/vets',
    component: <VetsList />,
    title: 'Employee'
  },
  {
    path: '/vets/add',
    component: <AddVets />,
    title: 'Add Vets'
  },
  {
    path: 'local-tools',
    component: <ComingSoon />,
    title: 'Local Tools',
  },
  {
    path: 'settings',
    component: <ComingSoon />,
    title: 'Settings | Pet Vet',
  }
];

const userProtectedRoutes = [
  {
    path: '',
    component: <Dashboard />,
    title: 'Admin Dashboard | Pet Vet',
  },
  {
    path: 'settings',
    component: <Settings />,
    title: 'Settings | Pet Vet',
  },

];



const publicRoutes = [
  {
    path: '/login/admin',
    component: <PageLogin mode="admin" />,
    title: 'Sign in | Pet Vet',
  },
  {
    path: '/login',
    component: <PageLogin mode="vet" />,
    title: 'Sign in | Pet Vet',
  },
  {
    path: '/',
    component: <PageLogin mode="nurse" />,
    title: 'Sign in | Pet Vet',
  },
  {
    path: '/signup',
    component: <PageSignUp />,
    title: 'Signup | Pet Vet',
  },
  {
    path: "/forget-password",
    component: <PageForgetPasswordEmail />,
    title: ' Forget Password Email |  Pet Vet'
  },
  {
    path: `/verify-email-registration/:token`,
    component: <VerifyEmailRegistration />,
    title: ' Verify Email |  Pet Vet'
  },
  {
    path: `/verify-code/:token`,
    component: <PageForgetPasswordOTP />,
    title: ' Forget Password Code  |  Pet Vet'
  },
  {
    path: "/reset-password/:token",
    component: <PageResetPassword />,
    title: ' Reset Password |  Pet Vet'
  },
];

function MainRouter() {
  const { user } = useSelector(state => state.auth)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user])


  const isRoutePresent = (routes, path, userRole) => routes.some((route) => {
    return route.path === path && user?.role === userRole;
  });

  return (
    <>
      <DefaultLayout>
        <Routes>
          {publicRoutes.map((route, key) => (
            <Route
              key={key}
              path={route.path}
              element={
                <>
                  <PageTitle title={route.title} />
                  {route.component}
                </>
              }
            />
          ))}
          {userData?.role === 'admin'
            ? AdminProtectedRoutes.map((route, key) => (
              <Route
                key={key}
                path={route.path}
                element={
                  <AuthRequired>
                    <>
                      <PageTitle title={route.title} />
                      {route.component}
                    </>
                  </AuthRequired>
                }
              />
            ))
            : userProtectedRoutes.map((route, key) => (
              <Route
                key={key}
                path={route.path}
                element={
                  <AuthRequired path={route.path}>
                    <>
                      <PageTitle title={route.title} />
                      <Outlet />
                      {route.component}
                    </>
                  </AuthRequired>
                }
              />
            ))}

          <Route
            path="*"
            element={
              // If the path is in the defined routes but the user doesn't have access, show Unauthorized
              !isRoutePresent(
                userProtectedRoutes,
                window.location.pathname,
                'user',
              ) ||
                !isRoutePresent(
                  AdminProtectedRoutes,
                  window.location.pathname,
                  'admin',
                ) ? (
                <Unauthorized />
              ) : (
                <h1>404 - Page Not Found</h1>
              )
            }
          />
        </Routes>
      </DefaultLayout>
    </>
  );

}

export default MainRouter;

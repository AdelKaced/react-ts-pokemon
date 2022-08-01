import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

import AuthenticationService from './services/authentication-services';
  
// const PrivateRoute = ({ component: Component, ...rest }: any) => (
//   <Route {...rest} render={(props) => {
//     const isAuthenticated = AuthenticationService.isAuthenticated;
//     if (!isAuthenticated) {    
//       return <Redirect to={{ pathname: '/login' }} />
//     }
  
//     return <Component {...props} />
//   }} />
// );


const PrivateRoute= ({ redirectPath = '/login' }) => {
    if (!AuthenticationService.isAuthenticated) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  
  };


  
export default PrivateRoute;
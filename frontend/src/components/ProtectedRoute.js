import React, {useState} from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  return(
    props.loggedIn ? <Component {...props} /> : <Navigate to='/sign-in' replace/>
  );
}

export default ProtectedRoute;
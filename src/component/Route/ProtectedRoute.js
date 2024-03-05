// import React, { Fragment } from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Route, useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

// const ProtectedRoute = ({children }) => {
//   const { loading, isAuthenticated } = useSelector((state) => state.user);
//   console.log("Loading:", loading);
//   console.log("isAuthenticated:", isAuthenticated);
//   const location=useLocation();

 
//   return isAuthenticated ? (a
//     loading === false && <Navigate to="/login" state={{ from: location }} replace />
//   ) : (
//     children
//   );
// };

// export default ProtectedRoute;



// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Route } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   return (
//     <>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return <Navigate to="/login" />;
//             }

//             if (isAdmin === true && user.role !== "admin") {
//               return <Navigate to="/login" />;
//             }

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default ProtectedRoute;

import React from 'react'
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate=useNavigate();
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    navigate("/login");
  }
console.log("truenop")
  // if (isAdmin === true && user.role !== "admin") {
  //                navigate("/login");
  //               }
  return (
    isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
    
  );
};

export default ProtectedRoute;
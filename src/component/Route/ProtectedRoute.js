import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ProtectedRoute = ({children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  console.log("Loading:", loading);
  console.log("isAuthenticated:", isAuthenticated);
  const location=useLocation();

 
  return isAuthenticated ? (
    loading === false && <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    children
  );
};

export default ProtectedRoute;



// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Route } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   return (
//     <Fragment>
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
//     </Fragment>
//   );
// };

// export default ProtectedRoute;

// import React from 'react'
// import {useSelector} from "react-redux"
// import {Navigate, useLocation} from "react-router-dom"

// const ProtectedRoute = ({children}) => {
//     const user = useSelector((state) => state.user);
//     let location = useLocation();

//     if(!user.state.isAuthenticated) {
//         return <Navigate to="/login" state={{ from: location}} replace />
//     }
//  return children

// };

// export default ProtectedRoute;
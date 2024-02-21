import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import React from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import "overlay-navbar/dist/lib/ReactNavbar.min.css";
import store from "./store";
import { loadUser } from './actions/userAction.js';
import LoginSignup from './component/Users/LoginSignup.js';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/Users/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from "./component/Users/UpdateProfile.js"
import UpdatePassword from "./component/Users/UpdatePassword.js";
function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)
  // console.log(user);
  // console.log(isAuthenticated);
  React.useEffect(() => {
    WebFont.load({
      google: { "families": ["Roboto", "Droid Sans", "Chilanka"], },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignup />} />
        {/* <Route path="/account" element={<Profile />} /> */}
        {/* <Route><ProtectedRoute path="/account" element={<ProtectedRoute>} /></Route> */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
         <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

      </Routes>
      <Footer />
    </>
  );

}

export default App;


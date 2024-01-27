// import React from "react";
// import { ReactNavbar } from "overlay-navbar";
// // import ReactNavbar from "overlay-navbar/ReactNavbar";
// import logo from "../../../images/logo.png";


// const options = {
//   burgerColorHover: "#eb4034",
//   logo,
//   logoWidth: "20vmax",
//   navColor1: "white",
//   logoHoverSize: "10px",
//   logoHoverColor: "#eb4034",
//   link1Text: "Home",
//   link2Text: "Products",
//   link3Text: "Contact",
//   link4Text: "About",
//   link1Url: "/",
//   link2Url: "/products",
//   link3Url: "/contact",
//   link4Url: "/about",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#eb4034",
//   link1Margin: "1vmax",
//   profileIconUrl: "/login",
//   profileIconColor: "rgba(35, 35, 35,0.8)",
//   searchIconColor: "rgba(35, 35, 35,0.8)",
//   cartIconColor: "rgba(35, 35, 35,0.8)",
//   // cartIconUrl : "/cart",
//   cartIconSize:"2vmax",
//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
// };

// const Header = () => {
//   return <ReactNavbar {...options} />;
//   // return <ReactNavbar />;
// //   return <ReactNavbar
// //   logo="https://www.lunapic.com/editor/premade/transparent.gif"
// //   burgerColor="crimson"
// //   navColor1="#fff5f5"
// //   burgerColorHover="#900"
// //   logoWidth="50%"
// //   logoHoverColor="crimson"
// //   link1Size="1.2rem"
// //   link1Color="#121212"
// //   link1Padding="1vmax"
// //   link1ColorHover="crimson"
// //   nav2justifyContent="flex-end"
// //   link1Margin="1vmax"
// //   link2Margin="0"
// //   link3Margin="0"
// //   link4Margin="1vmax"
// //   nav3justifyContent="flex-start"
// //   link1Text="Home"
// //   link1Family="sans-serif"
// //   link2Text="Products"
// //   link3Text="About Us"
// //   link4Text="Contact Us"
// //   nav4justifyContent="flex-start"
// //   searchIconMargin="0.5vmax"
// //   cartIconMargin="1vmax"
// //   profileIconMargin="0.5vmax"
// //   searchIconColor="#121212"
// //   cartIconColor="#121212"
// //   profileIconColor="#121212"
// //   searchIconColorHover="crimson"
// //   cartIconColorHover="crimson"
// //   profileIconColorHover="crimson"
// // />
// };

// export default Header;
// Header.js
// Navbar.js
// Navbar.js
// Navbar.js
// Navbar.js
// Navbar.js
// Navbar.js
// Navbar.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  animation: ${fadeIn} 0.5s ease-in-out;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 20px; /* Adjust the top position */
    right: 20px; /* Adjust the right position */
    text-align: right; /* Align text to the right */

    .container {
      background-color: #333;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      animation: ${slideIn} 0.5s ease-in-out;

      li {
        margin: 20px;
        a {
          color: white;
          text-decoration: none;
          font-size: 24px;
          transition: color 0.3s ease-in-out;

          &:hover {
            color: #ff9900;
          }
        }

        .icon {
          color: white;
          font-size: 28px;
          margin: 0 10px;
          cursor: pointer;
          transition: color 0.3s ease-in-out;

          &:hover {
            color: #ff9900;
          }
        }
      }
    }
  }
`;

const ToggleButton = styled.button`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 24px;
  padding: 10px;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2;
  animation: ${fadeIn} 0.5s ease-in-out;

  &:hover {
    color: #ff9900;
  }
`;

const Header = () => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setOverlayOpen(!isOverlayOpen);
  };

  return (
    <header>
    <div>
      <ToggleButton onClick={toggleOverlay}>
        ☰
      </ToggleButton>
      <Overlay isOpen={isOverlayOpen}>
        <ul>
          <div className="container">
           
             <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
           <li><NavLink to="/products" activeClassName="active">Products</NavLink></li>
           <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
           <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
            <li><NavLink to="/cart" activeClassName="active"><span className="icon" role="img" aria-label="Cart Icon">🛒</span></NavLink></li>
            <li><NavLink to="/search" activeClassName="active"><span className="icon" role="img" aria-label="Search Icon">🔍</span></NavLink></li>
            <li><NavLink to="/login" activeClassName="active"><span className="icon" role="img" aria-label="Login Icon">🔑</span></NavLink></li> 
           
          </div>
        </ul>
      </Overlay>
    </div>
    </header>
  );
};

export default Header;


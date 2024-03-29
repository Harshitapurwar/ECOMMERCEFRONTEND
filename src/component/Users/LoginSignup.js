
import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignup.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login ,register} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// import { useDispatch} from "react-redux";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();
  
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  // console.log("name");

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  console.log("file");
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    avatar: null,
  });
  const registerSubmit = async(e) => {
    e.preventDefault();

    // setFormData({
    //   name:name,
    //   email:email,
    //   password:password,
    //   avatar:avatar,
    // })
    console.log(formData);
    dispatch(register(formData));
  };
  console.log("myform1");

  // const registerDataChange = (e) => {
  //   if (e.target.name === "avatar") {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvatarPreview(reader.result);
  //         setAvatar(reader.result);
  //       }
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   } else {
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //   }
  // };
  const registerDataChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === 'avatar') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const redirect = location.search ? location.search.split("=")[1] : "/account";
  // console.log("new1");

// const redirect = location.search ? new URLSearchParams(location.search).get("redirect") : "/account";
// const redirect = searchParams.get("redirect") || "/account";
  // console.log(dispatch, error, alert, navigate, isAuthenticated, redirect);
  useEffect(() => {
    console.log("inside useEffect")
    console.log(location.pathname);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate
    , isAuthenticated, redirect
  ]);
  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }
    
  //   if (isAuthenticated) {
  //     navigate(redirect);
  //   }
  // },[]
  // );
  // console.log("new2");
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={formData.name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={formData.password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                  
                </div>
               
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
  
};

export default LoginSignUp;

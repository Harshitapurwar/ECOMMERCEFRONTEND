import axios from "axios";

import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,LOAD_USER_FAIL,LOAD_USER_REQUEST,LOAD_USER_SUCCESS , LOGOUT_SUCCESS,
    LOGOUT_FAIL,UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET,UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL} from "../constants/userConstant";

//login
// export const login=(email,password) => async(dispatch)=>{
//     try{
//         dispatch({type:LOGIN_REQUEST});
//         const config={headers : {"Content-type" : "application/json"}};

//         const {data} = await axios.post(
//             `http://localhost:4000/api/v1/login`,
//             {email,password},
//             config
//         )
//         // const response = await axios.post(
//         //     `/api/v1/login`,
//         //     {email,password},
//         //     config
            
//         // );
//         const data=response.data;
//         console.log(data);
//         dispatch({type:LOGIN_SUCCESS,payload:data.user});
//     }catch(error){
//         dispatch({type:LOGIN_FAIL,payload:error.response.data.message});
//     }
// };
export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const {data} = await axios.post(
        `/api/v1/login`,
        { email, password },
        config
      );
      console.log("data",data);
    //   localStorage.setItem("token", data.token);
  
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
//register
console.log("try");
export const register=(userData) => async(dispatch)=>{
  console.log(userData);
    try{
        dispatch({type:REGISTER_USER_REQUEST});
        const config={headers : {"Content-type" : "multipart/form-data"}};
        console.log("register1");
        const {data} = await axios.post(`/api/v1/register`,
            userData,
            config
        );
        
        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user});
    }catch(error){
        dispatch({type:REGISTER_USER_FAIL,payload:error.response.data.message});
    }
};

//load user 
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};
//logout 
export const logout = () => async (dispatch) => {
    try {
      await axios.get(`/api/v1/logout`);
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  };

  //update profile
export const updateProfile=(userData) => async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST});
        const config={headers : {"Content-type" : "multipart/form-data"}};

        const {data} = await axios.put(
            `/api/v1/me/update`,
            userData,
            config
        );
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.user});
    }catch(error){
        dispatch({type:UPDATE_PROFILE_FAIL,payload:error.response.data.message});
    }
};
  
// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/update`,
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
//clearing errors
export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:"CLEAR_ERRORS"})
}
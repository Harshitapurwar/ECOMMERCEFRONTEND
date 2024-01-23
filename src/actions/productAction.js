import axios from "axios";
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, CLEAR_ERRORS} from "../constants/productConstants";

export const getProduct=()=>async (dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST});
        axios.defaults.baseURL = 'http://localhost:4000/api/v1';
        axios.defaults.withCredentials=true;
        const data= await axios.get("http://localhost:4000/api/v1/product");
        // console.log(data);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    }catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message,
        });
        console.log(error);
        
    }

};

//clearing errors
export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:"CLEAR_ERRORS"})
}
import axios from "axios";
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,CLEAR_ERRORS} from "../constants/productConstants";

export const getProduct=
    (keyword="", currentPage=1,price=[0,25000],category,ratings=0)=>
    async (dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST});
        // let link=`/api/v1/product?keyword=${keyword}&page=
        // ${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        let link = `http://localhost:4000/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            let link = `http://localhost:4000/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const {data}= await axios.get(link);
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
        // console.log(error); https://i.ibb.co/DRST11n/1.webp
        
    }

};

export const getProductDetails=(id)=>async (dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        // axios.defaults.baseURL = 'http://localhost:4000/api/v1';
        // axios.defaults.withCredentials=true;
        // const {data}= await axios.get(`/product/${id}`);
        const { data } = await axios.get(`/api/v1/product/${id}`);
        console.log(data);   
        console.log(data.message);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload:data.message,
        })
    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message,
        });
        // console.log(error); https://i.ibb.co/DRST11n/1.webp
        
    }

};

//clearing errors
export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:"CLEAR_ERRORS"})
}
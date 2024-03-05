// import { ADD_TO_CART } from "../constants/CartConstant";
// import  axios from 'axios';
// export const addItemsToCart = (id,quantity) => async (dispatch,getState) => {
//      const {data}=await axios.get(`/api/v1/product/${id}`);
//       dispatch({ type: ADD_TO_CART, 
//         payload:{
//         product: data.product._id,
//         name:data.product.name,
//         price:data.product.price,
//         image:data.product.images[0].url,
//         stock:data.product.Stock,
//         quantity,
//         },
//      });
//      localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
//     } ;
  
import { ADD_TO_CART } from "../constants/CartConstant";
import axios from 'axios';

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    
    if (!data || !data.product) {
      throw new Error("Product data not found");
    }
    
    const { product } = data;

    const cartItem = {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images && product.images.length > 0 ? product.images[0].url : "",
      stock: product.Stock,
      quantity,
    };

    dispatch({ type: ADD_TO_CART, payload: cartItem });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.error("Error adding item to cart:", error.message);
    // You can dispatch an action to handle the error (e.g., show an error message)
  }
};

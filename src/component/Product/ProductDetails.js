import React, { Fragment, useEffect } from 'react';
// import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css";
import { useSelector,useDispatch} from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import {useParams} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from "react-alert"
// import "react-responsive-carousel/lib/styles/carousel.min.css"; 
// import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import MetaData from '../layout/MetaData.js';
import { addItemsToCart } from '../../actions/cartActions.js';

const ProductDetails = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const dispatch = useDispatch();
    const alert=useAlert();
    const {id}=useParams();
    // Using optional chaining (?.) to safely access nested properties
    const { product, loading, error } = useSelector((state) => state.productsDetails) || {};
   
    
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"red",
        size:window.innerWidth<600?20:25,
        value:5,
        isHalf:true,
    };

   
    const [quantity,setQuantity]=useState(1);

    const increaseQuantity=()=>{
        if(product.stock <=quantity) return ;
    const qty=quantity+1;
    setQuantity(qty);
    }
    const decreaseQuantity=()=>{
        if(1>=quantity) return ;

        const qty=quantity-1;
        setQuantity(qty);
        }

    const addToCartHandler=()=>{
        dispatch(addItemsToCart(id,quantity));
        alert.success("Item added to cart")
    }

        console.log(product);
        useEffect(() => {
            if(error){
                alert.error(error);
                dispatch(clearErrors())
            }
            dispatch(getProductDetails(id));
        }, [dispatch, id,error,alert]);
    
  
    // console.log(product.images);
    return (
        <Fragment>
           {loading? <Loader/>:(
             <Fragment>
                  <MetaData title={`${product.name} -- ECOMMERCE`}/>
             <div className='ProductDetails'>
                
                 <div>
                    {/* <Carousel>
                        
                         {product?.images && product?.images.map((item, i) => (
                             <img
                                 className='CarouselImage'
                                 key={item.url}
                                 src={item.url}
                                 alt={`${i} Slide`}
                             />
                         ))}
                     </Carousel> */}
                      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 3,
            itemsToScroll: 3,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
      >
         {product?.images && product?.images.map((item, i) => (
                             <img
                                 className='CarouselImage'
                                 key={item.url}
                                 src={item.url}
                                 alt={`${i} Slide`}
                             />
                         ))}
      </ReactSimplyCarousel>
                 </div>
 
                 <div>
                     <div className='detailsBlock-1'>
                         <h2>{product?.name}</h2>
                         <p>Product # {product._id}</p>
                     </div>
                     <div className='"detailsBlock-2'>
                         <ReactStars {...options} />
                         <span>({product?.numOfReviews} Reviews)</span>
                     </div>
                     <div className='detailsBlock-3'>
                         <h1>{`Rs.${product?.price}`}</h1>
                         <div className='detailsBlock-3-1'>
                             <div className='detailsBlock-3-1-1'>
                                 <button onClick={decreaseQuantity}>-</button>
                                 <input readOnly type="number" value={quantity}/>
                                 <button onClick={increaseQuantity}>+</button>
                             </div>{" "}
                             <button onClick={addToCartHandler}>Add to Cart</button>
                         </div>
                         <p>
                             Status:
                             <b className={product?.Stock <1 ? "redColor" : "greenColor"}>
                                 {product?.Stock <1 ? "Out of Stock" : "InStock"}
                             </b>
                         </p>
                     </div>
                     <div className='detailsBlock-4'>
                         Description:<p>{product?.description}</p>
                     </div>
                     <button classname="submitReview">Submit Review</button>
                 </div>
             </div>
             <h3 className='reviewsHeading'>REVIEWS</h3>
             {product?.reviews && product?.reviews[0] ?(
                 <div className='reviews'>
                     {product?.reviews && product?.reviews.map((review)=> <ReviewCard review={review} />)}
                 </div>
             ) : (
                 <p classname="noReviews">No Reviews yet</p>
             )}
         </Fragment>
           )}
        </Fragment>
       
    );
};

// console.log("product1");

export default ProductDetails
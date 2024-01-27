import React, { useState ,Fragment} from 'react';
import {useNavigate} from 'react-router-dom';
import "./Search.css";
import MetaData from '../layout/MetaData';

const Search = () => {
    const navigate=useNavigate();
    const [keyword,setKeyword]=useState("");

    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate("/products");
        }
    }
  return (
   <Fragment>
    <MetaData title="Search A Product -- ECOMMERCE" />
    <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input
        type="text" placeholder='Search a product...'
        onChange={(e)=> setKeyword(e.target.value)}
        />
        <input type="Submit" value="Search" />
    </form>
  </Fragment>
  );
};

export default Search
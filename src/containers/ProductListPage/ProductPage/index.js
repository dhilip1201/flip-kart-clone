import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions";
import getParams from "../../../utils/getParams";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from "../../../components/UI/Card";


/**
 * @author
 * @function ProductPage
 **/

const ProductPage = (props) => {
  const params = getParams(props.location.search);
  const payload = {
    params,
  };

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const {page} = product;


  useEffect(() => {
    dispatch(getProductPage(payload));
  }, []);
  return <>
  
  <div style={{margin:"0 10px"}}>
  <h3>{page.title}</h3>
  <Carousel
  renderThumbs={()=>{}}
  >
  {
    page.banners && page.banners.map((banner, index) =>
    
    <a href={banner.navigateTo} key={index} style={{display:"block"}}>
        <img src={banner.img} />
    </a>
    

    )
  }
  </Carousel>
  <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap",margin:"10px 0"}}>
    {page.products && page.products.map((product, index) => 
    
      <Card key={index} style={{width:"400px",height:"201px", margin:"5px"}}>
      <img style={{width:"100%", height:"100%"}} src={product.img} alt=""/>
      </Card>
      
    
    )}
  </div>
  </div>
  
  </>;
};

export default ProductPage;

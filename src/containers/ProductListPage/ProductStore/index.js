import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../../actions";
import { Link } from "react-router-dom";

/**
 * @author
 * @function ProductStore
 **/

const ProductStore = (props) => {
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 25000,
  });
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  console.log(product);
  useEffect(() => {
    console.log(props);
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, []);
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="cardHeader">
              <div>
               
                {props.match.params.slug} Mobile under {priceRange[key]}
              </div>
              <button>View All</button>
            </div>
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <Link to={`${product.slug}/${product._id}/p`} style={{display:"block"}} className="productContainer">
                  <div className="productImgContainer">
                    <img src={product.productPictures[0].img} alt="" />
                  </div>
                  <div className="productInfo">
                    <div className="productTitle">{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>5535</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductStore;

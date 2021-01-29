import axiosInstance from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axiosInstance.get(`/products/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_ALL_PRODUCT_BY_SLUG_SUCCESS,
        payload: res.data,
      });
    }
    console.log(res);
  };
};

export const getProductPage = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
    const { cid, type } = payload.params;
    console.log("PAYLOAD_PARAMS", payload.params);
    const res = await axiosInstance.get(`/page/${cid}/${type}`);
    console.log("RESSSSSS", res);
    if (res.status === 200) {
      const { page } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
        payload: { page },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCT_PAGE_FAILURE,
        payload: { error },
      });
    }
  };
};

export const getProductDetailsById = (payload) => {
  return async dispatch => {
      dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
      let res;
      try {
          const { productId } = payload.params;
          console.log("PRODUCT_RES",productId);
          res = await axiosInstance.get(`/product/${productId}`);
          console.log("PRODUCT_RES",res);
          dispatch({
              type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
              payload: { productDetails: res.data.product }
          });

      } catch(error) {
          console.log(error);
          dispatch({
              type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
              payload: { error: res.data.error }
          });
      }

  }
}

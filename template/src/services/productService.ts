import API_CONSTANT from "@constants/apiConstant";
import { hasError } from "@redux/reducers/auth";
import { setLoading } from "@redux/reducers/common";
import { setProductDetail, setProducts } from "@redux/reducers/product";
import { AppDispatch } from "@redux/store";
import { get } from "./apiService";

// Products get API
const getProduct = (limit: Number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await get(`${API_CONSTANT.product}?limit=${limit}`);
      if (response.products) {
          dispatch(setProducts(response.products));
      } else {
        console.info(response?.message);
      }
    } catch (error) {
      console.error(error);
      dispatch(hasError(error as Error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Products details get API
const getProductDetails = (productId: Number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await get(`${API_CONSTANT.product}/${productId}`);
    if (response) {
        dispatch(setProductDetail(response));
    } else {
      console.info(response?.message);
    }
  } catch (error) {
    console.error(error);
    dispatch(hasError(error as Error));
  } finally {
    dispatch(setLoading(false));
  }
};

export { getProduct, getProductDetails };

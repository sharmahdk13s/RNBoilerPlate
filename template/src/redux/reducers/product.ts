import { HomeData, ProductsData } from "@models/HomeData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  productList: Array<HomeData>,
  productDetail: ProductsData | null,
  isLoading: boolean;
  error: Error | null;
}

const initialState: ProductState = {
  productList: [],
  productDetail: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Array<HomeData>>) => {
      state.productList = action.payload;
    },
    setProductDetail: (state, action: PayloadAction<ProductsData>) => {
      state.productDetail = action.payload;
    },
    hasError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setProductDetail, hasError } = productSlice.actions;

export default productSlice.reducer;

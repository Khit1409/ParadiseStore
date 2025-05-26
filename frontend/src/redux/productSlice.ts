import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState, ProductState } from "./globalState/productState";
import axios from "axios";

//get all product and get product with type product
export const getProduct = createAsyncThunk<
  ProductState[],
  { type: string; page: number; state: string; search: string },
  { rejectValue: string }
>("product/all", async ({ type, page, state, search }, thunkAPI) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/product?type=${type}&page=${page}&state=${state}&search=${search}`
    );
    if (response.data.resultCode) {
      return response.data.product;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        "Không thể lấy sản phẩm từ server , lỗi axios"
      );
    }
    return thunkAPI.rejectWithValue("Lỗi server");
  }
});
//slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProduct.rejected, (state) => {
        state.error = "Lỗi lấy sản phẩm từ server";
        state.loading = false;
      }),
});

export default productSlice.reducer;

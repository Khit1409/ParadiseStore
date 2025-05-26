// kiểu dữ liệu của sản phẩm
export interface ProductState {
  _id: string;
  name: string;
  price: number;
  img: string;
  description: string;
  attributes: Array<{
    id: string;
    name: string;
    value: Array<{ id: number; value: string | number }>;
  }>;
  type: string;
  state: string;
  sale: number;
  brands: string;
  shipCode: string;
  freeShip: boolean;
  flashShip: boolean;
  purchaseQuantity: number;
  totalQuantity: number;
  createAt: Date;
  updateAt: Date;
}
// kiểu trả về bên backend
export interface ResultResponse {
  message: string;
  resultCode: string;
}
//state reducer
export interface ProductInitalState {
  products: ProductState[] | null;
  loading: boolean;
  productDetail: ProductState | null;
  error: string | null;
}
export const initialState: ProductInitalState = {
  products: null,
  loading: false,
  productDetail: null,
  error: null,
};

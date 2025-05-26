export interface LoginResponse {
  resultCode: number;
  message: string;
}

// các trường users
export interface UserType {
  sub: string;
  email: string;
  gender: string;
  address: string;
  role: string;
  phone: string;
}

//các type dùng trong reducers
export interface AuthType {
  isLoggedIn: boolean | null;
  loading: boolean;
  users: UserType | null;
  error: string | null;
}
export const initialState: AuthType = {
  isLoggedIn: null,
  users: null,
  loading: false,
  error: null,
};

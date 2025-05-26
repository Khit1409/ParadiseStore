import { Request } from 'express';

//kiểu của decoded
export interface DecodedPayload {
  sub: string; //user id
  phone: number;
  email: string;
  role: string;
  gender: string;
  address: string;
}
//kiểu trả về check auth
export interface CheckAuthResult {
  users: DecodedPayload;
  resultCode: number;
}
//ép kiểu token
export interface AuthRequest extends Request {
  cookies: {
    token?: string;
  };
}

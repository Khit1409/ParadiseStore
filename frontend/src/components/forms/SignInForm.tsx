"use client";

import React, { useState } from "react";
import SignInButton from "../buttons/SignInButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/globalStore";
import { fetchLogin } from "@/redux/authSlice";

interface RequestType {
  signInput: string;
  password: string;
}

export default function SignInForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [request, setRequest] = useState<RequestType>({
    signInput: "",
    password: "",
  });

  //back

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const login = await dispatch(
        fetchLogin({
          signInput: request.signInput,
          password: request.password,
        })
      );
      if (fetchLogin.fulfilled.match(login)) {
        if (login.payload.resultCode == 1) {
          alert("thành công");
        }
      }
    } catch (error) {
      if (fetchLogin.rejected.match(error)) {
        alert("Thất bại!");
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col gap-2" onSubmit={handleLogin}>
        <div className="">
          <label htmlFor="signInput">Email or phone</label>
          <SignInButton
            placeholder="Input your email or number phone"
            type="text"
            onChange={handleOnchange}
            name="signInput"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <SignInButton
            type="password"
            placeholder="Input your password"
            onChange={handleOnchange}
            name="password"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-green-500 px-1 py-1 rounded font-semibold text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

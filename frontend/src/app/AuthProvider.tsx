"use client";

import { checkAuth } from "@/redux/authSlice";
import { AppDispatch, RootState } from "@/redux/globalStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, loading } = useSelector(
    (state: RootState) => state.auths
  );

  //check cookie haved token?
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  //routing with isloggedIn
  useEffect(() => {
    if (isLoggedIn == false) {
      router.push("/login");
    }
  }, [isLoggedIn, loading, router]);

  //loading effects
  if (loading == true) {
    return <p>Loading....</p>;
  }
  //return component if isloggedIn true
  return <div>{children}</div>;
}

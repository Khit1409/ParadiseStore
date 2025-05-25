"use client";

import { fetchLogout } from "@/redux/authSlice";
import { AppDispatch, RootState } from "@/redux/globalStore";
import { openResponsive } from "@/redux/menuSlice";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderMiddle() {
  const { responsive } = useSelector((state: RootState) => state.menus);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auths);
  //open resposive menu
  const handleOpenResponsive = () => {
    dispatch(openResponsive(!responsive));
  };

  //logout
  const handleLogout = async () => {
    try {
      const result = await dispatch(fetchLogout());
      if (fetchLogout.fulfilled.match(result)) {
        alert("Thành công");
      }
    } catch (error) {
      if (fetchLogout.rejected.match(error)) {
        alert("Thất bại");
      }
    }
  };
  return (
    <div className="py-2">
      <div className="px-2 flex justify-between items-center gap-2">
        <Link href={"/"}>
          {/* logo */}
          <Image
            height={50}
            width={50}
            src={
              "https://th.bing.com/th/id/OIP.WZRv_MHPmAlGbuMLmttjmgHaHa?w=183&h=183&c=7&r=0&o=7&cb=iwp2&dpr=1.3&pid=1.7&rm=3"
            }
            alt="logo"
          />
        </Link>
        <form className="relative w-1/2">
          <input
            type="text"
            className="text-center border-[1.5px] border-gray-400 rounded w-full outline-0 text-gray-600"
            placeholder="Search something"
          />
          <button className="absolute right-0 rounded-r bg-black text-white px-2 h-full ">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        {/* responsive / sign in / logout */}
        <div className="flex gap-2">
          <button
            className="border-gray-500 border-[1.5px] text-gray-500 md:hidden block px-2 rounded"
            onClick={handleOpenResponsive}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {isLoggedIn != null || isLoggedIn == true ? (
            <button
              onClick={handleLogout}
              className=" border-[1.5px] px-2 font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link
              href={"/login"}
              className="bg-cyan-500 px-2 font-bold text-white rounded"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

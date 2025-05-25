"use client";

import { fetchLogout } from "@/redux/authSlice";
import { AppDispatch, RootState } from "@/redux/globalStore";
import { openResponsive } from "@/redux/menuSlice";
import { navigationList } from "@/utils/globalList";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoggedIn } = useSelector((state: RootState) => state.auths);
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

  const { responsive } = useSelector((state: RootState) => state.menus);

  return (
    <div>
      <div>
        {/* desktop navigation */}
        <nav className="justify-center hidden md:flex">
          <ul className="flex gap-5">
            {navigationList.map((nav) => (
              <li key={nav.id} className="group relative">
                <Link href={nav.url} className="text-black font-semibold">
                  {nav.content}
                </Link>
                {/* dropdown menu */}
                {nav.dropdownMenu && nav.dropdownMenu.length > 0 && (
                  <ul className="absolute bg-white flex-col gap-2 dropdown-menu hidden group-hover:flex shadow p-2 rounded">
                    {nav.dropdownMenu?.map((drop) => (
                      <li key={drop.id}>
                        <Link href={drop.url} className="font-semibold">
                          {drop.content}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/*responsive navigation*/}
        {responsive && (
          <nav className="px-2 md:hidden overflow-y-auto">
            <ul className="flex flex-col gap-5">
              {navigationList.map((nav) => (
                <li key={nav.id}>
                  <Link
                    href={nav.url}
                    className="text-black font-semibold"
                    onClick={handleOpenResponsive}
                  >
                    {nav.content}
                  </Link>
                  {/* dropdown menu */}
                  <ul className="gap-5 flex flex-col bg-white px-2 py-2">
                    {nav.dropdownMenu &&
                      nav.dropdownMenu.length > 0 &&
                      nav.dropdownMenu?.map((drop) => (
                        <li key={drop.id}>
                          <Link
                            href={drop.url}
                            className="font-semibold"
                            onClick={handleOpenResponsive}
                          >
                            {drop.content}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
              {/* sign in / logout button */}
              {isLoggedIn != null || isLoggedIn == true ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-400 py-1 w-full font-semibold rounded"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    href={"/login"}
                    className="py-1 w-full rounded font-semibold text-black"
                    onClick={handleOpenResponsive}
                  >
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
        {/* navbar mobile end */}
      </div>
    </div>
  );
}

import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderMiddle from "./HeaderMiddle";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div className="px-2">
      <HeaderTop />
      <HeaderMiddle />
      <Navbar />
    </div>
  );
}

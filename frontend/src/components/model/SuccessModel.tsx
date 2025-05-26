"use client";

import React from "react";
interface Props {
  setModel: (value: boolean) => void;
}
export default function SuccessModel({ setModel }: Props) {
  return (
    setModel && (
      <div className="fixed h-screen bg-transparent flex items-center justify-center">
        <div className="bg-white">
          <p>Thành công</p>
          <p>Chúc mừng bạn thao tác thành công!</p>
          <button onClick={() => setModel(false)}>OK</button>
        </div>
      </div>
    )
  );
}

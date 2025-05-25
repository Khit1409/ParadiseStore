'use client'

import React from "react";

interface ButtonProps {
  placeholder: string;
  type: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function SignInButton({
  placeholder,
  type,
  name,
  onChange,
}: ButtonProps) {
  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      className="border-[1.5px] border-gray-500 outline-0 rounded w-full text-center"
      placeholder={placeholder}
    />
  );
}

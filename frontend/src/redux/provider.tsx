"use client";

import { Provider } from "react-redux";
import { globalStore } from "./globalStore";

interface Props {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: Props) {
  return <Provider store={globalStore}>{children}</Provider>;
}

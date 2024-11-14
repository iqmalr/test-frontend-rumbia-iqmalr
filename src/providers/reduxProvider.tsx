"use client";
import { store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";

export const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

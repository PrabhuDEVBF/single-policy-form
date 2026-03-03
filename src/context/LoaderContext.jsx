import React, { createContext, useState, useContext } from "react";
import Loader from "../components/common/Loader";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  return useContext(LoaderContext);
};

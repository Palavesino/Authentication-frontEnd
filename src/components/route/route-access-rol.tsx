import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  isRolPermited: boolean;


}

export function RouteAccessRole({ children, isRolPermited }: PrivateRouteProps) {
  return isRolPermited ? <>{children}</> : <Navigate replace to={"/unauthenticated"} />;
};
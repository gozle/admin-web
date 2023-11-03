import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RoutesPaths } from "@/lib/routes";
import { useAppSelector } from "@/hooks";

const AuthView = React.lazy(() => import("@/views/auth.view"));

const NotAuthRouter = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (isAuth) return null;

  return (
    <Suspense>
      <Routes>
        <Route path={RoutesPaths.SIGNIN} element={<AuthView />} />
        <Route
          path={RoutesPaths.ALL}
          element={<Navigate replace to={RoutesPaths.SIGNIN} />}
        />
      </Routes>
    </Suspense>
  );
};

export default NotAuthRouter;

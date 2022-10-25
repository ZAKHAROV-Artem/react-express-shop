import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import {
  adminRoutes,
  privateRoutes,
  publicRoutes,
  unAuthorizedRoutes,
} from "./../routes";
import NotFoundPage from "./../pages/NotFoundPage";
import { Context } from "./../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      {user.isAuth
        ? privateRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))
        : unAuthorizedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

      {user.user.role === "ADMIN" &&
        adminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
});
export default AppRouter;

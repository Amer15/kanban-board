import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/user-store";

const GuestRoute = () => {
  const isAuth = useUserStore((state) => state.is_auth);
  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default GuestRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/user-store";

const ProtectedRoute = () => {
  const isAuth = useUserStore((state) => state.is_auth);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

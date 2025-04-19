import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/home";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/notfound";
import ProtectedRoute from "./components/protected-route";
import GuestRoute from "./components/guest-route";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Homepage />
      }
    ]
  },
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

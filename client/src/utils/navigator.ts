import { NavigateFunction } from "react-router-dom";
import { useUserStore } from "../store/user-store";
import { toast } from "sonner";

let navigator: NavigateFunction;

export const setNavigator = (nav: NavigateFunction) => {
  navigator = nav;
};

export const navigateTo = (path: string, options?: { replace?: boolean }) => {
  if (!navigator) throw new Error("Navigator not initialized.");
  navigator(path, options);
};

export const logoutHandler = () => {
  const removeUser = useUserStore.getState().removeUser;
  removeUser();
  navigateTo("/login", { replace: true });
  toast.error("session expired! please login again");
};

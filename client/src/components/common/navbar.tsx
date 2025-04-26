import { LogOutIcon } from "lucide-react";
import { useUserStore } from "../../store/user-store";
import { navigateTo } from "../../utils/navigator";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);

  return (
    <header className="p-2 font-poppins border border-b-slate-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-sm md:text-xl text-slate-500 font-semibold">
          Kanban <span className="text-slate-900">Board</span>
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-xs md:text-base">{user?.full_name}</p>
          <button
            className="bg-slate-900 text-slate-100 px-5 py-2 rounded-full text-xs md:text-sm flex justify-center items-center gap-2 hover:bg-slate-800 transition-colors duration-200"
            onClick={() => {
              removeUser();
              navigateTo("/login", { replace: true });
            }}
          >
            <LogOutIcon size={15} />
            logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

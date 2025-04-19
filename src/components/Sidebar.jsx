import { Link, useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { useStore } from "../store/useStore";
import { FilesIcon, HistoryIcon, HouseIcon, LogInIcon, LogOutIcon, Settings2Icon, UserRound} from "lucide-react";

const Sidebar = () => {
  const { logout, isAuthenticated } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const iconStyle = (path) => `transition duration-100 p-1.5 rounded-4xl ${
    isActive(path)
      ? " bg-btn-primary1 text-white shadow-xl"
      : " hover:text-btn-primary1-hover bg-stone-500"
  }`;

  const handleLogout = () => {
    const confirm = window.confirm('Do you want to Log out?\nUnsaved changes will be lost.');
    if (confirm) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="h-screen w-[max(70px,5vw)] justify-items-center select-none bg-primary4 text-text-main1 flex flex-col p-1">
      <h2 className="text-5xl text-center tracking-widest font-mono font-bold mb-6">CH</h2>

      <nav className="flex flex-col mx-auto justify-around flex-1 my-20 gap-6">
        <Link to="/" className={iconStyle("/")}>
          <HouseIcon size={30} strokeWidth={1.25} />
        </Link>

        <Link to="/profile" className={iconStyle("/profile")}>
          <UserRound size={30} strokeWidth={1.25} />
        </Link>

        <Link to="/savedFiles" className={iconStyle("/savedFiles")}>
          <FilesIcon size={30} strokeWidth={1.25} />
        </Link>

        <Link to="/history" className={iconStyle("/history")}>
          <HistoryIcon size={30} strokeWidth={1.25} />
        </Link>

        <Link to="/settings" className={iconStyle("/settings")}>
          <Settings2Icon size={30} strokeWidth={1.25} />
        </Link>
      </nav>

      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="cursor-pointer mx-auto bg-red-500 hover:bg-red-600 p-2 rounded-xl transition duration-200"
        >
          <LogOutIcon size={30} strokeWidth={1.5} />
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="cursor-pointer bg-btn-primary1 hover:bg-btn-primary1-hover p-2 mx-auto rounded-xl transition duration-200"
        >
          <LogInIcon size={30} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
};

export default Sidebar;

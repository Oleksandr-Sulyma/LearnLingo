import { Link, NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useThemeStore } from "../../store/useThemeStore";
import Modal from "../Modal/Modal";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import Icon from "../Icon/Icon";
import { useFavoritesStore } from "../../store/useFavoritesStore";
import Button from "../Button/Button";

export default function Header() {
  const { user, logout } = useAuth();
  const [modalType, setModalType] = useState(null);

  const { theme, setTheme } = useThemeStore();
  const { clearFavorites } = useFavoritesStore();

  const closeModal = () => setModalType(null);

  const themeOptions = [
    { value: "yellow", label: "🟡" },
    { value: "blue", label: "🔵" },
    { value: "green", label: "🟢" },
    { value: "pink", label: "🌸" },
    { value: "orange", label: "🟠" },
  ];

  const navLinkStyles = ({ isActive }) =>
    `transition-colors hover:text-[var(--brand-color)] ${
      isActive ? "text-[var(--brand-color)]" : "text-gray-900"
    }`;

  const handleLogout = async () => {
    try {
      await logout();
      clearFavorites();
      toast.success("Goodbye! You have logged out.", {
        icon: "👋",
        style: {
          border: "2px solid var(--brand-color)",
          padding: "16px",
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Try again.");
    }
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);

    toast(`Theme changed to ${newTheme}!`, {
      icon: "🎨",
      position: "top-left",
      style: {
        borderRadius: "50px",
        fontSize: "14px",
      },
    });
  };

  return (
    <header className="py-5">
      <div className="header-container h-12 flex items-center justify-between">
        <div className="flex justify-between w-165 h-7">
          <Link to="/" className="flex items-center gap-2 w-33.25 h-7">
            <Icon id="icon-logo" width="28" height="28" />
            <span className="font-medium text-[20px] leading-[1.2] tracking-[-0.02em] text-[#121417]">
              LearnLingo
            </span>
          </Link>

          <nav className="flex gap-7 font-normal text-base">
            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>
            <NavLink to="/teachers" className={navLinkStyles}>
              Teachers
            </NavLink>
            {user && (
              <NavLink to="/favorites" className={navLinkStyles}>
                Favorites
              </NavLink>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4 font-bold">
          {!user ? (
            <>
              <button
                onClick={() => setModalType("login")}
                className="flex items-center gap-2 text-gray-900 hover:text-(--brand-color) transition-colors"
              >
                <Icon
                  id="icon-login"
                  width="20"
                  height="20"
                  className="text-(--brand-color)"
                />
                <span className="group-hover:text-(--brand-color) transition-colors">
                  Log in
                </span>
              </button>

              <Button
                width="166px"
                height="48px"
                bg="bg-[#121417]"
                textColor="text-[#fff]"
                btnText="Registration"
                onClick={() => setModalType("register")}
              />
            </>
          ) : (
            <div className="flex items-center gap-4 font-bold">
              <div className="flex items-center gap-4">
                <span className="font-medium text-[#121417]">
                  {user.displayName}
                </span>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-900 hover:text-(--brand-color) transition-colors"
                >
                  <Icon
                    id="icon-logout"
                    width="20"
                    height="20"
                    className="text-(--brand-color)"
                  />
                  <span className="group-hover:text-(--brand-color) transition-colors">
                    Log out
                  </span>
                </button>
              </div>
            </div>
          )}

          <select
            value={theme}
            onChange={handleThemeChange}
            className="bg-transparent cursor-pointer focus:outline-none text-xl ml-2"
          >
            {themeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <AnimatePresence>
        {modalType && (
          <Modal onClose={closeModal}>
            {modalType === "login" ? (
              <LoginForm onClose={closeModal} />
            ) : (
              <RegisterForm onClose={closeModal} />
            )}
          </Modal>
        )}
      </AnimatePresence>
    </header>
  );
}

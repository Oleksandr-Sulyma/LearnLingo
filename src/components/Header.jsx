import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Icon from "./Icon";
import Button from "./Button";

export default function Header() {
  const { user, logout } = useAuth();

  const navLinkStyles = ({ isActive }) =>
    `transition-colors hover:text-brand-yellow ${isActive ? "text-brand-yellow" : "text-gray-900"}`;

  return (
    <header className="py-5">
      <div className="header-container h-12 flex items-center justify-between">
        {/* Logo - Width: 133px, Height: 28px */}
        <div className="flex justify-between w-165 h-7">
          <Link to="/" className="flex items-center gap-2 w-33.25 h-7">
            <Icon id="icon-logo" width="28" height="28" />
            <span className="font-medium text-[20px] leading-[1.2] tracking-[-0.02em] text-[#121417]">
              LearnLingo
            </span>
          </Link>

          {/* Navigation */}
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

        {/* Auth Block */}
        <div className="flex items-center gap-4 font-bold">
          {!user ? (
            <>
              {/* Button Log in */}
              <button className="flex items-center gap-2 text-gray-900 hover:text-brand-yellow transition-colors">
                <Icon 
                  id="icon-login" 
                  width="20" 
                  height="20" 
                  className="text-brand-yellow" 
                />
                <span className="group-hover:text-brand-yellow transition-colors">Log in</span>
              </button>

              {/* Button Registration */}
              <Button
                width="166px"
                height="48px"
                bg="bg-[#121417]"
                textColor="text-[#fff]"
                btnText="Registration"
              />
            </>
          ) : (
            <div className="flex items-center gap-4 font-bold">
              <div className="flex items-center gap-4">
                <span className="font-medium text-[#121417]">{user.email}</span>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-gray-900 hover:text-brand-yellow transition-colors"
                >
                  <Icon
                    id="icon-logout"
                    width="20"
                    height="20"
                    className="text-brand-yellow"
                  />
                  <span className="group-hover:text-brand-yellow transition-colors">Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";


export default function Modal({ children, onClose }) {
  const modalRoot = document.querySelector("#modal-root");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!modalRoot) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-[rgba(18,23,23,0.5)] flex items-center justify-center z-[100]"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white w-[566px] min-h-[500px] rounded-[30px] p-[64px]">
        <button 
          onClick={onClose}
          className="absolute top-[20px] right-[20px] text-[#121417] hover:rotate-90 transition-transform"
        >
          <Icon id="icon-close" width="32" height="32" />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
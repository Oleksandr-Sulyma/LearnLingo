import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../Icon/Icon";

export default function Modal({ children, onClose, maxWidth = "566px" }) {
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
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-[rgba(18,23,23,0.5)]"
        onClick={handleBackdropClick}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 300,
          duration: 0.4 
        }}
        className="relative bg-white w-full rounded-[30px] flex flex-col overflow-hidden shadow-2xl"
        style={{ 
          maxWidth: maxWidth,
          maxHeight: "calc(100vh - 32px)"
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#121417] z-10 hover:rotate-90 transition-transform duration-300"
        >
          <Icon id="icon-close" width="32" height="32" />
        </button>

        <div className="overflow-y-auto p-8 sm:p-16 custom-scrollbar flex-1">
          {children}
        </div>
      </motion.div>
    </div>,
    modalRoot
  );
}
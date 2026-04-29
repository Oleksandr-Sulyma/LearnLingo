import { useState } from "react";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { useFavoritesStore } from "../../store/useFavoritesStore";
import { useFiltersStore } from "../../store/useFiltersStore";
import { useAuth } from "../../context/AuthContext";
import Modal from "../Modal/Modal";
import BookingForm from "../BookingForm/BookingForm";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

export default function TeacherCard({ teacher }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(teacher.id);
  const selectedLevel = useFiltersStore((state) => state.level);

  const {
    name,
    surname,
    languages,
    levels,
    rating,
    reviews,
    price_per_hour,
    lessons_done,
    avatar_url,
    lesson_info,
    conditions,
    experience,
  } = teacher;

  const handleHeartClick = () => {
    if (!user) {
      toast("Please log in to add teachers to your favorites", {
        icon: "⚠️",
        duration: 4000,
        style: {
          borderRadius: "12px",
          background: "#fff",
          color: "#121417",
          border: "2px solid var(--brand-color)",
          padding: "16px",
          fontWeight: "500",
        },
      });
      return;
    }
    toggleFavorite(teacher.id);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const Divider = () => (
    <Icon
      id="icon-divider"
      width="1"
      height="16"
      className="text-[rgba(18,20,23,0.2)]"
    />
  );

  return (
    <div className="animate-fade-in bg-white rounded-3xl p-6 flex gap-12 relative w-full font-['Roboto',sans-serif]">
      {/* Avatar Section */}
      <div
        className="relative w-30 h-30 p-3 border rounded-full shrink-0 flex items-center justify-center"
        style={{ borderColor: "var(--brand-color-light)" }}
      >
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="absolute top-4.5 right-4.5 w-3 h-3 bg-[#38CD3E] border-2 border-white rounded-full"></div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[#8A8A89] font-medium text-[16px] leading-normal mb-2">
              Languages
            </p>
            <h2 className="text-[24px] font-medium leading-none text-[#121417]">
              {name} {surname}
            </h2>
          </div>

          <div className="flex items-start gap-16">
            <div className="flex items-center gap-4 text-[16px] font-medium text-[#121417]">
              <div className="flex items-center gap-2">
                <Icon
                  id="icon-book"
                  width="16"
                  height="16"
                  className="text-black"
                />
                <span>Lessons online</span>
              </div>
              <Divider />
              <span>Lessons done: {lessons_done}</span>
              <Divider />
              <div className="flex items-center gap-2">
                <Icon
                  id="icon-star"
                  width="16"
                  height="16"
                  className="text-[#FFC531]"
                />
                <span>Rating: {rating}</span>
              </div>
              <Divider />
              <div className="whitespace-nowrap">
                Price / 1 hour:{" "}
                <span className="text-[#38CD3E]">{price_per_hour}$</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleHeartClick}
              className="shrink-0 hover:scale-110 transition-transform focus:outline-none"
            >
              <Icon
                id="icon-heart"
                width="26"
                height="26"
                className={`transition-all duration-200 ${
                  isFavorite
                    ? "fill-(--brand-color) stroke-(--brand-color)"
                    : "fill-none stroke-[#121417]"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-8 mb-4 text-[16px] font-medium leading-normal text-[#121417]">
          <p>
            <span className="text-[#8A8A89]">Speaks:</span>{" "}
            <span className="underline decoration-1 underline-offset-2">
              {languages.join(", ")}
            </span>
          </p>
          <p>
            <span className="text-[#8A8A89]">Lesson Info:</span> {lesson_info}
          </p>
          <p>
            <span className="text-[#8A8A89]">Conditions:</span>{" "}
            {conditions.join(" ")}
          </p>
        </div>

        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-[16px] font-medium leading-normal text-[#121417] underline mt-4 mb-8 transition-colors hover:text-(--brand-color)"
          >
            Read more
          </button>
        )}

        {isExpanded && (
          <div className="mt-4 animate-fade-in">
            <p className="text-[16px] leading-normal text-[#121417] mb-8 font-normal">
              {experience}
            </p>

            <div className="flex flex-col gap-8 mb-8">
              {reviews.map((review, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  <div className="flex gap-3 items-center">
                    <div
                      className="w-11 h-11 bg-[#F8F8F8] rounded-full flex items-center justify-center text-xl font-bold"
                      style={{ color: "var(--brand-color)" }}
                    >
                      {review.reviewer_name[0]}
                    </div>
                    <div>
                      <p className="text-[#8A8A89] text-[16px] font-medium">
                        {review.reviewer_name}
                      </p>
                      <div className="flex items-center gap-2">
                        <Icon
                          id="icon-star"
                          width="16"
                          height="16"
                          className="text-[#FFC531]"
                        />
                        <span className="text-[14px] font-medium">
                          {review.reviewer_rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[16px] font-medium leading-normal text-[#121417]">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-8">
          {levels.map((lvl, index) => {
            const isSelected = lvl === selectedLevel;

            return (
              <span
                key={index}
                className={`px-3 py-2 rounded-[15px] text-[14px] font-medium leading-[1.14] border transition-colors ${
                  isSelected
                    ? "border-transparent text-black" 
                    : "border-[rgba(18,20,23,0.2)] text-[#121417]" 
                }`}
                style={
                  isSelected ? { backgroundColor: "var(--brand-color)" } : {}
                }
              >
                #{lvl}
              </span>
            );
          })}
        </div>

        {isExpanded && (
          <div className="mt-8">
            <Button
              btnText="Book trial lesson"
              width="232px"
              height="60px"
              bg="bg-[var(--brand-color)]"
              className="text-[18px] font-bold transition-opacity hover:opacity-90"
              onClick={openModal}
            />
          </div>
        )}
      </div>

      {/* Modal Section */}
      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={closeModal} maxWidth="599px">
            <BookingForm teacher={teacher} onClose={closeModal} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
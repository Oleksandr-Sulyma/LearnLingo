import { useState } from "react";
import { useFavoritesStore } from "../../store/useFavoritesStore";
import { useAuth } from "../../context/AuthContext";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

export default function TeacherCard({ teacher }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(teacher.id);

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
      alert("This functionality is available only for authorized users");
      // прописати setIsModalOpen(true) для входу
      return;
    }

    toggleFavorite(teacher.id);
  };

  const Divider = () => (
    <Icon
      id="icon-divider"
      width="1"
      height="16"
      className="text-[rgba(18,20,23,0.2)]"
    />
  );

  return (
    <div className="bg-white rounded-[24px] p-6 flex gap-12 relative w-full font-['Roboto',_sans-serif]">
      <div
        className="relative w-[120px] h-[120px] p-3 border rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ borderColor: "var(--brand-color-light)" }} 
      >
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className="w-[96px] h-[96px] rounded-full object-cover"
        />
        <div className="absolute top-[18px] right-[18px] w-3 h-3 bg-[#38CD3E] border-2 border-white rounded-full"></div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[#8A8A89] font-medium text-[16px] leading-[1.5] mb-2">
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
              className="flex-shrink-0 hover:scale-110 transition-transform focus:outline-none"
            >
              <Icon
                id="icon-heart"
                width="26"
                height="26"
                className={`transition-all duration-200 ${
                  isFavorite
                    ? "fill-[var(--brand-color)] stroke-[var(--brand-color)]"
                    : "fill-none stroke-[#121417]"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-8 mb-4 text-[16px] font-medium leading-[1.5] text-[#121417]">
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
            className="text-[16px] font-medium leading-[1.5] text-[#121417] underline mt-4 mb-8 transition-colors hover:text-[var(--brand-color)]"
          >
            Read more
          </button>
        )}

        {isExpanded && (
          <div className="mt-4 animate-fade-in">
            <p className="text-[16px] leading-[1.5] text-[#121417] mb-8 font-normal">
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
                  <p className="text-[16px] font-medium leading-[1.5] text-[#121417]">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-8">
          {levels.map((level, index) => (
            <span
              key={index}
              className={`px-3 py-2 rounded-[15px] text-[14px] font-medium leading-[1.14] border transition-colors ${
                index === 0
                  ? "border-transparent"
                  : "border-[rgba(18,20,23,0.2)] text-[#121417]"
              }`}
              style={
                index === 0 ? { backgroundColor: "var(--brand-color)" } : {}
              }
            >
              #{level}
            </span>
          ))}
        </div>

        {isExpanded && (
          <div className="mt-8">
            <Button
              btnText="Book trial lesson"
              width="232px"
              height="60px"
              bg="bg-[var(--brand-color)]" 
              className="text-[18px] font-bold transition-opacity hover:opacity-90"
              onClick={() => console.log("Open booking modal")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

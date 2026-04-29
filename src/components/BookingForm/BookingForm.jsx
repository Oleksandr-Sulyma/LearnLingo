import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useFiltersStore } from "../../store/useFiltersStore";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

const schema = yup.object().shape({
  reason: yup.string().required("Please select a reason"),
  language: yup.string().required("Please select a language"),
  fullName: yup.string().required("Full name is required").min(2, "Too short"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+]+$/, "Only digits and '+' are allowed")
    .min(10, "Too short"),
});

export default function BookingForm({ teacher, onClose }) {
  const selectedFilterLanguage = useFiltersStore((state) => state.language);
  const showLanguageSelect =
    !selectedFilterLanguage && teacher.languages.length > 1;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: "Career and business",
      language:
        selectedFilterLanguage ||
        (teacher.languages.length === 1 ? teacher.languages[0] : ""),
    },
  });

  const selectedReason = watch("reason");

  const onError = (errors) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill in all required fields", {
        style: {
          border: "1px solid #ef4444",
          padding: "16px",
          color: "#ef4444",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fff",
        },
      });
    }
  };

  const onSubmit = (data) => {
    console.log("Final Booking Data:", data);
    toast.success(`Success! Lesson booked with ${teacher.name}`, {
      style: {
        border: "2px solid var(--brand-color)",
        padding: "16px",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "var(--brand-color)",
        secondary: "#fff",
      },
    });
    onClose();
  };

  return (
    <div className="w-full text-[#121417]">
      <h2 className="text-[40px] font-medium leading-[1.2] mb-5 tracking-tight">
        Book trial lesson
      </h2>
      <p className="text-[#121417]/80 text-[16px] leading-[1.37] mb-5">
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className="flex gap-4 mb-10">
        <img
          src={teacher.avatar_url}
          alt={teacher.name}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <p className="text-[#8A8A89] text-[12px] font-medium mb-1">
            Your teacher
          </p>
          <p className="text-[16px] font-medium">
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col"
      >
        {showLanguageSelect && (
          <div className="mb-8 relative">
            <p className="text-[18px] font-medium mb-2">
              Select a language to learn:
            </p>
            <select
              {...register("language")}
              className={`booking-input bg-white cursor-pointer ${errors.language ? "border-red-500" : ""}`}
            >
              <option value="" disabled>
                Choose one...
              </option>
              {teacher.languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            {errors.language && (
              <p className="text-red-500 text-xs mt-1 absolute left-0 top-full">
                {errors.language.message}
              </p>
            )}
          </div>
        )}
        {!showLanguageSelect && (
          <input type="hidden" {...register("language")} />
        )}

        <div className="mb-10">
          <p className="text-[18px] font-medium mb-4">
            What is your main reason for learning{" "}
            {selectedFilterLanguage || "a language"}?
          </p>
          <div className="flex flex-col gap-2">
            {[
              "Career and business",
              "Lesson for kids",
              "Living abroad",
              "Exams and coursework",
              "Culture, travel or hobby",
            ].map((value) => {
              const isSelected = selectedReason === value;
              return (
                <label
                  key={value}
                  className="flex items-center gap-2 cursor-pointer group w-fit"
                >
                  <input
                    type="radio"
                    value={value}
                    {...register("reason")}
                    className="sr-only"
                  />
                  <Icon
                    id={isSelected ? "icon-radio-active" : "icon-radio-default"}
                    width="20"
                    height="20"
                    className={isSelected ? "text-(--brand-color)" : ""}
                  />
                  <span className="text-[16px] leading-[1.37] group-hover:text-(--brand-color) transition-colors">
                    {value}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div className="relative pb-4">
            <input
              {...register("fullName")}
              placeholder="Full Name"
              className="booking-input"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs absolute bottom-0">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="relative pb-4">
            <input
              {...register("email")}
              placeholder="Email"
              className="booking-input"
            />
            {errors.email && (
              <p className="text-red-500 text-xs absolute bottom-0">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative pb-4">
            <input
              {...register("phone")}
              placeholder="Phone number"
              className="booking-input"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs absolute bottom-0">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          btnText="Book"
          height="60px"
          bg="bg-(--brand-color)"
          className="w-full text-[18px] font-bold"
        />
      </form>
    </div>
  );
}

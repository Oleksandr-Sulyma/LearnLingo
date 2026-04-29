import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFiltersStore } from "../../store/useFiltersStore";
import Button from "../Button/Button";

const schema = yup.object().shape({
  reason: yup.string().required("Please select a reason"),
  language: yup.string().required("Please select a language"),
  fullName: yup.string().required("Full name is required").min(2, "Too short"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+]+$/, "Only digits and '+' are allowed")
    .min(10, "Too short"),
});

export default function BookingForm({ teacher, onClose }) {
  const selectedFilterLanguage = useFiltersStore((state) => state.language);
  const showLanguageSelect = !selectedFilterLanguage && teacher.languages.length > 1;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: "Career and business",
      language: selectedFilterLanguage || (teacher.languages.length === 1 ? teacher.languages[0] : ""),
    },
  });

  const onSubmit = (data) => {
    console.log("Success Booking:", { ...data, teacherId: teacher.id });
    alert("Thank you! Your trial lesson is booked.");
    onClose();
  };

  return (
    <div className="w-full text-[#121417]">
      <h2 className="text-[40px] font-medium leading-[1.2] mb-5 tracking-tight">Book trial lesson</h2>
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
          <p className="text-[#8A8A89] text-[12px] font-medium mb-1">Your teacher</p>
          <p className="text-[16px] font-medium">
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
       
        {showLanguageSelect && (
          <div className="mb-6">
            <p className="text-[18px] font-medium mb-2">Select a language to learn:</p>
            <select {...register("language")} className="booking-input bg-white cursor-pointer">
              <option value="" disabled>Choose one...</option>
              {teacher.languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            {errors.language && <p className="text-red-500 text-xs mt-1">{errors.language.message}</p>}
          </div>
        )}
        {!showLanguageSelect && <input type="hidden" {...register("language")} />}

        <div className="mb-10">
          <p className="text-[18px] font-medium mb-4">
            What is your main reason for learning {selectedFilterLanguage || "a language"}?
          </p>
          <div className="flex flex-col gap-2">
            {[
              "Career and business",
              "Lesson for kids",
              "Living abroad",
              "Exams and coursework",
              "Culture, travel or hobby",
            ].map((value) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer group w-fit">
                <input
                  type="radio"
                  value={value}
                  {...register("reason")}
                  className="custom-radio w-5 h-5 cursor-pointer" 
                />
                <span className="text-[16px] leading-[1.37] group-hover:opacity-70 transition-opacity">
                  {value}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[18px] mb-10">
          <div className="relative">
            <input {...register("fullName")} placeholder="Full Name" className="booking-input" />
            {errors.fullName && <p className="text-red-500 text-xs absolute -bottom-5">{errors.fullName.message}</p>}
          </div>
          <div className="relative">
            <input {...register("email")} placeholder="Email" className="booking-input" />
            {errors.email && <p className="text-red-500 text-xs absolute -bottom-5">{errors.email.message}</p>}
          </div>
          <div className="relative">
            <input {...register("phone")} placeholder="Phone number" className="booking-input" />
            {errors.phone && <p className="text-red-500 text-xs absolute -bottom-5">{errors.phone.message}</p>}
          </div>
        </div>

        <Button 
          type="submit" 
          btnText="Book" 
          height="60px" 
          bg="bg-[var(--brand-color)]" 
          className="w-full text-[18px]" 
        />
      </form>
    </div>
  );
}
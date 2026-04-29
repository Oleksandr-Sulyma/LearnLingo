import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
import Button from "../components/Button/Button";
import heroYellow from "../assets/images/hero/hero_yellow.svg";
import heroBlue from "../assets/images/hero/hero_blue.svg";
import heroGreen from "../assets/images/hero/hero_green.svg";
import heroPink from "../assets/images/hero/hero_pink.svg";
import heroOrange from "../assets/images/hero/hero_orange.svg";

export default function Home() {
  const navigate = useNavigate();
  const theme = useThemeStore((state) => state.theme);
  const heroImages = {
    yellow: heroYellow,
    blue: heroBlue,
    green: heroGreen,
    pink: heroPink,
    orange: heroOrange,
  };

  const themeColors = {
    yellow: "%23F4C550",
    blue: "%239FB7CE",
    green: "%239FBAAE",
    pink: "%23E0A39A",
    orange: "%23F0AA8D",
  };

  const currentStrokeColor = themeColors[theme] || themeColors.yellow;

  return (
    <main className="main-container py-5">
      <section className="flex gap-6 mb-6">
        <div className="w-180 h-132.5 bg-[#F8F8F8] rounded-[30px] px-16 py-24.5 flex flex-col justify-center">
          <h1 className="text-[48px] font-medium leading-[1.16667] tracking-[-0.02em] text-[#121417] max-w-137">
            Unlock your potential with the best{" "}
            <span 
              className="italic font-normal rounded-md px-1"
              style={{ backgroundColor: "var(--brand-color-light)" }}
            >
              language
            </span>{" "}
            tutors
          </h1>

          <p className="mt-8 text-[16px] leading-snug tracking-[-0.02em] text-[#121417] max-w-117.75">
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>

          <Button
            width="267px"
            height="60px"
            bg="bg-[var(--brand-color)]" 
            btnText="Get started"
            className="mt-16"
            onClick={() => navigate("/teachers")}
          />
        </div>

        <div className="w-142 h-132.5 rounded-[30px] overflow-hidden">
          <img
            src={heroImages[theme] || heroYellow}
            alt="Language Tutor"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section
        className="mt-6 w-328 h-29 rounded-[30px] flex items-center justify-center"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='30' ry='30' stroke='${currentStrokeColor}' stroke-width='3' stroke-dasharray='10%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        }}
      >
        <div className="w-266.75 h-9 flex justify-between items-center">
          <div className="w-54.25 flex items-center gap-4">
            <span className="text-[28px] font-medium leading-[1.14] tracking-[-0.02em] whitespace-nowrap">
              32,000 +
            </span>
            <p className="text-[14px] leading-[1.28] tracking-[-0.02em] text-[rgba(18,20,23,0.7)] max-w-24">
              Experienced tutors
            </p>
          </div>

          <div className="w-58 flex items-center gap-4">
            <span className="text-[28px] font-medium leading-[1.14] tracking-[-0.02em] whitespace-nowrap">
              300,000 +
            </span>
            <p className="text-[14px] leading-[1.28] tracking-[-0.02em] text-[rgba(18,20,23,0.7)] max-w-20">
              5-star tutor reviews
            </p>
          </div>

          <div className="w-39.75 flex items-center gap-4">
            <span className="text-[28px] font-medium leading-[1.14] tracking-[-0.02em] whitespace-nowrap">
              120 +
            </span>
            <p className="text-[14px] leading-[1.28] tracking-[-0.02em] text-[rgba(18,20,23,0.7)] max-w-19">
              Subjects taught
            </p>
          </div>

          <div className="w-39.75 flex items-center gap-4">
            <span className="text-[28px] font-medium leading-[1.14] tracking-[-0.02em] whitespace-nowrap">
              200 +
            </span>
            <p className="text-[14px] leading-[1.28] tracking-[-0.02em] text-[rgba(18,20,23,0.7)] max-w-20.5">
              Tutor nationalities
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
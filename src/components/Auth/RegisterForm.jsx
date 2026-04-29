import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must contain a domain (e.g. .com, .net)",
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

export default function RegisterForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const { register: firebaseRegister } = useAuth();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await firebaseRegister(data.email, data.password, data.name);
      toast.success(`Welcome, ${data.fullName}! Registration successful.`, {
        icon: '🚀',
        style: {
          border: '2px solid var(--brand-color)',
          padding: '16px',
        },
      });
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered. Try logging in.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Use at least 6 characters.";
      }

      toast.error(errorMessage, {
        duration: 6000, 
        style: {
          border: '1px solid #ef4444',
        },
      });
    }
  };

  return (
    <div className="w-109.5">
      <div className="mb-10 flex flex-col gap-5">
        <h2 className="text-[40px] font-medium leading-[1.2] tracking-[-0.02em]">
          Registration
        </h2>
        <p className="text-[16px] leading-snug text-[rgba(18,23,23,0.8)]">
          Thank you for your interest! Please provide your information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4.5"
      >
        <div className="flex flex-col gap-1">
          <input
            {...formRegister("name")}
            type="text"
            placeholder="Name"
            className={`w-full h-13.5 border rounded-3 px-4.5 outline-none transition-colors ${
              errors.name
                ? "border-red-500"
                : "border-[rgba(18,23,23,0.1)] focus:border-brand-yellow"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...formRegister("email")}
            type="email"
            placeholder="Email"
            className={`w-full h-13.5 border rounded-3 px-4.5 outline-none transition-colors ${
              errors.email
                ? "border-red-500"
                : "border-[rgba(18,23,23,0.1)] focus:border-brand-yellow"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="relative">
            <input
              {...formRegister("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full h-13.5 border rounded-3 px-4.5 outline-none transition-colors ${
                errors.password
                  ? "border-red-500"
                  : "border-[rgba(18,23,23,0.1)] focus:border-brand-yellow"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-4.25 right-4.25 text-[#121417]"
            >
              <Icon
                id={showPassword ? "icon-eye" : "icon-eye-off"}
                width="20"
                height="20"
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          btnText="Sign Up"
          width="438px"
          height="60px"
          bg="bg-brand-yellow"
          className="mt-5.5 text-[18px] font-bold leading-[1.55]"
        />
      </form>
    </div>
  );
}

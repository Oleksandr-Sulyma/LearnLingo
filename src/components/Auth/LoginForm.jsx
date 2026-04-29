import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

export default function LoginForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success(`Welcome back!`, {
      icon: '👋',
      style: { border: '2px solid var(--brand-color)' }
    });
      onClose();
    } catch (error) {
      const message = error.code === 'auth/invalid-credential' 
      ? "Invalid email or password" 
      : "Something went wrong. Try again.";
    
    toast.error(message, {
      duration: 5000,
      style: { border: '1px solid #ef4444' }
    });
  }
};

  return (
    <div className="w-109.5">
      <div className="mb-10 flex flex-col gap-5">
        <h2 className="text-[40px] font-medium leading-[1.2] tracking-[-0.02em]">
          Log In
        </h2>
        <p className="text-[16px] leading-snug text-[rgba(18,23,23,0.8)]">
          Welcome back! Please enter your credentials to access your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4.5"
      >
        <div className="flex flex-col gap-1">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className={`w-full h-13.5 border rounded-3 px-4.5 outline-none transition-colors ${
              errors.email
                ? "border-red-500"
                : "border-[rgba(18,23,23,0.1)] focus:border-(--brand-color)" 
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full h-13.5 border rounded-3 px-4.5 outline-none transition-colors ${
                errors.password
                  ? "border-red-500"
                  : "border-[rgba(18,23,23,0.1)] focus:border-(--brand-color)" 
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
          btnText="Log In"
          width="438px"
          height="60px"
          bg="bg-(--brand-color)" 
          className="mt-5.5 text-[18px] font-bold leading-[1.55]"
        />
      </form>
    </div>
  );
}

import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URL } from "../../api/config";
import Field from "./Field";

export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const data = {
        role: formData?.isAdmin ? "admin" : "user",
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(`${AUTH_URL}/register`, data);

      if (response.data && response.data.status === "success") {
        console.log("Formatted response:", response.data);

        navigate("/login");
      }
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field label="Full Name" htmlFor="name" error={errors.name}>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Full Name is required" })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          placeholder="John Doe"
        />
      </Field>

      <Field label="Email" htmlFor="email" error={errors.email}>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          placeholder="Email address"
        />
      </Field>

      <div className="flex gap-4">
        <Field label="Password" htmlFor="password" error={errors.password}>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "Password must contain at least 6 characters, including uppercase, lowercase, number, and special character",
              },
            })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            placeholder="Password"
          />
        </Field>

        <Field
          label="Confirm Password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword}
        >
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            placeholder="Confirm Password"
          />
        </Field>
      </div>

      <Field>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="admin"
            {...register("isAdmin")}
            className="rounded border-gray-300"
          />
          <label htmlFor="admin" className="block">
            Register as Admin
          </label>
        </div>
      </Field>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg"
      >
        Create Account
      </button>
    </form>
  );
}

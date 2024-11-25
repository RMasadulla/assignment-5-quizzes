import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URL } from "../../api/config";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const userData = {
        email: formData?.email,
        password: formData?.password,
      };

      const response = await axios.post(`${AUTH_URL}/login`, userData);

      if (
        response.status === 200 &&
        response.data &&
        response.data.status === "success"
      ) {
        const { user, tokens } = response?.data?.data;

        if (tokens) {
          const { accessToken, refreshToken } = tokens;
          setAuth({ user, accessToken, refreshToken });

          if (formData?.isAdmin && user?.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.error(
        "Login failed:",
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
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Enter your username or email address
        </label>
        <input
          type="text"
          id="email"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          placeholder="Username or email address"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block mb-2">
          Enter your Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-6 flex gap-2 items-center">
        <input
          type="checkbox"
          id="admin"
          {...register("isAdmin")}
          className="rounded border-gray-300"
        />
        <label htmlFor="admin" className="block">
          Login as Admin
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-4"
      >
        Sign in
      </button>
    </form>
  );
}

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ADMIN_URL } from "../../api/config";
import { useAxios } from "../../hooks/useAxios";
import Field from "./Field";

export default function QuizForm() {
  const { axiosInstance } = useAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await axiosInstance.post(
        `${ADMIN_URL}/quizzes`,
        formData
      );

      console.log("Quiz created successfully:", response.data);
      navigate(`/admin/dashboard/quiz_set_entry/${response.data.data?.id}`);
    } catch (error) {
      console.error(
        "Failed to create quiz:",
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
      <Field label="Quiz Title" htmlFor="title" error={errors.title}>
        <input
          type="text"
          id="title"
          {...register("title", { required: "Quiz title is required" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Quiz"
        />
      </Field>

      <Field
        label="Description (Optional)"
        htmlFor="description"
        error={errors.description}
      >
        <textarea
          id="description"
          {...register("description")}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Description"
        ></textarea>
      </Field>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg"
      >
        Next
      </button>
    </form>
  );
}

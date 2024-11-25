import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QUIZ_URL } from "../../api/config";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";

export default function QuizCard({ quizItem }) {
  const { axiosInstance } = useAxios();
  const { auth } = useAuth();
  const { id, title, description, thumbnail } = quizItem;

  const [userHasAttempted, setUserHasAttempted] = useState(false);

  useEffect(() => {
    const fetchQuizAttempts = async () => {
      try {
        const response = await axiosInstance.get(`${QUIZ_URL}/${id}/attempts`);
        const attempts = response?.data?.data?.attempts || [];

        // Check if the authenticated user has participated in the quiz
        const userAttempted = attempts.some(
          (attempt) => attempt?.user?.id === auth?.user?.id
        );

        setUserHasAttempted(userAttempted);
      } catch (error) {
        console.error("Error fetching quiz attempts", error);
      }
    };

    fetchQuizAttempts();
  }, [id, axiosInstance, auth]);

  return userHasAttempted ? (
    <Link
      to={`/result/${id}`}
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer"
    >
      <div className="group-hover:scale-105 absolute transition-all text-white text-center top-1/2 -translate-y-1/2 px-4">
        <h1 className="text-5xl" style={{ fontFamily: "Jaro" }}>
          {title}
        </h1>
        <p className="mt-2 text-lg">{description}</p>
      </div>
      <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
        <div>
          <h1 className="text-3xl font-bold">Already Participated</h1>
          <p className="text-center">Click to view your leaderboard</p>
        </div>
      </div>
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover rounded mb-4"
      />
    </Link>
  ) : (
    <Link
      to={`/quiz/${id}`}
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer"
    >
      <div className="group-hover:scale-105 absolute transition-all text-white text-center top-1/2 -translate-y-1/2 px-4">
        <h1 className="text-5xl" style={{ fontFamily: "Jaro" }}>
          {title}
        </h1>
        <p className="mt-2 text-lg">{description}</p>
      </div>
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover rounded mb-4"
      />
    </Link>
  );
}

import Avater from "../assets/avater.webp";
import Header from "../components/common/Header";

import "react-circular-progressbar/dist/styles.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QUIZ_URL } from "../api/config";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";

export default function LeaderboardPage() {
  const { id } = useParams();
  const { axiosInstance } = useAxios();
  const { auth } = useAuth();

  const [quizInfo, setQuizinfo] = useState(null);
  const [userQuizResult, setUserquizresult] = useState(null);

  useEffect(() => {
    const quizData = async () => {
      const response = await axiosInstance.get(`${QUIZ_URL}/${id}`);
      setQuizinfo(response?.data?.data);
    };

    const quizDataAns = async () => {
      const response = await axiosInstance.get(`${QUIZ_URL}/${id}/attempts`);
      setUserquizresult(response?.data?.data);
    };

    quizData();
    quizDataAns();
  }, [id, axiosInstance]);

  const userDetails =
    userQuizResult?.attempts?.filter(
      (userData) => userData?.user?.id === auth?.user?.id
    ) || [];

  const correctAnswers = userDetails[0]?.correct_answers?.length;
  const submittedAnswers = userDetails[0]?.submitted_answers?.length;
  const wrongAnswers = submittedAnswers - correctAnswers;
  const totalMarks = correctAnswers * 5;

  return (
    <div className="bg-[#F5F3FF]  p-4">
      <Header />

      <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* <!-- Left Column --> */}
            <div className="bg-primary rounded-lg p-6 text-white">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={Avater}
                  alt="Profile Pic"
                  className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
                />
                <h2 className="text-2xl font-bold">{auth?.user?.full_name}</h2>
                <p className="text-xl">20 Position</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm opacity-75">Mark</p>
                  <p className="text-2xl font-bold">{totalMarks}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-75">Correct</p>
                  <p className="text-2xl font-bold">{correctAnswers}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-75">Wrong</p>
                  <p className="text-2xl font-bold">{wrongAnswers}</p>
                </div>
              </div>
            </div>

            {/* <!-- Right Column --> */}
            <div>
              <h1 className="text-2xl font-bold">Leaderboard</h1>
              <p className="mb-6">React Hooks Quiz</p>
              <ul className="space-y-4">
                {userQuizResult &&
                  userQuizResult?.attempts.map((info, index) => {
                    return (
                      <li
                        key={info?.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <img
                            src={Avater}
                            alt="SPD Smith"
                            className="object-cover w-10 h-10 rounded-full mr-4"
                          />
                          <div>
                            <h3 className="font-semibold">
                              {info?.user?.full_name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {index + 1}st
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">{totalMarks}</span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

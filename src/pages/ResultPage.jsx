import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { Logo } from "../components/Icons";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QUIZ_URL } from "../api/config";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";

export default function ResultPage() {
  const { id } = useParams();
  const { axiosInstance } = useAxios();
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);
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

  // console.log(userDetails[0]);

  return (
    <div class="bg-background text-foreground min-h-screen">
      <div class="flex min-h-screen overflow-hidden">
        <Link to="/">
          <Logo customStyle="max-h-11 fixed left-6 top-6 z-50" color="white" />
        </Link>
        {/* <!-- Left side --> */}
        <div class="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
          <div>
            <div class="text-white">
              <div>
                <h2 class="text-4xl font-bold mb-2">
                  {quizInfo && quizInfo.title}
                </h2>
                <p>{quizInfo && quizInfo.description} </p>
              </div>

              <div class="my-6 flex items-center  ">
                <div class="w-1/2">
                  <div class="flex gap-6 my-6">
                    <div>
                      <p class="font-semibold text-2xl my-0">
                        {quizInfo && quizInfo.stats?.total_questions}
                      </p>
                      <p class="text-gray-300">Questions</p>
                    </div>

                    <div>
                      <p class="font-semibold text-2xl my-0">
                        {userQuizResult &&
                          userDetails[0]?.correct_answers?.length}
                      </p>
                      <p class="text-gray-300">Correct</p>
                    </div>

                    <div>
                      <p class="font-semibold text-2xl my-0">
                        {userQuizResult &&
                          userDetails[0].submitted_answers?.length -
                            userDetails[0].correct_answers?.length}
                      </p>
                      <p class="text-gray-300">Wrong</p>
                    </div>
                  </div>

                  <Link
                    to={`/leaderboard/${id}`}
                    class=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
                  >
                    View Leaderboard
                  </Link>
                </div>

                <div class="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                  <div class="flex-1">
                    <p class="text-2xl font-bold">
                      {userQuizResult &&
                        userDetails[0].correct_answers?.length * 5}{" "}
                      /{quizInfo && quizInfo.stats?.total_marks}
                    </p>
                    <p>Your Mark</p>
                  </div>
                  <div>
                    <CircularProgressbar
                      value={65}
                      text={`${65}%`}
                      className="h-20"
                      strokeWidth={6}
                      styles={buildStyles({
                        textSize: "27px",
                        textColor: "#fff",
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Right side --> */}
        <div class="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
          <div class="h-[calc(100vh-50px)] overflow-y-scroll ">
            <div class="px-4">
              {/* <!-- Question One --> */}
              <div class="rounded-lg overflow-hidden shadow-sm mb-4">
                <div class="bg-white p-6 !pb-2">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">
                      1. Which of the following is NOT a binary tree traversal
                      method?
                    </h3>
                  </div>
                  <div class="space-y-2">
                    <label class="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="answer1"
                        class="form-radio text-buzzr-purple"
                        checked
                      />
                      <span>Inorder</span>
                    </label>
                    <label class="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="answer1"
                        class="form-radio text-buzzr-purple"
                      />
                      <span>Preorder</span>
                    </label>
                    <label class="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="answer1"
                        class="form-radio text-buzzr-purple"
                      />
                      <span>Postorder</span>
                    </label>
                    <label class="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="answer1"
                        class="form-radio text-buzzr-purple"
                      />
                      <span>Crossorder</span>
                    </label>
                  </div>
                </div>
                <div class="flex space-x-4 bg-primary/10 px-6 py-2">
                  <button class="text-red-600 hover:text-red-800 font-medium">
                    Delete
                  </button>
                  <button class="text-primary hover:text-primary/80 font-medium">
                    Edit Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

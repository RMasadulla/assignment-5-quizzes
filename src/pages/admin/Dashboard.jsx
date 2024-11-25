import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ADMIN_URL } from "../../api/config";
import QuizDescCard from "../../components/card/QuizDescCard";
import { PlusIcon } from "../../components/Icons";
import { useAxios } from "../../hooks/useAxios";

export default function Dashboard() {
  const [quizList, setQuizlist] = useState([]);
  const { axiosInstance } = useAxios();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axiosInstance.get(`${ADMIN_URL}/quizzes`);
        setQuizlist(response?.data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <>
      <header className="mb-8">
        <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
        <h1 className="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/admin/dashboard/quiz_set" className="group">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
            <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
              <PlusIcon />
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
              Create a new quiz
            </h3>
            <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
              Build from the ground up
            </p>
          </div>
        </Link>
        {quizList &&
          quizList.map((list) => (
            <QuizDescCard key={list?.id} Quizlist={list} />
          ))}
      </div>
    </>
  );
}

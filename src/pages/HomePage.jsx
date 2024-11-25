import axios from "axios";
import { useEffect, useState } from "react";
import Avater from "../assets/avater.webp";

import { QUIZ_URL } from "../api/config";
import QuizCard from "../components/card/QuizCard";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const [quizzes, setQuizzes] = useState([]);
  const [userQuizResult, setUserquizresult] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const quizzesData = async () => {
      const response = await axios.get(`${QUIZ_URL}`);
      setQuizzes(response?.data?.data);
    };

    quizzesData();
  }, []);

  return (
    <div className="bg-[#F5F3FF] min-h-screen">
      <div className="container mx-auto py-3">
        <Header />
        {auth?.user && (
          <div className="text-center mb-12">
            <img
              src={Avater}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
            />
            <p className="text-xl text-gray-600">Welcome</p>
            <h2
              className="text-4xl font-bold text-gray-700"
              style={{ fontFamily: "Jaro" }}
            >
              {auth?.user?.full_name}
            </h2>
          </div>
        )}

        <main className="bg-white p-6 rounded-md h-full">
          <section>
            <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quizzes &&
                quizzes.map((quiz) => (
                  <QuizCard key={quiz?.id} quizItem={quiz} />
                ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

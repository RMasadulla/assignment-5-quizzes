import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { QUIZ_URL } from "../api/config";
import Avater from "../assets/avater.webp";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Quiz from "../components/Quiz";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";

export default function QuizPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { axiosInstance } = useAxios();
  const { auth } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [participation, setParticipation] = useState(0);

  useEffect(() => {
    const quizData = async () => {
      const response = await axiosInstance.get(`${QUIZ_URL}/${id}`);
      setQuiz(response?.data?.data);
    };

    quizData();
  }, [id, axiosInstance]);

  const totalQuestions = quiz?.stats?.total_questions || 0;
  const remaining = totalQuestions - participation;

  // Handle option selection
  const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // Move to the next question and update participation
  const handleNextQuestion = () => {
    if (!selectedOptions[quiz?.questions[currentQuestionIndex]?.id]) {
      toast.warning("Please select an option before proceeding.", {
        position: "top-right",
        theme: "light",
      });
      return;
    }

    // Update participation (increment the number of attempts)
    setParticipation((prev) => prev + 1);

    if (currentQuestionIndex < quiz?.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Submit the quiz

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(`${QUIZ_URL}/${id}/attempt`, {
        answers: selectedOptions,
      });
      console.log(response);
      navigate(`/result/${id}`);
    } catch (error) {
      console.error("Error in request:", error.message);
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      } else {
        console.error("Error in request:", error.message);
      }
    }
  };

  return (
    <div className="bg-[#F5F3FF] min-h-screen">
      <div className="container mx-auto py-3">
        <Header />
        <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
            {/* <!-- Left Column --> */}
            <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
              {quiz ? (
                <div>
                  <h2 className="text-4xl font-bold mb-4">{quiz.title}</h2>
                  <p className="text-gray-600 mb-4">{quiz.description}</p>

                  <div className="flex flex-col">
                    <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                      Total number of questions: {totalQuestions}
                    </div>

                    <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                      Participation: {participation}
                    </div>

                    <div className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                      Remaining: {remaining}
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading quiz...</p>
              )}

              <div className="mt-auto flex items-center">
                <img
                  src={Avater}
                  alt={auth?.user?.full_name}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <span className="text-black font-semibold">
                  {auth?.user?.full_name}
                </span>
              </div>
            </div>

            {/* <!-- Right Column --> */}
            {quiz && (
              <Quiz
                questions={quiz.questions}
                currentQuestionIndex={currentQuestionIndex}
                selectedOptions={selectedOptions}
                onOptionChange={handleOptionChange}
                onNextQuestion={handleNextQuestion}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

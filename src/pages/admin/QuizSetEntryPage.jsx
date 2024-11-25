import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ADMIN_URL } from "../../api/config";
import QuestionCard from "../../components/card/QuestionCard";
import CreateQuiz from "../../components/common/CreateQuiz";
import UpdateQuiz from "../../components/common/UpdateQuiz";
import { BackArrowIcon } from "../../components/Icons";
import { useAxios } from "../../hooks/useAxios";

export default function QuizSetEntryPage() {
  const [quiz, setQuiz] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [updateQs, setUpdateQs] = useState(false);

  const { axiosInstance } = useAxios();
  const { id } = useParams();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axiosInstance.get(`${ADMIN_URL}/quizzes`);
        const singleQuizItem = response?.data.find((item) => item?.id === id);
        setQuiz(singleQuizItem);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    };

    fetchQuizzes();
  }, [id, axiosInstance]);

  const addNewQuestion = (newQuestion) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      Questions: [...prevQuiz.Questions, newQuestion],
    }));
  };

  const handlePublish = async () => {
    try {
      const response = await axiosInstance.patch(`${ADMIN_URL}/quizzes/${id}`, {
        status: "published",
        title: quiz?.title,
        description: quiz?.description,
      });
      toast.success("Quiz published", {
        position: "top-left",
        theme: "light",
      });
    } catch (error) {
      console.error("Error publishing quiz:", error.response);
      toast.error(error.response?.data?.message, {
        position: "top-left",
        theme: "light",
      });
    }
  };

  const handleUpdateQuestion = (qsId) => {
    setQuestionId(qsId);
    setUpdateQs(true);
  };

  const question =
    quiz && quiz?.Questions.filter((qsId) => qsId.id === questionId);

  return (
    <div>
      <nav
        className="text-sm mb-4 flex justify-between items-center"
        aria-label="Breadcrumb"
      >
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link
              to={"/admin/dashboard"}
              className="text-gray-600 hover:text-buzzr-purple"
            >
              Home
            </Link>
            <BackArrowIcon />
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-buzzr-purple"
              aria-current="page"
            >
              Quizzes
            </a>
          </li>
        </ol>
        <button
          onClick={handlePublish}
          className="py-2 px-4 bg-primary text-gray-300 hover:text-white rounded-md transition-all"
        >
          {quiz && quiz?.status === "draft" ? "Publish" : "Published"}
        </button>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
        <div className="">
          <h2 className="text-3xl font-bold mb-4">{quiz && quiz?.title}</h2>
          <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
            Total number of questions : {quiz && quiz?.Questions.length}
          </div>
          <p className="text-gray-600 mb-4">{quiz && quiz?.description}</p>

          {!updateQs ? (
            <CreateQuiz quizSetId={id} onNewQuestionAdded={addNewQuestion} />
          ) : (
            <UpdateQuiz ques={question} onNewQuestionAdded={addNewQuestion} />
          )}
        </div>

        <div className="px-4 h-screen overflow-y-auto">
          {quiz &&
            quiz?.Questions.map((question, index) => (
              <QuestionCard
                key={question?.id}
                ques={question}
                questionNumber={index + 1}
                onUpdateQuestion={handleUpdateQuestion}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

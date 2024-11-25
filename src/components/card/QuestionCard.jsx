import { toast } from "react-toastify";
import { ADMIN_URL } from "../../api/config";
import { useAxios } from "../../hooks/useAxios";
export default function QuestionCard({
  ques,
  questionNumber,
  onUpdateQuestion,
}) {
  const { axiosInstance } = useAxios();

  const deleteQues = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (confirmDelete) {
      try {
        if (ques?.id) {
          await axiosInstance.delete(`${ADMIN_URL}/questions/${ques?.id}`);
          toast.success("Question deleted successfully!", {
            position: "top-right",
            theme: "light",
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete the question. Please try again.", {
          position: "top-right",
          theme: "light",
        });
      }
    } else {
      alert("Deletion cancelled.");
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-sm mb-4">
      <div className="bg-white p-6 !pb-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {questionNumber}. {ques?.question}
          </h3>
        </div>

        <div className="space-y-2">
          {ques?.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3">
              <input
                type="radio"
                name={`answer-${ques.id}`}
                className="form-radio text-buzzr-purple"
                value={option}
                checked={option === ques.correctAnswer}
                readOnly
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex space-x-4 bg-primary/10 px-6 py-2">
        <button
          onClick={deleteQues}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>
        <button
          onClick={() => onUpdateQuestion(ques?.id)}
          className="text-primary hover:text-primary/80 font-medium"
        >
          Edit Question
        </button>
      </div>
    </div>
  );
}

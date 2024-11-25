import { Link } from "react-router-dom";
import { QuizDescCardIcon } from "../Icons";

export default function QuizDescCard({ Quizlist }) {
  return (
    <Link to={`/admin/dashboard/quiz_set_entry/${Quizlist?.id}`}>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer">
        <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
          <QuizDescCardIcon />
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
          {Quizlist?.title}
        </h3>
        <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
          {Quizlist?.description}
        </p>
      </div>
    </Link>
  );
}

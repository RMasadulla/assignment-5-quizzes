import QuizForm from "../../components/common/QuizForm";
import { BackIcon } from "../../components/Icons";

import { Link } from "react-router-dom";

export default function QuizSetPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
        >
          <BackIcon />
          Back to home
        </Link>

        <h2 className="text-3xl font-bold mb-6">
          Give your quiz title and description
        </h2>

        <QuizForm />
      </div>
    </div>
  );
}

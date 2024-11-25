import React, { useState } from "react";
import { toast } from "react-toastify";

import { ADMIN_URL } from "../../api/config";
import { useAxios } from "../../hooks/useAxios";

export default function CreateQuiz({ quizSetId, onNewQuestionAdded }) {
  const { axiosInstance } = useAxios();
  const [quizTitle, setQuizTitle] = useState("");

  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  const handleOptionChange = (index, text) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = text;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (index) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    const correctAnswer = options.find((option) => option.isCorrect)?.text;
    if (!quizTitle || !correctAnswer) {
      toast.warning(
        "Please provide a quiz title and select a correct answer.",
        {
          position: "top-left",
          theme: "light",
        }
      );

      return;
    }

    const quizData = {
      question: quizTitle,
      options: options.map((option) => option.text),
      correctAnswer,
    };

    try {
      const response = await axiosInstance.post(
        `${ADMIN_URL}/quizzes/${quizSetId}/questions`,
        quizData
      );
      // console.log(response.data?.data);
      onNewQuestionAdded(response.data?.data);

      toast.success("Quiz saved successfully!", {
        position: "top-left",
        theme: "light",
      });

      // Reset form after submission
      setQuizTitle("");
      setOptions([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ]);
    } catch (error) {
      console.error("Error saving quiz:", error);
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

      <div>
        <label
          htmlFor="quizTitle"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Question Title
        </label>
        <input
          type="text"
          id="quizTitle"
          name="quizTitle"
          className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
          placeholder="Enter quiz title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
      </div>

      <p className="text-sm text-gray-600 mt-4">Add Options</p>

      <div id="optionsContainer" className="space-y-2 mt-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
          >
            <input
              type="checkbox"
              checked={option.isCorrect}
              onChange={() => handleCorrectAnswerChange(index)}
              className="text-primary focus:ring-0 w-4 h-4"
            />
            <input
              type="text"
              className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
              placeholder={`Option ${index + 1}`}
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        Save Quiz
      </button>
    </div>
  );
}

function Quiz({
  questions,
  currentQuestionIndex,
  selectedOptions,
  onOptionChange,
  onNextQuestion,
  onSubmit,
}) {
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="lg:col-span-2 bg-white">
      <div className="bg-white p-6 !pb-2 rounded-md">
        {currentQuestion && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, optionIndex) => (
                <label
                  key={`${currentQuestion.id}-option-${optionIndex}`}
                  className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions[currentQuestion.id] === option}
                    onChange={() => onOptionChange(currentQuestion.id, option)}
                    className="form-radio text-buzzr-purple"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Next Button */}
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={onNextQuestion}
            className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;

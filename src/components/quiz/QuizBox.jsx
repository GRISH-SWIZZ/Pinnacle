import { useState } from "react";
import { CircleCheck } from "lucide-react";

export default function QuizBox({ quiz, onQuizComplete }) {

  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex, optionIndex) => {
    if (!submitted) {
      setSelected({ ...selected, [qIndex]: optionIndex });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(selected).length !== quiz.questions.length) {
      alert("Answer all questions");
      return;
    }

    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (selected[i] === q.answer) correct++;
    });

    const score = Math.round((correct / quiz.questions.length) * 100);

    setSubmitted(true);

    if (onQuizComplete) {
      onQuizComplete(quiz._id, {
        passed: true,
        score,
        correctCount: correct
      });
    }
  };

  return (
    <div className="card">

      <h3 className="text-2xl text-white font-semibold mb-6">
        {quiz.title}
      </h3>

      <div className="space-y-6">
        {quiz.questions.map((q, qIndex) => (
          <div key={qIndex} className="pb-6 border-b border-(--border-color)">

            <p className="text-white font-medium mb-4">
              {qIndex + 1}. {q.question}
            </p>

            <div className="space-y-3">
              {q.options.map((opt, oIndex) => {

                const isSelected = selected[qIndex] === oIndex;
                const isCorrect = submitted && oIndex === q.answer;
                const isWrong = submitted && isSelected && oIndex !== q.answer;

                return (
                  <button
                    key={oIndex}
                    disabled={submitted}
                    onClick={() => handleSelect(qIndex, oIndex)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all
                      ${isCorrect
                        ? "border-green-500 bg-green-500/10"
                        : isWrong
                          ? "border-red-500 bg-red-500/10"
                          : isSelected
                            ? "border-white"
                            : "border-(--border-color)"
                      }
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white">{opt}</span>
                      {isCorrect && <CircleCheck className="text-green-500 w-5 h-5" />}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="btn-primary w-full mt-6"
        >
          Submit Quiz
        </button>
      )}

      {submitted && (
        <p className="text-green-400 text-center mt-4">
          Quiz Completed
        </p>
      )}

    </div>
  );
}

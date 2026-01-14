import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FileText, Clock, AlertCircle } from 'lucide-react';
import { examService } from '../../services/examService';
import { calculateExamScore } from '../../utils/calculateScore';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

export default function FinalAssessment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get('course');

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    loadExam();
  }, [courseId]);

  useEffect(() => {
    if (exam?.timeLimit && !submitted) {
      setTimeRemaining(exam.timeLimit * 60);
      
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [exam, submitted]);

  const loadExam = async () => {
    try {
      setLoading(true);
      const data = await examService.getCourseExam(courseId);
      setExam(data.exam || data);
    } catch (err) {
      setError(err.message || 'Failed to load exam');
      console.error('Failed to load exam:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answerId) => {
    if (!submitted) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: answerId,
      });
    }
  };

  const handleAutoSubmit = async () => {
    if (!submitted) {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const allAnswered = exam.questions.every(
      (q) => selectedAnswers[q.id] !== undefined
    );

    if (!allAnswered) {
      if (!window.confirm('You have unanswered questions. Submit anyway?')) {
        return;
      }
    }

    setSubmitting(true);
    try {
      const response = await examService.submitExam(exam.id, selectedAnswers);
      setResult(response);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit exam');
      console.error('Failed to submit exam:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loader text="Loading exam..." />
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error || 'Exam not found'}</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  if (submitted && result) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Exam Completed!
          </h1>
          
          <div className="my-8">
            <p className="text-6xl font-bold text-white mb-2">
              {result.score}%
            </p>
            <p className="text-(--text-secondary)">
              {result.correctCount} out of {result.totalQuestions} correct
            </p>
          </div>

          {result.passed ? (
            <div className="bg-green-900/20 border border-green-500 rounded-lg p-6 mb-6">
              <p className="text-green-400 text-xl mb-2">
                🎉 Congratulations! You passed!
              </p>
              <p className="text-(--text-secondary) text-sm">
                You've successfully completed this course assessment.
              </p>
            </div>
          ) : (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 mb-6">
              <p className="text-red-400 text-xl mb-2">
                Keep Learning
              </p>
              <p className="text-(--text-secondary) text-sm">
                You need {exam.passingScore || 70}% to pass. Review the course material and try again.
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/my-courses')}>
              My Courses
            </Button>
            {result.passed && (
              <Button onClick={() => navigate('/certificates')}>
                View Certificate
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <FileText className="w-10 h-10" />
            Final Assessment
          </h1>
          {timeRemaining !== null && (
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5" />
              <span className="text-2xl font-mono">
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>
        <p className="text-(--text-secondary)">{exam.description}</p>
      </div>

      <div className="card mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-(--text-secondary) text-sm mb-1">Questions</p>
            <p className="text-2xl font-bold text-white">{exam.questions.length}</p>
          </div>
          <div>
            <p className="text-(--text-secondary) text-sm mb-1">Passing Score</p>
            <p className="text-2xl font-bold text-white">{exam.passingScore || 70}%</p>
          </div>
          <div>
            <p className="text-(--text-secondary) text-sm mb-1">Answered</p>
            <p className="text-2xl font-bold text-white">
              {Object.keys(selectedAnswers).length}/{exam.questions.length}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        {exam.questions.map((question, qIndex) => (
          <div key={question.id} className="card">
            <p className="text-white font-semibold text-lg mb-4">
              {qIndex + 1}. {question.text}
            </p>

            <div className="space-y-3">
              {question.options.map((option) => {
                const isSelected = selectedAnswers[question.id] === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(question.id, option.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-white bg-(--bg-tertiary)'
                        : 'border-(--border-color) hover:border-(--text-secondary)'
                    }`}
                  >
                    <span className="text-white">{option.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex justify-between items-center">
          <p className="text-(--text-secondary)">
            Make sure you've answered all questions before submitting.
          </p>
          <Button
            onClick={handleSubmit}
            loading={submitting}
            disabled={Object.keys(selectedAnswers).length === 0}
          >
            Submit Exam
          </Button>
        </div>
      </div>
    </div>
  );
}
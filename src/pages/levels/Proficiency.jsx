import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { levelService } from '../../services/levelService';
import { contentService } from '../../services/contentService';
import { progressService } from '../../services/progressService';
import QuizBox from '../../components/quiz/QuizBox';

export default function Proficiency() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const courseId = searchParams.get('course');
  const levelCode = "proficiency";

  const [level, setLevel] = useState(null);
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState([]);
  const [levelCompleted, setLevelCompleted] = useState(false);

  useEffect(() => {
    load();
  }, [courseId]);

  const load = async () => {
    const levelData = await levelService.getLevel(courseId, levelCode);
    setLevel(levelData);

    const contentData = await contentService.getByLevel(levelData.id);
    setItems(contentData || []);
  };

  const currentItem = items[current];

  const handleQuizComplete = (quizId, result) => {
    if (!answered.includes(quizId)) {
      setAnswered(prev => [...prev, quizId]);
    }

    if (current < items.length - 1) {
      setCurrent(current + 1);
    }
  };

  const allAnswered = answered.length === items.length && items.length > 0;

  const handleComplete = async () => {
    await progressService.completeLevel(courseId, level.id);
    setLevelCompleted(true);   // only mark complete, no redirect
  };

  const goNextLevel = () => {
    navigate(`/levels/mastery?course=${courseId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      <h1 className="text-4xl text-white mb-2">{level?.title}</h1>
      <p className="text-(--text-secondary) mb-6">{level?.description}</p>

      {currentItem && currentItem.type === "quiz" && (
        <QuizBox
          quiz={currentItem}
          onQuizComplete={handleQuizComplete}
        />
      )}

      <div className="flex gap-4 mt-6">
        <button
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
          className="btn-secondary disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={!levelCompleted}
          onClick={goNextLevel}
          className="btn-primary flex-1 disabled:opacity-50"
        >
          Next Level
        </button>
      </div>

      <button
        disabled={!allAnswered || levelCompleted}
        onClick={handleComplete}
        className="btn-primary mt-6 w-full disabled:opacity-50"
      >
        Mark Level as Completed
      </button>

    </div>
  );
}

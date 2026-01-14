import { useNavigate } from 'react-router-dom';
import { CircleCheck, Lock } from 'lucide-react';
import LevelLock from './LevelLock';

export default function LevelNode({ level, isLocked, isCompleted, courseId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLocked) {
      navigate(`/levels/${level.code}?course=${courseId}`);

    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={isLocked}
        className={`card p-6 w-full text-left transition-all ${isLocked
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:border-white cursor-pointer'
          } ${isCompleted ? 'border-green-500' : ''}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">
              {level.title || `Level ${level.order}`}
            </h3>
            <p className="text-(--text-secondary) text-sm">
              {level.subtitle || level.description}
            </p>
          </div>
          {isCompleted ? (
            <CircleCheck className="w-6 h-6 text-green-500 shrink-0" />
          ) : isLocked ? (
            <Lock className="w-6 h-6 text-(--text-secondary) shrink-0" />
          ) : null}
        </div>

        {level.stats && (
          <div className="flex items-center gap-4 text-sm text-(--text-secondary) mt-4">
            {level.stats.videos && (
              <span>{level.stats.videos} videos</span>
            )}
            {level.stats.quizzes && (
              <span>{level.stats.quizzes} quizzes</span>
            )}
            {level.stats.duration && (
              <span>{level.stats.duration}</span>
            )}
          </div>
        )}

        {level.progress !== undefined && !isLocked && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-(--text-secondary)">Progress</span>
              <span className="text-white">{level.progress}%</span>
            </div>
            <div className="w-full bg-(--bg-tertiary) rounded-full h-2">
              <div
                className="bg-white h-full rounded-full transition-all"
                style={{ width: `${level.progress}%` }}
              />
            </div>
          </div>
        )}
      </button>

      <LevelLock isLocked={isLocked} />
    </div>
  );
}
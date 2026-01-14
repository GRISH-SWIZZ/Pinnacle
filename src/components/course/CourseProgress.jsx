import { CircleCheck } from 'lucide-react';

export default function CourseProgress({ progress }) {
  const percentage = progress?.percentage || 0;
  const completedLevels = progress?.completedLevels || 0;
  const totalLevels = progress?.totalLevels || 8;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Your Progress</h3>
        <span className="text-(--text-secondary) text-sm">
          {completedLevels}/{totalLevels} levels
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-(--text-secondary)">Overall Progress</span>
          <span className="text-white font-semibold">{percentage}%</span>
        </div>
        <div className="w-full bg-(--bg-tertiary) rounded-full h-3 overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {progress?.completedItems && progress.completedItems.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-(--text-secondary) mb-3">
            Recently Completed:
          </p>
          {progress.completedItems.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-(--text-secondary)"
            >
              <CircleCheck className="w-4 h-4 text-green-500" />
              <span>{item.title || item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
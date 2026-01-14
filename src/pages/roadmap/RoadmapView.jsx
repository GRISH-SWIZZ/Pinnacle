import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Award, Download } from 'lucide-react';
import { progressService } from '../../services/progressService';
import { levelService } from '../../services/levelService';
import LevelNode from '../../components/roadmap/LevelNode';
import RoadmapLine from '../../components/roadmap/RoadmapLine';

export default function RoadmapView() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course');

  const [levels, setLevels] = useState([]);
  const [progress, setProgress] = useState({ completedLevels: [], percentage: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) load();
  }, [courseId]);

  const load = async () => {
    try {
      const [levelsData, progressData] = await Promise.all([
        levelService.getLevelsByCourse(courseId),
        progressService.getRoadmapProgress(courseId),
      ]);

      setLevels(levelsData || []);
      setProgress(progressData || { completedLevels: [], percentage: 0 });
    } finally {
      setLoading(false);
    }
  };

  const isLevelLocked = (index) => {
    if (index === 0) return false;
    return !progress.completedLevels.includes(levels[index - 1]?.id);
  };

  const isLevelCompleted = (id) =>
    progress.completedLevels.includes(id);

  const courseCompleted =
    progress.completedLevels.length === levels.length &&
    levels.length > 0;

  if (loading) return <div className="text-white p-10">Loading roadmap...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      <h1 className="text-4xl text-white mb-6">Learning Roadmap</h1>

      {/* PROGRESS BAR */}
      <div className="card mb-8">
        <p className="text-white">
          {progress.completedLevels.length} / {levels.length} completed
        </p>
        <div className="w-full bg-gray-700 h-3 rounded mt-3">
          <div
            className="bg-white h-3 rounded transition-all"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* LEVELS */}
      {levels.map((level, index) => (
        <div key={level.id}>
          <LevelNode
            level={level}
            isLocked={isLevelLocked(index)}
            isCompleted={isLevelCompleted(level.id)}
            courseId={courseId}
          />
          {index < levels.length - 1 && (
            <RoadmapLine isCompleted={isLevelCompleted(level.id)} />
          )}
        </div>
      ))}

      {/* CERTIFICATE UNLOCK */}
      <div className="mt-16">
        {courseCompleted ? (
          <div className="card border-2 border-yellow-400 hover:shadow-yellow-500/40 hover:shadow-2xl transition-all cursor-pointer group">

            <div className="flex flex-col items-center text-center">

              <Award className="w-20 h-20 text-yellow-400 mb-4 group-hover:scale-110 transition" />

              <h2 className="text-2xl font-bold text-white mb-2">
                Certificate Unlocked 🎉
              </h2>

              <p className="text-(--text-secondary) mb-6">
                Congratulations on completing this course!
              </p>

              <div className="flex gap-4">

                <Link to={`/certificate?course=${courseId}`}>
                  <button className="btn-primary flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    View Certificate
                  </button>
                </Link>

                <Link to={`/certificate?course=${courseId}`}>
                  <button className="btn-secondary flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </Link>

              </div>
            </div>

          </div>
        ) : (
          <div className="card opacity-40 text-center">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-(--text-secondary)">
              Complete all levels to unlock certificate
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

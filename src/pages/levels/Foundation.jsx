import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { levelService } from '../../services/levelService';
import { contentService } from '../../services/contentService';
import { progressService } from '../../services/progressService';
import VideoPlayer from '../../components/video/VideoPlayer';

export default function Foundation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const courseId = searchParams.get('course');
  const levelCode = 'foundation';

  const [level, setLevel] = useState(null);
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (courseId) load();
  }, [courseId]);

  const load = async () => {
    const levelData = await levelService.getLevel(courseId, levelCode);
    setLevel(levelData);

    const contentData = await contentService.getByLevel(levelData.id);
    setItems(contentData);
  };

  const handleMarkCompleted = async () => {
    await progressService.completeLevel(courseId, level.id);
    setCompleted(true);
  };

  const handleNext = () => {
    navigate(`/roadmap?course=${courseId}`);
  };

  const currentItem = items[current];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl text-white mb-2">{level?.title}</h1>
      <p className="text-(--text-secondary) mb-6">{level?.description}</p>

      {currentItem?.type === 'video' && (
        <VideoPlayer video={currentItem} />
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
          onClick={handleMarkCompleted}
          disabled={completed}
          className="btn-primary flex-1 disabled:opacity-50"
        >
          Mark as Completed
        </button>

        <button
          disabled={!completed}
          onClick={handleNext}
          className="btn-primary disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

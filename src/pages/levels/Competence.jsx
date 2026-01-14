import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { levelService } from '../../services/levelService';
import { contentService } from '../../services/contentService';
import { progressService } from '../../services/progressService';

export default function Competence() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const courseId = searchParams.get('course');
  const levelCode = "competence";

  const [level, setLevel] = useState(null);
  const [items, setItems] = useState([]);
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

  const handleMarkComplete = async () => {
    await progressService.completeLevel(courseId, level.id);
    setLevelCompleted(true);
  };

  const goNextLevel = () => {
    navigate(`/levels/proficiency?course=${courseId}`);
  };

  const goPrevLevel = () => {
    navigate(`/levels/foundation?course=${courseId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      <h1 className="text-4xl text-white mb-2">{level?.title}</h1>
      <p className="text-(--text-secondary) mb-6">{level?.description}</p>

      {items.map((item) => (
        <div key={item.id} className="card mb-6">
          <h3 className="text-xl text-white font-semibold mb-4">
            {item.title}
          </h3>
          <p className="text-(--text-secondary) leading-relaxed whitespace-pre-line">
            {item.text}
          </p>
        </div>
      ))}

      <div className="flex gap-4 mt-6">
        <button
          onClick={goPrevLevel}
          className="btn-secondary"
        >
          Previous
        </button>

        <button
          onClick={goNextLevel}
          disabled={!levelCompleted}
          className="btn-primary flex-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <button
        onClick={handleMarkComplete}
        className="btn-primary mt-6 w-full"
      >
        Mark Level as Completed
      </button>

    </div>
  );
}

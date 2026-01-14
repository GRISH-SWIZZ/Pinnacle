import { useState, useEffect } from 'react';
import { progressService } from '../services/progressService';

export function useProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await progressService.getUserProgress();
      setProgress(data);
    } catch (err) {
      setError(err.message || 'Failed to load progress');
      console.error('Failed to load progress:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshProgress = () => {
    loadProgress();
  };

  return {
    progress,
    loading,
    error,
    refreshProgress,
  };
}
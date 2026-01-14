import { useState, useEffect } from 'react';
import { TrendingUp, Award, Clock, Target } from 'lucide-react';
import { progressService } from '../../services/progressService';
import { useProgress } from '../../hooks/useProgress';
import ProgressChart from '../../components/analytics/ProgressChart';
import Loader from '../../components/common/Loader';
import { calculateStreakDays } from '../../utils/progressUtils';

export default function Analytics() {
  const { progress, loading, error } = useProgress();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (progress) {
      calculateStats();
    }
  }, [progress]);

  const calculateStats = () => {
    const chartData = progress?.levelProgress?.map((level) => ({
      label: level.levelName || `Level ${level.order}`,
      value: level.progress || 0,
    })) || [];

    const streak = calculateStreakDays(progress?.activityDates || []);
    
    setStats({
      chartData,
      streak,
      totalTimeSpent: progress?.totalTimeSpent || 0,
      averageScore: progress?.averageScore || 0,
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loader text="Loading analytics..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-(--text-secondary)">
          Track your learning progress and achievements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-(--text-secondary) text-sm">Overall Progress</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {progress?.percentage || 0}%
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-(--text-secondary) text-sm">Learning Streak</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats?.streak || 0} days
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-(--text-secondary) text-sm">Time Spent</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {Math.round((stats?.totalTimeSpent || 0) / 60)} hrs
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <h3 className="text-(--text-secondary) text-sm">Average Score</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats?.averageScore || 0}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart data={stats?.chartData || []} />

        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-6">
            Recent Activity
          </h3>
          {progress?.recentActivity && progress.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {progress.recentActivity.slice(0, 5).map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b border-(--border-color) last:border-b-0"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div>
                    <p className="text-white">{activity.title}</p>
                    <p className="text-(--text-secondary) text-sm">
                      {activity.type} • {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-(--text-secondary)">No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
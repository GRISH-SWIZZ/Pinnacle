import { BarChart3, TrendingUp } from 'lucide-react';

export default function ProgressChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="card text-center py-12">
        <BarChart3 className="w-12 h-12 text-(--text-secondary) mx-auto mb-4" />
        <p className="text-(--text-secondary)">No progress data available yet</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value), 100);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Progress Overview
        </h3>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white">{item.label}</span>
              <span className="text-(--text-secondary)">{item.value}%</span>
            </div>
            <div className="relative w-full bg-(--bg-tertiary) rounded-full h-3 overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-white rounded-full transition-all duration-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {data.some(item => item.target) && (
        <div className="mt-6 pt-6 border-t border-(--border-color)">
          <p className="text-sm text-(--text-secondary)">
            Average completion: {Math.round(data.reduce((acc, item) => acc + item.value, 0) / data.length)}%
          </p>
        </div>
      )}
    </div>
  );
}
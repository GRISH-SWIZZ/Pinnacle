import { Lock } from 'lucide-react';

export default function LevelLock({ isLocked }) {
  if (!isLocked) return null;

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
      <div className="text-center">
        <Lock className="w-12 h-12 text-(--text-secondary) mx-auto mb-2" />
        <p className="text-(--text-secondary) text-sm">
          Complete previous levels to unlock
        </p>
      </div>
    </div>
  );
}
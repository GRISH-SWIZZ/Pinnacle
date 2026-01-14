export function getProgressStatus(percentage) {
  if (percentage === 100) return 'completed';
  if (percentage > 0) return 'in-progress';
  return 'not-started';
}

export function getProgressColor(percentage) {
  if (percentage === 100) return 'text-green-500';
  if (percentage >= 50) return 'text-blue-500';
  if (percentage > 0) return 'text-yellow-500';
  return 'text-gray-500';
}

export function calculateTotalProgress(levels) {
  if (!levels || levels.length === 0) return 0;
  
  const totalPercentage = levels.reduce((acc, level) => {
    return acc + (level.progress || 0);
  }, 0);
  
  return Math.round(totalPercentage / levels.length);
}

export function getNextLevel(levels, currentLevelId) {
  if (!levels || levels.length === 0) return null;
  
  const currentIndex = levels.findIndex(level => level.id === currentLevelId);
  if (currentIndex === -1 || currentIndex === levels.length - 1) return null;
  
  return levels[currentIndex + 1];
}

export function getLevelStatus(level, completedLevelIds) {
  if (!level) return 'locked';
  
  if (completedLevelIds?.includes(level.id)) {
    return 'completed';
  }
  
  if (level.progress > 0) {
    return 'in-progress';
  }
  
  return 'locked';
}

export function formatDuration(minutes) {
  if (!minutes || minutes === 0) return 'Self-paced';
  
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (mins === 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }
  
  return `${hours} hr${hours > 1 ? 's' : ''} ${mins} min`;
}

export function calculateStreakDays(activityDates) {
  if (!activityDates || activityDates.length === 0) return 0;
  
  const sortedDates = [...activityDates].sort((a, b) => new Date(b) - new Date(a));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  let currentDate = new Date(today);
  
  for (const dateStr of sortedDates) {
    const activityDate = new Date(dateStr);
    activityDate.setHours(0, 0, 0, 0);
    
    if (activityDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (activityDate.getTime() < currentDate.getTime()) {
      break;
    }
  }
  
  return streak;
}
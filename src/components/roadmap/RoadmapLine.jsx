export default function RoadmapLine({ isCompleted }) {
  return (
    <div className="flex justify-center py-4">
      <div
        className={`w-1 h-12 ${
          isCompleted ? 'bg-green-500' : 'bg-(--border-color)'
        } transition-colors`}
      />
    </div>
  );
}
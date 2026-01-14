export default function Loader({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} border-white/20 border-t-white rounded-full animate-spin`}
      />
      {text && <p className="text-(--text-secondary) text-sm">{text}</p>}
    </div>
  );
}
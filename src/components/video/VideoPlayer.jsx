export default function VideoPlayer({ video }) {
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    const id = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${id}`;
  };

  return (
    <div className="card">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
        <iframe
          className="w-full h-full"
          src={getYoutubeEmbedUrl(video.videoUrl)}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <h3 className="text-xl text-white font-semibold">
        {video.title}
      </h3>

      {video.description && (
        <p className="text-(--text-secondary) mt-2">
          {video.description}
        </p>
      )}
    </div>
  );
}

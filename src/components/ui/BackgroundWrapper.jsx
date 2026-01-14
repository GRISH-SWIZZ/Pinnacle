import { EtherealShadow } from './EtherealShadow';

export default function BackgroundWrapper({ children }) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0 bg-black">
        <EtherealShadow
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
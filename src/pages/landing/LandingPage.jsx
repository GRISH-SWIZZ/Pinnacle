import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [text, setText] = useState("");
  const fullText = "With PINNACLE";
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Typing animation
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Cursor glow
  useEffect(() => {
    const move = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Parallax
  useEffect(() => {
    const scroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed w-72 h-72 rounded-full bg-white/5 blur-3xl transition-transform duration-75"
        style={{
          left: cursor.x - 150,
          top: cursor.y - 150,
        }}
      />
      {/* HERO */}
      <section
        className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
        onMouseMove={(e) => {
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
          document.documentElement.style.setProperty("--mx", `${x}%`);
          document.documentElement.style.setProperty("--my", `${y}%`);
        }}
      >

        {/* Cursor glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full"
            style={{
              left: "var(--mx)",
              top: "var(--my)",
              transform: "translate(-50%,-50%)",
              transition: "0.1s linear"
            }}
          />
        </div>

        {/* Floating depth layer */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />

        {/* Content */}
        <div className="relative text-center max-w-5xl">

          <div className="mb-6 text-sm tracking-widest text-(--text-secondary) uppercase animate-fadeIn">
            Learning Reimagined
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 animate-fadeIn">
            Reach Your Peak
          </h1>

          <h2 className="text-4xl md:text-6xl font-bold text-(--text-secondary) mb-8 h-16">
            {text}
          </h2>

          <p className="text-lg md:text-xl text-(--text-secondary) max-w-3xl mx-auto mb-12 leading-relaxed animate-slideUp">
            Pinnacle is a structured learning ecosystem designed to transform beginners
            into industry-ready professionals through guided levels, assessments,
            coding challenges, projects, and certification.
          </p>

          <div className="flex justify-center gap-4 animate-slideUp">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-3">
              Sign In
            </Link>
          </div>

        </div>
      </section>




      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            ["📚", "Structured Roadmaps", "Learn from foundation to mastery"],
            ["📊", "Progress Tracking", "Visual roadmap & completion tracking"],
            ["🎓", "Certification", "Industry ready course certificates"],
          ].map((f, i) => (
            <div
              key={i}
              className="card text-center transform hover:-translate-y-3 transition-all duration-500 animate-float"
            >
              <div className="text-5xl mb-4">{f[0]}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{f[1]}</h3>
              <p className="text-(--text-secondary)">{f[2]}</p>
            </div>
          ))}
        </div>

      </section>

      {/* LEVEL FLOW */}
      <section className="relative py-24 bg-black/40">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-white mb-6">
            Your Learning Journey
          </h2>

          <p className="text-xl text-(--text-secondary) mb-16">
            A step-by-step transformation designed for real skill growth
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              "Foundation",
              "Competence",
              "Proficiency",
              "Advanced Video",
              "Coding Round",
              "Project Submission",
            ].map((level, i) => (
              <div
                key={i}
                className="relative card hover:border-white transition-all group"
              >
                <div className="absolute -top-4 left-4 bg-white text-black px-3 py-1 rounded-full text-sm font-bold">
                  Level {i + 1}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {level}
                </h3>

                <p className="text-(--text-secondary)">
                  Structured step in your mastery journey
                </p>

                <div className="mt-4 w-full h-1 bg-(--bg-primary)">
                  <div className="h-full w-0 bg-white group-hover:w-full transition-all duration-700" />
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* VIDEO DEMO */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Experience Pinnacle
            </h2>
            <p className="text-(--text-secondary) text-lg mb-6">
              Watch how Pinnacle transforms learning into a structured,
              achievement-driven experience.
            </p>
            <ul className="space-y-2 text-(--text-secondary)">
              <li>✔ Level unlocking system</li>
              <li>✔ Coding practice</li>
              <li>✔ Quiz evaluation</li>
              <li>✔ Certificate generation</li>
            </ul>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-(--border-color)">
            <video
              className="w-full aspect-video rounded-xl"
              src="/pinnacle.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-24 text-center">

        <h2 className="text-4xl font-bold text-white mb-6">
          Start Your Pinnacle Journey
        </h2>

        <p className="text-xl text-(--text-secondary) mb-10">
          Learn the right way. Prove your skills. Earn your future.
        </p>

        <Link to="/register" className="btn-primary text-lg px-10 py-4">
          Join Now
        </Link>

      </section>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        .animate-slideUp {
          animation: slideUp 1.2s ease forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}

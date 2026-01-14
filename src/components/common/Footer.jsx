import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-(--bg-secondary) border-t border-(--border-color) mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">
              PINNACLE
            </h3>

            <p className="text-(--text-secondary) text-sm leading-relaxed max-w-md">
              Pinnacle is a structured learning platform that guides learners
              from fundamentals to mastery through interactive levels,
              assessments, coding rounds, projects, and certifications.
            </p>

            {/* TECH STACK */}
            <div className="mt-6">
              <p className="text-white text-sm font-semibold mb-2">
                Built with
              </p>
              <p className="text-(--text-secondary) text-sm">
                React · Tailwind CSS · Spring Boot · MongoDB · Firebase Auth
              </p>
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses" className="footer-link">Courses</Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">Dashboard</Link>
              </li>
              <li>
                <Link to="/roadmap" className="footer-link">Learning Roadmap</Link>
              </li>
              <li>
                <Link to="/certificates" className="footer-link">Certificates</Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/login" className="footer-link">Login</Link>
              </li>
              <li>
                <Link to="/register" className="footer-link">Register</Link>
              </li>
              <li>
                <a href="#" className="footer-link">Support</a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-(--border-color) flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-(--text-secondary) text-sm">
            © {currentYear} Pinnacle Learning Platform. All rights reserved.
          </p>

          <p className="text-(--text-secondary) text-sm">
            Crafted by{' '}
            <a
              href="https://www.linkedin.com/in/grish-narayanan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              Grish Narayanan
            </a>
          </p>

        </div>

      </div>
    </footer>
  );
}

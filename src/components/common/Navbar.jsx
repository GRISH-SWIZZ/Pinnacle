import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-(--bg-secondary) border-b border-(--border-color)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img
              src="/logos.png"
              alt="Pinnacle Logo"
              className="h-8 w-10 object-contain"
            />
            <span className="text-2xl font-bold text-white">PINNACLE</span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-(--text-secondary) hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/courses"
                  className="text-(--text-secondary) hover:text-white transition-colors"
                >
                  Courses
                </Link>
                <Link
                  to="/my-courses"
                  className="text-(--text-secondary) hover:text-white transition-colors"
                >
                  My Courses
                </Link>

                <Link
                  to="/profile"
                  className="text-(--text-secondary) hover:text-white transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-(--text-secondary) hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/courses"
                  className="text-(--text-secondary) hover:text-white transition-colors"
                >
                  Courses
                </Link>
                <Link
                  to="/login"
                  className="text-(--text-secondary) hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
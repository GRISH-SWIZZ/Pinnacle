import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithEmail, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login with Google');
    }
  };

  const handleGithubLogin = async () => {
    setError('');
    try {
      await loginWithGithub();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login with GitHub');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-(--text-secondary)">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-white mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-(--border-color)"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-(--bg-secondary) text-(--text-secondary)">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleLogin}
              className="btn-secondary text-sm"
            >
              Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="btn-secondary text-sm"
            >
              GitHub
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-(--text-secondary) text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-white hover:underline">
              Sign up
            </Link>
          </p>
          <Link
            to="/phone-login"
            className="text-(--text-secondary) text-sm hover:text-white mt-2 inline-block"
          >
            Login with Phone
          </Link>
        </div>
      </div>
    </div>
  );
}
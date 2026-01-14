import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BackgroundWrapper from '../components/ui/BackgroundWrapper';
import { useAuth } from '../hooks/useAuth';

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <BackgroundWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </BackgroundWrapper>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </BackgroundWrapper>
  );
}
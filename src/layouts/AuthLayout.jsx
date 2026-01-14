import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BackgroundWrapper from '../components/ui/BackgroundWrapper';

export default function AuthLayout() {
  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </BackgroundWrapper>
  );
}
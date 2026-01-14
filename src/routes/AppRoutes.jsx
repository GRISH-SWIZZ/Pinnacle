import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import LandingPage from '../pages/landing/LandingPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import PhoneLogin from '../pages/auth/PhoneLogin';
import DashboardHome from '../pages/dashboard/DashboardHome';
import CourseList from '../pages/courses/CourseList';
import CourseDetails from '../pages/courses/CourseDetails';
import EnrolledCourses from '../pages/courses/EnrolledCourses';
import RoadmapView from '../pages/roadmap/RoadmapView';
import Foundation from '../pages/levels/Foundation';
import Competence from '../pages/levels/Competence';
import Proficiency from '../pages/levels/Proficiency';
import Mastery from '../pages/levels/Mastery';
import FinalAssessment from '../pages/exam/FinalAssessment';
import CertificateView from '../pages/certificate/CertificateView';
import Profile from '../pages/dashboard/Profile';
import Certificates from '../pages/dashboard/Certificates';
import Analytics from '../pages/dashboard/Analytics';
import Coding from "../pages/levels/Coding";
import Project from "../pages/levels/Project";



export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/phone-login" element={<PhoneLogin />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/my-courses" element={<EnrolledCourses />} />
        <Route path="/roadmap" element={<RoadmapView />} />
        <Route path="/levels/foundation" element={<Foundation />} />
        <Route path="/levels/competence" element={<Competence />} />
        <Route path="/levels/proficiency" element={<Proficiency />} />
        <Route path="/levels/advanced-video" element={<Mastery />} />
        <Route path="/levels/coding" element={<Coding />} />
        <Route path="/levels/project" element={<Project />} />



        <Route path="/exam" element={<FinalAssessment />} />
        <Route path="/certificate" element={<CertificateView />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/levels/:levelId" element={<Foundation />} />
      </Route>
    </Routes>
  );
}
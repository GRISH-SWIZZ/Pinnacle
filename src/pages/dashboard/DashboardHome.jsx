import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { courseService } from '../../services/courseService';
import { progressService } from '../../services/progressService';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

export default function DashboardHome() {
  const { user } = useAuth();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [certificatesEarned, setCertificatesEarned] = useState(0);
  const [courseProgressMap, setCourseProgressMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const coursesData = await courseService.getEnrolledCourses();
      const courses = coursesData.courses || coursesData || [];

      setEnrolledCourses(courses);

      let totalProgress = 0;
      let completedCourses = 0;
      const progressMap = {};

      for (let c of courses) {
        const courseId = c.course?.id || c.id;
        const progress = await progressService.getRoadmapProgress(courseId);

        const percent = progress?.percentage || 0;

        progressMap[courseId] = percent;
        totalProgress += percent;

        if (percent === 100) completedCourses++;
      }

      const avgProgress =
        courses.length > 0 ? Math.round(totalProgress / courses.length) : 0;

      setCourseProgressMap(progressMap);
      setOverallProgress(avgProgress);
      setCertificatesEarned(completedCourses);

    } catch (err) {
      console.error('Dashboard load failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Loader text="Loading dashboard..." />
      </div>
    );
  }

  const userName = user?.email
    ? user.email.split('@')[0]
    : 'Student';

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, {userName}!
        </h1>
        <p className="text-(--text-secondary)">
          Continue your learning journey
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <h3 className="text-(--text-secondary) text-sm">Courses Enrolled</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {enrolledCourses.length}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="text-(--text-secondary) text-sm">Overall Progress</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {overallProgress}%
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <h3 className="text-(--text-secondary) text-sm">Certificates Earned</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {certificatesEarned}
          </p>
        </div>

      </div>

      {/* CONTINUE LEARNING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Continue Learning</h2>
            <Link to="/my-courses" className="text-(--text-secondary) hover:text-white text-sm">
              View all
            </Link>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="space-y-4">
              {enrolledCourses.map((enrollment) => {
                const course = enrollment.course || enrollment;
                const progress = courseProgressMap[course.id] || 0;

                return (
                  <Link
                    key={course.id}
                    to={`/roadmap?course=${course.id}`}
                    className="block p-4 bg-(--bg-tertiary) rounded-lg hover:border-white border-2 border-transparent transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-semibold">
                        {course.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-(--text-secondary)" />
                    </div>

                    <div className="flex justify-between text-sm text-(--text-secondary) mb-2">
                      <span>{progress}% completed</span>
                      {progress === 100 && <span className="text-green-400">Completed</span>}
                    </div>

                    <div className="w-full bg-(--bg-primary) rounded-full h-2">
                      <div
                        className="bg-white h-full rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-(--text-secondary) mb-4">
                You haven't enrolled in any courses yet
              </p>
              <Link to="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/courses">
              <Button variant="secondary" className="w-full justify-between">
                Browse Courses <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/certificates">
              <Button variant="secondary" className="w-full justify-between">
                My Certificates <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="secondary" className="w-full justify-between">
                Edit Profile <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

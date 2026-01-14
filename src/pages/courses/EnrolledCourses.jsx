import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Award, ArrowRight } from 'lucide-react';
import { courseService } from '../../services/courseService';
import { progressService } from '../../services/progressService';

export default function EnrolledCourses() {
  const [list, setList] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const data = await courseService.getEnrolledCourses();
    const courses = data || [];

    setList(courses);

    const map = {};
    for (let e of courses) {
      const courseId = e.course?.id || e.courseId;
      const progress = await progressService.getRoadmapProgress(courseId);
      map[courseId] = progress?.percentage || 0;
    }

    setProgressMap(map);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center text-white">
        Loading your courses...
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl text-white mb-4">My Courses</h1>
        <p className="text-(--text-secondary) mb-6">
          You haven't enrolled in any courses yet.
        </p>
        <Link to="/courses" className="btn-primary">
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl text-white mb-2">My Courses</h1>
        <p className="text-(--text-secondary)">Continue where you left off</p>
      </div>

      <div className="space-y-8">
        {list.map(e => {
          const course = e.course || {};
          const courseId = course.id || e.courseId;
          const progress = progressMap[courseId] || 0;
          const completed = progress === 100;

          return (
            <div
              key={e.id}
              className={`relative rounded-xl overflow-hidden border 
                ${completed ? 'border-green-500/50 shadow-green-500/20 shadow-lg' : 'border-(--border-color)'}
                bg-black/50 backdrop-blur transition-all hover:border-white`}
            >

              {/* BANNER */}
              {(course.bannerURL || course.thumbnailURL) && (
                <img
                  src={course.bannerURL || course.thumbnailURL}
                  className="w-full h-48 object-cover opacity-90"
                />
              )}

              {/* STATUS BADGE */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${completed ? 'bg-green-500 text-black' : 'bg-white/10 text-white'}`}
                >
                  {completed ? 'Completed' : 'In Progress'}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h2 className="text-2xl text-white mb-1">
                  {course.title || 'Course'}
                </h2>

                <p className="text-(--text-secondary) mb-4">
                  {course.shortDescription || course.description || ''}
                </p>

                <div className="flex gap-6 text-(--text-secondary) text-sm mb-4">
                  <span className="flex gap-2 items-center">
                    <Clock size={16} /> {course.duration || 0} mins
                  </span>
                  <span className="flex gap-2 items-center">
                    <Users size={16} /> {course.totalEnrollments || 0}
                  </span>
                </div>

                {/* PROGRESS */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2 text-(--text-secondary)">
                    <span>{progress}% completed</span>
                    {!completed && <span>Keep going →</span>}
                  </div>
                  <div className="w-full bg-(--bg-primary) rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all 
                        ${completed ? 'bg-green-500' : 'bg-white'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={`/roadmap?course=${courseId}`}
                    className="btn-primary flex items-center gap-2"
                  >
                    {completed ? 'Review Course' : 'Continue Learning'}
                    <ArrowRight size={16} />
                  </Link>

                  {completed && (
                    <Link
                      to={`/certificate?course=${courseId}`}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Award size={16} />
                      View Certificate
                    </Link>
                  )}

                  <button
                    onClick={() =>
                      courseService.unenrollCourse(e.id).then(load)
                    }
                    className="btn-secondary"
                  >
                    Unenroll
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

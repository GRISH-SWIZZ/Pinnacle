import { useState, useEffect } from 'react';
import { courseService } from '../../services/courseService';
import CourseCard from '../../components/course/CourseCard';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAllCourses();
      setCourses(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white text-center p-10">Loading courses...</div>;

  if (error)
    return (
      <div className="card">
        <p className="text-red-400 text-center">{error}</p>
        <button onClick={loadCourses} className="btn-primary mt-4 mx-auto">Retry</button>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-6">Browse Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id || course.courseId} course={course} />
        ))}
      </div>
    </div>
  );
}

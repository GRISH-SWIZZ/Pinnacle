import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import EnrollButton from '../../components/course/EnrollButton';

export default function CourseDetails() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState(null);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    const data = await courseService.getCourseById(courseId);

    setCourse(data.course || data);
    setIsEnrolled(data.isEnrolled || false);
    setEnrollmentId(data.enrollmentId || null);
  };

  const handleEnrollmentChange = (enrolled, enrollId) => {
    setIsEnrolled(enrolled);
    setEnrollmentId(enrollId);
  };

  if (!course) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {course.thumbnailURL && (
        <img
          src={course.thumbnailURL}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-4xl text-white mb-4">{course.title}</h1>
      <p className="text-(--text-secondary) mb-6">{course.description}</p>

      <EnrollButton
        courseId={courseId}
        enrollmentId={enrollmentId}
        isEnrolled={isEnrolled}
        onEnrollmentChange={handleEnrollmentChange}
      />

    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import EnrollButton from './EnrollButton';

export default function CourseCard({ course }) {
  const courseId = course.courseId || course.id;

  const [isEnrolled, setIsEnrolled] = useState(course.isEnrolled || false);
  const [enrollmentId, setEnrollmentId] = useState(course.enrollmentId || null);

  const handleEnrollmentChange = (enrolled, enrollId) => {
    setIsEnrolled(enrolled);
    setEnrollmentId(enrollId);
  };

  return (
    <div className="card hover:border-white transition-all h-full flex flex-col">

      <Link to={`/courses/${courseId}`}>
        {course.thumbnailURL && (
          <img
            src={course.thumbnailURL}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <h3 className="text-xl font-semibold text-white">{course.title}</h3>
        <p className="text-(--text-secondary) text-sm">{course.shortDescription}</p>

        <div className="flex gap-4 mt-4 text-sm text-(--text-secondary)">
          <span className="flex gap-1">
            <Clock size={14} /> {course.duration} mins
          </span>
          <span className="flex gap-1">
            <Users size={14} /> {course.totalEnrollments}
          </span>
        </div>
      </Link>

      <div className="mt-4">
        <EnrollButton
          courseId={courseId}
          enrollmentId={enrollmentId}
          isEnrolled={isEnrolled}
          onEnrollmentChange={handleEnrollmentChange}
        />
      </div>
    </div>
  );
}

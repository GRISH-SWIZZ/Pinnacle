import { useState } from 'react';
import { courseService } from '../../services/courseService';

export default function EnrollButton({ courseId, enrollmentId, isEnrolled, onEnrollmentChange }) {
  const [loading, setLoading] = useState(false);

  const enroll = async () => {
    try {
      setLoading(true);
      const data = await courseService.enrollCourse(courseId);
      onEnrollmentChange(true, data.id);
    } catch (err) {
      console.error("Enroll failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const unenroll = async () => {
    try {
      setLoading(true);
      await courseService.unenrollCourse(enrollmentId);
      onEnrollmentChange(false, null);
    } catch (err) {
      console.error("Unenroll failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isEnrolled) {
    return (
      <button
        onClick={unenroll}
        disabled={loading}
        className="btn-secondary w-full disabled:opacity-50"
      >
        {loading ? "Processing..." : "Unenroll"}
      </button>
    );
  }

  return (
    <button
      onClick={enroll}
      disabled={loading}
      className="btn-primary w-full disabled:opacity-50"
    >
      {loading ? "Enrolling..." : "Enroll Now"}
    </button>
  );
}

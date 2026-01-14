import { useSearchParams, useNavigate } from "react-router-dom";
import { Award, Download } from "lucide-react";
import { getAuth } from "firebase/auth";
import { courseService } from "../../services/courseService";


export default function CertificateView() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const courseId = searchParams.get("course");

  const today = new Date().toLocaleDateString();

  const handleDownload = () => {
    alert("PDF download can be implemented later");
  };
  const auth = getAuth();
  const user = auth.currentUser;

  const userName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Student";


  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <div className="card bg-gradient-to-br from-(--bg-secondary) to-(--bg-tertiary) border-2 border-white/20 p-12 text-center">

        <Award className="w-20 h-20 text-yellow-500 mx-auto mb-6" />

        <h1 className="text-4xl font-bold text-white mb-4">
          Certificate of Completion
        </h1>

        <p className="text-(--text-secondary) mb-6">
          PINNACLE Learning Platform
        </p>

        <p className="text-(--text-secondary) mb-2">This certifies that</p>

        <p className="text-3xl font-bold text-white mb-4 capitalize">
          {userName}
        </p>


        <p className="text-(--text-secondary) mb-4">
          has successfully completed the course
        </p>

        <p className="text-2xl font-semibold text-white mb-6">
          Course ID: {courseId}
        </p>


        <p className="text-(--text-secondary) mb-8">
          Completed on {today}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleDownload}
            className="btn-primary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Certificate
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="btn-secondary"
          >
            Go to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

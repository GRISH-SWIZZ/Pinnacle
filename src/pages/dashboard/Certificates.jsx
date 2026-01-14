import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Download, Calendar, ExternalLink } from 'lucide-react';
import { certificateService } from '../../services/certificateService';
import { formatDate } from '../../utils/formatDate';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const data = await certificateService.getCertificates();
      setCertificates(data.certificates || data || []);
    } catch (err) {
      setError(err.message || 'Failed to load certificates');
      console.error('Failed to load certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loader text="Loading certificates..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={loadCertificates}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          My Certificates
        </h1>
        <p className="text-(--text-secondary)">
          View and download your earned certificates
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="card text-center py-12">
          <Award className="w-16 h-16 text-(--text-secondary) mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No Certificates Yet
          </h3>
          <p className="text-(--text-secondary) mb-6">
            Complete courses and pass exams to earn certificates
          </p>
          <Link to="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="card hover:border-white transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <Award className="w-12 h-12 text-yellow-500" />
                <span className="text-xs px-3 py-1 bg-green-900/20 text-green-400 rounded-full">
                  Verified
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {certificate.courseName}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-(--text-secondary) text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Completed {formatDate(certificate.completedAt, 'short')}
                  </span>
                </div>
                {certificate.score && (
                  <div className="text-(--text-secondary) text-sm">
                    Final Score: <span className="text-white font-semibold">{certificate.score}%</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/certificate/${certificate.id}`}
                  className="flex-1"
                >
                  <Button variant="secondary" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    alert('Download functionality will be implemented');
                  }}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
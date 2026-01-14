import { useState } from 'react';
import { User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/formatDate';
import Button from '../../components/common/Button';

export default function Profile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Profile update functionality will be implemented with backend integration');
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
        <p className="text-(--text-secondary)">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card text-center">
            <div className="w-24 h-24 bg-(--bg-tertiary) rounded-full mx-auto mb-4 flex items-center justify-center">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-(--text-secondary)" />
              )}
            </div>
            <h2 className="text-xl font-semibold text-white mb-1">
              {user?.displayName || user?.email?.split('@')[0] || 'User'}
            </h2>
            <p className="text-(--text-secondary) text-sm mb-4">{user?.email}</p>
            
            {user?.metadata?.creationTime && (
              <div className="flex items-center justify-center gap-2 text-(--text-secondary) text-sm">
                <Calendar className="w-4 h-4" />
                <span>
                  Joined {formatDate(user.metadata.creationTime, 'short')}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">
                Account Information
              </h3>
              {!editing && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="displayName" className="block text-white mb-2">
                    Display Name
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={formData.displayName}
                    onChange={(e) =>
                      setFormData({ ...formData, displayName: e.target.value })
                    }
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="input-field opacity-50 cursor-not-allowed"
                  />
                  <p className="text-(--text-secondary) text-sm mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button type="submit">Save Changes</Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-(--bg-tertiary) rounded-lg">
                  <User className="w-5 h-5 text-(--text-secondary)" />
                  <div>
                    <p className="text-(--text-secondary) text-sm">Display Name</p>
                    <p className="text-white">
                      {user?.displayName || 'Not set'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-(--bg-tertiary) rounded-lg">
                  <Mail className="w-5 h-5 text-(--text-secondary)" />
                  <div>
                    <p className="text-(--text-secondary) text-sm">Email</p>
                    <p className="text-white">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-(--bg-tertiary) rounded-lg">
                  <Calendar className="w-5 h-5 text-(--text-secondary)" />
                  <div>
                    <p className="text-(--text-secondary) text-sm">
                      Last Sign In
                    </p>
                    <p className="text-white">
                      {user?.metadata?.lastSignInTime
                        ? formatDate(user.metadata.lastSignInTime, 'datetime')
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="card mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Account Security
            </h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full">
                Change Password
              </Button>
              <Button variant="danger" className="w-full">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
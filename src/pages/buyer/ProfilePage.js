// pages/buyer/ProfilePage.js - User profile page with backend API
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import '../../styles/pages/profile.css';

const ProfilePage = () => {
  const { authState } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: authState.user.name,
    email: authState.user.email,
    address: authState.user.address || '',
    mobile: authState.user.mobile || '',
  });
  const [saveMessage, setSaveMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setError('');
    try {
      const data = await authAPI.updateProfile({
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
      });

      // Update localStorage auth cache
      const auth = JSON.parse(localStorage.getItem('auth') || '{}');
      auth.user = data.user;
      localStorage.setItem('auth', JSON.stringify(auth));

      setSaveMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Left sidebar */}
        <div className="profile-sidebar">
          <div className="profile-sidebar-top">
            <div className="profile-sidebar-avatar">
              {authState.user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="profile-sidebar-name">{authState.user.name}</div>
              <div className="profile-sidebar-edit">Edit Profile</div>
            </div>
          </div>
          <ul className="profile-sidebar-menu">
            <li className="active"><button type="button">My Account</button></li>
            <li><a href="/transactions">My Purchase</a></li>
            <li><a href="/notifications">Notifications</a></li>
          </ul>
        </div>

        {/* Main content */}
        <div className="profile-main">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <span>{authState.user.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="profile-title">
                <h2>{authState.user.name}</h2>
                <p>{authState.user.email}</p>
              </div>
            </div>

            {saveMessage && (
              <div className="success-message">{saveMessage}</div>
            )}
            {error && (
              <div className="error-message">{error}</div>
            )}

            {isEditing ? (
              <div className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-actions">
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-info">
                <div className="info-item">
                  <span className="label">Full Name</span>
                  <span className="value">{formData.name}</span>
                </div>

                <div className="info-item">
                  <span className="label">Email</span>
                  <span className="value">{formData.email}</span>
                </div>

                <div className="info-item">
                  <span className="label">Address</span>
                  <span className="value">{formData.address || 'Not provided'}</span>
                </div>

                <div className="info-item">
                  <span className="label">Mobile</span>
                  <span className="value">{formData.mobile || 'Not provided'}</span>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

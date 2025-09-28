import React from 'react';
import './Followers.css';

const Followers = ({ followers }) => {
  if (followers.length === 0) {
    return (
      <div className="no-data">
        <i className="fas fa-users"></i>
        <p>No followers found</p>
      </div>
    );
  }

  return (
    <div className="followers-container">
      <h3>Followers</h3>
      <div className="followers-grid">
        {followers.map(follower => (
          <div key={follower.id} className="follower-card">
            <img src={follower.avatar_url} alt={`${follower.login}'s avatar`} />
            <div className="follower-info">
              <h4>
                <a href={follower.html_url} target="_blank" rel="noopener noreferrer">
                  {follower.login}
                </a>
              </h4>
              <a 
                href={follower.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-profile-btn"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Followers;
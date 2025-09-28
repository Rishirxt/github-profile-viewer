import React from 'react';
import './Profile.css';

const Profile = ({ userData, repos, followers, activeTab, setActiveTab }) => {
  const {
    avatar_url,
    name,
    login,
    bio,
    html_url,
    followers: followersCount,
    following,
    public_repos,
    location,
    blog,
    twitter_username,
    company
  } = userData;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={avatar_url} alt={`${name || login}'s avatar`} />
        </div>
        <div className="profile-info">
          <h1>{name || login}</h1>
          <h2>@{login}</h2>
          {bio && <p className="profile-bio">{bio}</p>}
          
          <div className="profile-stats">
            <div className="stat">
              <strong>{public_repos}</strong>
              <span>Repositories</span>
            </div>
            <div className="stat">
              <strong>{followersCount}</strong>
              <span>Followers</span>
            </div>
            <div className="stat">
              <strong>{following}</strong>
              <span>Following</span>
            </div>
          </div>

          <div className="profile-details">
            {company && (
              <div className="detail">
                <i className="fas fa-building"></i>
                <span>{company}</span>
              </div>
            )}
            {location && (
              <div className="detail">
                <i className="fas fa-map-marker-alt"></i>
                <span>{location}</span>
              </div>
            )}
            {blog && (
              <div className="detail">
                <i className="fas fa-link"></i>
                <a href={blog.startsWith('http') ? blog : `https://${blog}`} target="_blank" rel="noopener noreferrer">
                  {blog}
                </a>
              </div>
            )}
            {twitter_username && (
              <div className="detail">
                <i className="fab fa-twitter"></i>
                <a href={`https://twitter.com/${twitter_username}`} target="_blank" rel="noopener noreferrer">
                  @{twitter_username}
                </a>
              </div>
            )}
          </div>

          <a href={html_url} target="_blank" rel="noopener noreferrer" className="github-link">
            <i className="fab fa-github"></i>
            View on GitHub
          </a>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'repos' ? 'active' : ''}`}
          onClick={() => setActiveTab('repos')}
        >
          <i className="fas fa-book"></i>
          Repositories ({repos.length})
        </button>
        <button 
          className={`tab ${activeTab === 'followers' ? 'active' : ''}`}
          onClick={() => setActiveTab('followers')}
        >
          <i className="fas fa-users"></i>
          Followers ({followers.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'repos' && (
          <div className="repos-container">
            <h3>Public Repositories</h3>
            {repos.length === 0 ? (
              <div className="no-data">
                <i className="fas fa-inbox"></i>
                <p>No repositories found</p>
              </div>
            ) : (
              <div className="repos-grid">
                {repos.map(repo => (
                  <div key={repo.id} className="repo-card">
                    <div className="repo-header">
                      <h4>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          {repo.name}
                        </a>
                      </h4>
                      {repo.fork && <span className="fork-badge">Fork</span>}
                    </div>
                    
                    {repo.description && (
                      <p className="repo-description">{repo.description}</p>
                    )}
                    
                    <div className="repo-stats">
                      {repo.language && (
                        <span className="repo-language">
                          <span className="language-color"></span>
                          {repo.language}
                        </span>
                      )}
                      <span className="repo-star">
                        <i className="fas fa-star"></i>
                        {repo.stargazers_count}
                      </span>
                      <span className="repo-fork">
                        <i className="fas fa-code-branch"></i>
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'followers' && (
          <div className="followers-container">
            <h3>Followers</h3>
            {followers.length === 0 ? (
              <div className="no-data">
                <i className="fas fa-users"></i>
                <p>No followers found</p>
              </div>
            ) : (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
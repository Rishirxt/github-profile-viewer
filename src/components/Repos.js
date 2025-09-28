import React from 'react';
import './Repos.css';

const Repos = ({ repos }) => {
  if (repos.length === 0) {
    return (
      <div className="no-data">
        <i className="fas fa-inbox"></i>
        <p>No repositories found</p>
      </div>
    );
  }

  return (
    <div className="repos-container">
      <h3>Public Repositories</h3>
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
              {repo.updated_at && (
                <span className="repo-updated">
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Repos;
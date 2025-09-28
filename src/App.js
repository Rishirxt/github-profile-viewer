// src/App.js
import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import Profile from './components/Profile';

function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [activeTab, setActiveTab] = useState('repos');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  const fetchUserData = async (username) => {
    if (!username) return;
    
    setLoading(true);
    setError('');
    
    try {
      const headers = {};
      if (GITHUB_TOKEN) {
        headers.Authorization = `token ${GITHUB_TOKEN}`;
      }

      const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
      
      if (!userResponse.ok) {
        if (userResponse.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please wait 1 hour or add a GitHub token for unlimited access.');
        } else if (userResponse.status === 404) {
          throw new Error(`User "${username}" not found. Check the spelling and try again.`);
        } else {
          throw new Error(`GitHub API error: ${userResponse.status}`);
        }
      }
      
      const userData = await userResponse.json();
      setUserData(userData);
      
      const reposResponse = await fetch(userData.repos_url + '?per_page=100&sort=updated', { headers });
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
      const reposData = await reposResponse.json();
      setRepos(reposData);
      
      const followersResponse = await fetch(userData.followers_url + '?per_page=100', { headers });
      if (!followersResponse.ok) throw new Error('Failed to fetch followers');
      const followersData = await followersResponse.json();
      setFollowers(followersData);
      
    } catch (err) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>GitHub Profile Viewer</h1>
        <p>Discover developers and explore their amazing work</p>
        {GITHUB_TOKEN ? (
          <div className="auth-success">
            <i className="fas fa-check-circle"></i>
            Authenticated • 5,000 requests/hour
          </div>
        ) : (
          <div className="rate-limit-info">
            <i className="fas fa-info-circle"></i>
            Unauthenticated • 60 requests/hour limit
          </div>
        )}
      </header>

      <Search onSearch={fetchUserData} loading={loading} />

      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
        </div>
      )}

      {userData && (
        <Profile 
          userData={userData}
          repos={repos}
          followers={followers}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
}

export default App;
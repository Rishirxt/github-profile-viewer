import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch, loading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading || !username.trim()}>
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Searching...
            </>
          ) : (
            <>
              <i className="fab fa-github"></i>
              Search
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Search;
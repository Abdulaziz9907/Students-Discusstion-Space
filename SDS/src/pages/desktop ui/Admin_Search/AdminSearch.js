import Navbar from '../../../components/assests/Navbar/Navbar';
import React, { useState } from 'react';
import './AdminSearch.css';

import account_logo3 from '../../desktop ui/login/elements/Vector3.png';
import account_logo4 from '../../desktop ui/login/elements/Vector4.png';
import account_logo6 from '../../desktop ui/login/elements/Vector6.png';

const SearchResults = () => {
  const [query, setQuery] = useState('math'); // Initial search query
  const [results, setResults] = useState([
    { id: 1, name: 'MATH208' },
    { id: 2, name: 'MATH201' },
    { id: 3, name: 'MATH102' },
    { id: 4, name: 'MATH001' },
    { id: 5, name: 'MATH101' },
  ]);

  const handleDelete = (id) => {
    // Filter out the course to be deleted
    setResults(results.filter((result) => result.id !== id));
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    // Add logic here to fetch or filter results based on `query`
  };

  return (
    <>
      <header>
        <Navbar />
        <img src={account_logo3} alt="comp1" id="Dis_Vec3" className="DisImage" />
        <img src={account_logo4} alt="comp2" id="Dis_Vec4" className="DisImage" />
        <img src={account_logo6} alt="comp3" id="Dis_Vec6" className="DisImage" />
      </header>

      <main>
        <div className="space"></div>
        <section className="search-results-section">
          <h2>Search results for: <span id="search-query">{query}</span></h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={handleSearch}
            />
          </div>

          <div className="results-list">
            {results.map((result) => (
              <div key={result.id} className="result-item">
                <span>{result.id}-{result.name}</span>
                <div className="result-actions">
                  <button className="delete-btn" onClick={() => handleDelete(result.id)}>Delete course</button>
                  <button className="details-btn">View details</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="pagination">
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <span>…</span>
          <a href="#">6</a>
          <a href="#">{">"}</a>
        </div>
      </footer>
    </>
  );
};

export default SearchResults;

import './Search_results.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import FooterNav from '../../../components/assests/FooterNav/FooterNav';
import sr_logo3 from './elements/Vector3.png';
import sr_logo4 from './elements/Vector4.png';
import sr_logo5 from './elements/Vector5.png';
import sr_logo6 from './elements/Vector6.png';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Search_results() {
  const location = useLocation();
  const initialCourseId = (location.state && location.state.courseId) || '';
  const [courseId, setCourseId] = useState(initialCourseId);
  const [searchTerm, setSearchTerm] = useState(initialCourseId);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalPages = 6;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fetch the courses when `searchTerm` changes
  useEffect(() => {
    const fetchCourses = async () => {
      if (searchTerm) {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:3002/courses', {
            params: { courseId: searchTerm },
          });
          setResults(response.data);
          console.log('courses: ', response.data);
        } catch (error) {
          console.error('Error fetching courses:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourses();
  }, [searchTerm]);

  const handleSearchInput = (e) => {
    setCourseId(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(courseId);
    }
  };

  return (
    <div className='sr_body'>
      <div id='sr_items'>
        <div>
          <Navbar />
        </div>
        <div>
          <p id='sr_text'>Search Results For: {searchTerm}</p>
        </div>

        <div className="sr_search-container">
          <input
            type="text"
            placeholder="Type to search..."
            className="sr_search-bar"
            value={courseId}
            onChange={handleSearchInput}
            onKeyDown={handleSearchSubmit}
          />
        </div>
      </div>

      <img src={sr_logo3} alt="comp1" id='sr_Vec3' className='sr_LogImage' />
      <img src={sr_logo4} alt="comp1" id='sr_Vec4' className='sr_LogImage' />
      <img src={sr_logo5} alt="comp1" id='sr_Vec5' className='sr_LogImage' />
      <img src={sr_logo6} alt="comp1" id='sr_Vec6' className='sr_LogImage' />

      <div id='sr_results_container'>
        <div id="sr_results">
          {loading ? (
            <div className="loading-container">
              <span>Loading...</span>
            </div>
          ) : results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} id={`sr_result`}>
                <span className={`sr_result-text`}>
                  {`${index + 1} - ${result}`}
                </span>
                <button className="sr_result-button">View details</button>
              </div>
            ))
          ) : (
            <p id='sr_text' className='sr_notfound_text'>
              Sorry, we couldn't find anything for: "{searchTerm}"
            </p>
          )}
        </div>
      </div>

      {/* <div className='sr_results-footer'>
        <FooterNav
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div> */}
    </div>
  );
}

export default Search_results;
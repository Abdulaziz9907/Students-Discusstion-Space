import './Search_results.css';
import Navbar from '../../../components/assests/Navbar/Navbar';
import FooterNav from '../../../components/assests/FooterNav/FooterNav';
import sr_logo3 from './elements/Vector3.png';
import sr_logo4 from './elements/Vector4.png';
import sr_logo5 from './elements/Vector5.png';
import sr_logo6 from './elements/Vector6.png';
import { useContext,useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Updated import
import { UserContext } from '../../../context/userContext';
import { ToastContainer, toast, Flip } from 'react-toastify';
import axios from 'axios';
import { ring2 } from 'ldrs';



ring2.register();

function Search_results() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const initialCourseId = (location.state && location.state.courseId) || '';
  const [courseId, setCourseId] = useState(initialCourseId);
  const [searchTerm, setSearchTerm] = useState(initialCourseId);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const totalPages = 6;

  const { userName } = useContext(UserContext);
  console.log(userName + " account in mainpage ");

  // Fetch the courses when `searchTerm` changes
  useEffect(() => {
    const fetchCourses = async () => {
      if (searchTerm) {
        setLoading(true);
        setNoResults(false);
        try {
          const response = await axios.get('http://localhost:3002/courses', {
            params: { courseId: searchTerm },
          });
          setResults(response.data);
          console.log('courses: ', response.data);

          // Only set noResults to true if the request succeeds but returns no results
          if (response.data.length === 0) {
            setNoResults(true);
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
          setResults([]);
          setNoResults(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourses();
  }, [searchTerm]);






  const handleDeleteClick = async (courseId) => {
    console.log("Attempting to delete course with courseId:", courseId);
      try {
        const response = await fetch(`http://localhost:3002/delete-course/${courseId}`, {
          method: "DELETE",
        });

        const data = await response.json();
        console.log("Response from server:", data);
        if (response.ok) {
          
          toast.success('Course deleted successfully', {
            position: 'top-right',
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Flip,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1200); 
          
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error while deleting course:", error);
        alert("An error occurred while deleting the course.");
      }
    };









  const handleSearchInput = (e) => {
    setCourseId(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(courseId);
    }
  };

  const handleViewDetails = async (courseId) => {
    try {
      console.log("getting "+courseId+" visits")
      await axios.put(`http://localhost:3002/coursesVisits`, { 
        courseId: courseId 
      });
    
      navigate('/CourseDetails', { state: { courseId } });
    } catch (error) {
      console.error('Error incrementing course visits:', error.response?.data || error.message);
      navigate('/CourseDetails', { state: { courseId } });
    }
  };
  

  return (
    <div className="sr_body">
            <ToastContainer />

      <div id="sr_items">
        <div>
          <Navbar />
        </div>
        <div>
          <p id="sr_text">Search Results For: {searchTerm}</p>
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

      <img src={sr_logo3} alt="comp1" id="sr_Vec3" className="sr_LogImage" />
      <img src={sr_logo4} alt="comp1" id="sr_Vec4" className="sr_LogImage" />
      <img src={sr_logo5} alt="comp1" id="sr_Vec5" className="sr_LogImage" />
      <img src={sr_logo6} alt="comp1" id="sr_Vec6" className="sr_LogImage" />

      <div id="sr_results_full">
        <div id="sr_results_container">
          <div id="sr_results">
            {loading ? (
              <div className="loading-container">
                <l-ring-2
                  size="70"
                  stroke="9"
                  stroke-length="0.25"
                  bg-opacity="0.1"
                  speed="0.8"
                  color="white"
                ></l-ring-2>
              </div>
            ) : noResults ? (
              <p id="sr_text" className="sr_notfound_text">
                Sorry, we couldn't find anything for: "{searchTerm}"
              </p>
            ) : results.length > 0 ? (
              results.map((result, index) => (
                <div key={index} id={`sr_result`}>
                  <span className={`sr_result-text`}>
                    {`${index + 1} - ${result}`}
                  </span>

                  <div id='sr_btns'> 
                  {userName === 'admin' && (
                  <button className="sr_Delete-button" onClick={() => handleDeleteClick(result)}>Delete course</button>
                  )}
                  <button
                    className="sr_result-button"
                    onClick={() => handleViewDetails(result)}
                  >
                    View details
                  </button>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search_results;

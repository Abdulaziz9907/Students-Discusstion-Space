import './courseRating.css';
import Navbar from '../../../components/assests/Navbar/Navbar';

import login_logo2 from './elements/Vector2.png';
import login_logo3 from './elements/Vector3.png';
import login_logo4 from './elements/Vector4.png';
import login_logo5 from './elements/Vector5.png';
import login_logo6 from './elements/Vector6.png';
import login_logo from './elements/Component 1.png';



function CourseRating() {
  return (
    <div className='parent'>



      <img src={login_logo2} alt="comp1" id='loginVec2' className='loginLogImage'/>
      <img src={login_logo3} alt="comp1" id='loginVec3' className='loginLogImage'/>
      <img src={login_logo4} alt="comp1" id='loginVec4' className='loginLogImage'/>
      <img src={login_logo5} alt="comp1" id='loginVec5' className='loginLogImage'/>
      <img src={login_logo6} alt="comp1" id='loginVec6' className='loginLogImage'/>
      
      
      <h1 className='course-name'>MATH208</h1>
      

      <div className="course-header">
        
        <p >Course dificulty rating: <span className="rating-stars">★★★★☆</span></p>
        <button>Add Rating</button>
        
      </div>
      {/* Render reviews and pagination components here */}
      <Review author= "Mohammed" timestamp="12:00" content="Good"/>
      <Review author= "Ahmed" timestamp="11:00" content="Not bad course "/>
      <Review author= "Saud" timestamp="10:00" content="Easy course"/>


    </div>
  );
}


const Review = ({ author, timestamp, content }) => {
  return (
    <div className="review">
      <p>{content}</p>
      <div className="review-meta">
        <span>{author}</span> 
        &nbsp;
        <span>{timestamp}</span>
      </div>
    </div>
  );
};
export default CourseRating;













import logo from './logo.svg';
import './App.css';

import Login from './pages/desktop ui/login/login';
import Signup from './pages/desktop ui/signup/signup';
import Main_Webpage from './pages/desktop ui/main_webpage/main_webpage';
import Account from './pages/desktop ui/account/account';
import CourseRating from './pages/desktop ui/courseRating/courseRating';
import AddRating from './pages/desktop ui/addRating/addRating';
import Search_results from './pages/desktop ui/Search_results/Search_results';
import CourseQuestions from './pages/desktop ui/courseQuestions/courseQuestions';
import QuestionDetails from './pages/desktop ui/questionDetails/questionDetails';
import CourseDiscussions from './pages/desktop ui/courseDiscussions/courseDiscussions';
import ReplyOnQuestion from './pages/desktop ui/replyOnQuestion/replyOnQuestion';
import ReplyOnDiscussion from './pages/desktop ui/replyOnDiscussion/replyOnDiscussion';
import PostQuestion from './pages/desktop ui/postQuestion/postQuestion';
import PostDiscussion from './pages/desktop ui/postDiscussion/postDiscussion';
import Account_search_results from './pages/desktop ui/Account_search_results/Account_search_results';
import Account_info from './pages/desktop ui/Account_info/Account_info';
import Add_Course from './pages/desktop ui/Add_Course/AddCourse';
import Admin_main from './pages/desktop ui/Admin_main/Admin_main';
import Admin_Search from './pages/desktop ui/Admin_Search/AdminSearch';
import Discussion from './pages/desktop ui/Discussion/Discussion';
import CourseDetails from './pages/desktop ui/CourseDetails/CourseDetails';
import Post from './pages/desktop ui/Discussion/Post';
import Reply from './pages/desktop ui/Discussion/Reply';
import Files from './pages/desktop ui/Files/Files';
import Upload from './pages/desktop ui/Files/Upload';
import { UserProvider } from '../src/context/userContext';

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
   return (
       <UserProvider>
      <BrowserRouter>
   

         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/Main Webpage" element={<Main_Webpage />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Search Results" element={<Search_results />} />
            <Route path="/CourseDetails" element={<CourseDetails />} />
            <Route path="/CourseRating" element={<CourseRating />} />
            <Route path="/AddRating" element={<AddRating />} />
            <Route path="/CourseQuestions" element={<CourseQuestions />} />
            <Route path="/QuestionDetails" element={<QuestionDetails />} />
            <Route path="/CourseDiscussions" element={<CourseDiscussions />} />
            <Route path="/ReplyOnQuestion" element={<ReplyOnQuestion />} />
            <Route path="/ReplyOnDiscussion" element={<ReplyOnDiscussion />} />
            <Route path="/PostQuestion" element={<PostQuestion />} />
            <Route path="/PostDiscussion" element={<PostDiscussion />} />
            <Route path="/Account search results" element={<Account_search_results />} />
            <Route path="/Account info" element={<Account_info />} />
            <Route path="/AddCourse" element={<Add_Course />} />
            <Route path="/AdminMain" element={<Admin_main />} />
            <Route path="/AdminSearch" element={<Admin_Search />} />
            <Route path="/Discussion" element={<Discussion />} />
            <Route path="/Post" element={<Post />} />
            <Route path="/Reply" element={<Reply />} />
            <Route path="/Files" element={<Files />} />
            <Route path="/Upload" element={<Upload />} />
         </Routes>
         
      </BrowserRouter>  
     </UserProvider>        
  );
}

export default App;

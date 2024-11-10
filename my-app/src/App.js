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

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/Main Webpage" element={<Main_Webpage />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Search Results" element={<Search_results />} />
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
         </Routes>
      </BrowserRouter>         
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

import Login from './pages/desktop ui/login/login';
import Signup from './pages/desktop ui/signup/signup';
import Main_Webpage from './pages/desktop ui/main_webpage/main_webpage';
import Account from './pages/desktop ui/account/account';
import CourseRating from './pages/desktop ui/courseRating/courseRating';

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/Main Webpage" element={<Main_Webpage />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/CourseRating" element={<CourseRating />} />
         </Routes>
      </BrowserRouter>         
  );
}

export default App;

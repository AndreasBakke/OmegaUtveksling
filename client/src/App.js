import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import NewCourses from './pages/newCourses'
import Overview from './pages/overview';
import CoursePage from './pages/coursePage';
  
function App() {
return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/'   element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/newCourses' element={<NewCourses/>} />
        <Route path='/overview' element={<Overview/>} />
        <Route path='/course/:courseid' element={<CoursePage/>} />
    </Routes>
    </Router>
);
}
  
export default App;
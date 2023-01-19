import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import ***REMOVED*** BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import NewCourses from './pages/newCourses'
import Overview from './pages/overview';
  
function App() ***REMOVED***
return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/'   element=***REMOVED***<Home />} />
        <Route path='/about' element=***REMOVED***<About/>} />
        <Route path='/newCourses' element=***REMOVED***<NewCourses/>} />
        <Route path='/overview' element=***REMOVED***<Overview/>} />
    </Routes>
    </Router>
);
}
  
export default App;
import React, ***REMOVED***useState, useEffect, useReducer} from 'react';
import CoursesList from '../components/CoursesList';
import FilterBar from '../components/FilterBar';


const coursesReducer = (state, action) => ***REMOVED***
  switch(action.type) ***REMOVED***
    case 'FETCH_COURSES_START':
      return ***REMOVED***
        ...state,
        isLoading: true
    ***REMOVED***;
    case 'FETCH_COURSES_SUCCESS':
      return ***REMOVED***
        ...state,
        isLoading: false,
        data: action.payload
    ***REMOVED***;
    case 'REMOVE_COURSE':
      return ***REMOVED***
        ...state,
        data: state.filter(
        course => action.payload.id !== course.id
        )
    ***REMOVED***;
    default: 
      throw new Error();
***REMOVED***
};



const Overview = () => ***REMOVED***
    const [searchText, setSearchText] = useState(
        localStorage.getItem('searchText') || '');
    
    const [courseType, setCourseType] = useState(
        localStorage.getItem('courseType') || 'all');

    const [courses, dispatchCourses] = useReducer(
        coursesReducer,
        ***REMOVED***data: [], isLoading: false}
    );
  
  const [isLoading, setIsLoading] =useState(false);

  useEffect(() => ***REMOVED***
    dispatchCourses(***REMOVED***type: 'FETCH_COURSES_START'});
    fetch("/courses")
      .then(response => response.json())
      .then(
        result => ***REMOVED***
          dispatchCourses(***REMOVED***
            type: 'FETCH_COURSES_SUCCESS',
            payload: result
        ***REMOVED***);
      ***REMOVED***
      )
      .catch((e) => console.log("error fetching courses" + e))
***REMOVED***, []);

  useEffect(()=> ***REMOVED***
      localStorage.setItem('searchText', searchText)
***REMOVED***, [searchText]); //function runs every time any of the state variables within [] is updated (here only searchtext)

  useEffect(() => ***REMOVED***
    localStorage.setItem('courseType', courseType)
***REMOVED***)


  const filteredCourses = courses.data.filter(course => ***REMOVED***
    
    return (courseType == "all" || course.type.join(" ").includes(courseType)) && (course.country.toLowerCase().includes(searchText.toLowerCase()) || course.city.toLowerCase().includes(searchText.toLowerCase())  || course.university.toLowerCase().includes(searchText.toLowerCase())  || course.name.toLowerCase().includes(searchText.toLowerCase()) || course.equivalent.join(" ").toLowerCase().includes(searchText.toLowerCase()))
***REMOVED***);

  const handleSearch = event => ***REMOVED***
    setSearchText(event.target.value);
***REMOVED***;

    const handleCourseTypeChange = event => ***REMOVED***
    setCourseType(event.target.value);
***REMOVED***

  
  return (
    <div id='overviewContent'>
    <br/>
        <FilterBar searchValue=***REMOVED***searchText} courseTypeValue=***REMOVED***courseType} onSearch=***REMOVED***handleSearch} onTypeChange=***REMOVED***handleCourseTypeChange}/>
        ***REMOVED***courses.isLoading ? (<p>Loading Courses...</p>) : 
        (<CoursesList courses=***REMOVED***filteredCourses} />)
      ***REMOVED***
    
  </div>
  ); 
};
export default Overview;
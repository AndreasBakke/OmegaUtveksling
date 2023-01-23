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
    
    const [semesterValue, setSemesterValue] = useState(
        localStorage.getItem('semesterValue') || 'begge')

    const [courses, dispatchCourses] = useReducer(
        coursesReducer,
        ***REMOVED***data: [], isLoading: false}
    );
  
  const [isLoading, setIsLoading] =useState(false);

  useEffect(() => ***REMOVED***
    dispatchCourses(***REMOVED***type: 'FETCH_COURSES_START'});
    fetch("/getCourses")
      .then(response => response.json())
      .then(
        result => ***REMOVED***
          var array = [];
          var data = result.data;
          for(var key in data) ***REMOVED***
            var course = data[key];
            course.id=key;
            array.push(course);
        ***REMOVED***
          dispatchCourses(***REMOVED***
            type: 'FETCH_COURSES_SUCCESS',
            payload: array
        ***REMOVED***);
      ***REMOVED***
      )
      .catch((e) => console.log("error fetching courses " + e))
***REMOVED***, []);

  useEffect(()=> ***REMOVED***
      localStorage.setItem('searchText', searchText)
***REMOVED***, [searchText]); //function runs every time any of the state variables within [] is updated (here only searchtext)

  useEffect(() => ***REMOVED***
    localStorage.setItem('courseType', courseType)
***REMOVED***, [courseType]);

  useEffect(() => ***REMOVED***
    localStorage.setItem('semesterValue', semesterValue)
***REMOVED***, [semesterValue]);

  const filteredCourses = courses.data.filter(course => ***REMOVED***
    return (courseType == "all" || course.type.join(" ").includes(courseType)) && (semesterValue == "begge" || course.semester.join(" ").includes(semesterValue)) && (course.country.toLowerCase().includes(searchText.toLowerCase()) || course.city.toLowerCase().includes(searchText.toLowerCase())  || course.university.toLowerCase().includes(searchText.toLowerCase())  || course.name.toLowerCase().includes(searchText.toLowerCase()) || course.equivalent.join(" ").toLowerCase().includes(searchText.toLowerCase()))
***REMOVED***);


    //filtrering kan senere gjøres noe sånn. men med state som har value og asc/dec for hva som skal filtreres
  filteredCourses.sort((a,b) => ***REMOVED***
    if(a.country < b.country)***REMOVED***
      return -1;
  ***REMOVED***
***REMOVED***)

  const handleSearch = event => ***REMOVED***
    setSearchText(event.target.value);
***REMOVED***;

  const handleCourseTypeChange = event => ***REMOVED***
    setCourseType(event.target.value);
***REMOVED***

  const handleSemesterChoiceChange =event => ***REMOVED***
    setSemesterValue(event.target.value);
***REMOVED***

  
  return (
    <div id='overviewContent'>
    ***REMOVED***/*<h2 onClick=***REMOVED***addCourse}>test</h2>*/}
    <h1 className='centerHeader'>Oversikt over emner</h1>
    <br/>
        <FilterBar searchValue=***REMOVED***searchText} courseTypeValue=***REMOVED***courseType} courseSemesterValue=***REMOVED***semesterValue} onSearch=***REMOVED***handleSearch} onTypeChange=***REMOVED***handleCourseTypeChange} onSemesterChange=***REMOVED***handleSemesterChoiceChange}/>
        ***REMOVED***courses.isLoading ? (<p>Laster inn fag..</p>) : 
        (<CoursesList courses=***REMOVED***filteredCourses}/>)
      ***REMOVED***
    
  </div>
  ); 
};
export default Overview;
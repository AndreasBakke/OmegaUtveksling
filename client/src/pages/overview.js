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



async function addCourse()***REMOVED***
  
  await fetch('http://localhost:3001/addCourse',***REMOVED***
    method: 'POST',
    headers: ***REMOVED***
      'Content-Type': 'application/json',
  ***REMOVED***,
    body: JSON.stringify(***REMOVED***country: 'italia', city: 'torino', uni: 'politecnico di torino', name: 'operating systems for embedded systems', code: '02NPSOV', modality: ['s', 'p'], semester: ["høst"],type: ["ias"], url: ["https://didattica.polito.it/pls/portal30/gap.pkg_guide.viewGap?p_cod_ins=02NPSOV&p_a_acc=2023&p_header=S&p_lang=IT&multi=N"], language: ["engelsk"], equivalent: [""]})
***REMOVED***)
}


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
      .catch((e) => console.log("error fetching courses" + e))
***REMOVED***, []);

  useEffect(()=> ***REMOVED***
      localStorage.setItem('searchText', searchText)
***REMOVED***, [searchText]); //function runs every time any of the state variables within [] is updated (here only searchtext)

  useEffect(() => ***REMOVED***
    localStorage.setItem('courseType', courseType)
***REMOVED***)

  const filteredCourses = courses.data.filter(course => ***REMOVED***
      console.log(course)
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
    <h2 onClick=***REMOVED***addCourse}>test</h2>
    <br/>
        <FilterBar searchValue=***REMOVED***searchText} courseTypeValue=***REMOVED***courseType} onSearch=***REMOVED***handleSearch} onTypeChange=***REMOVED***handleCourseTypeChange}/>
        ***REMOVED***courses.isLoading ? (<p>Loading Courses...</p>) : 
        (<CoursesList courses=***REMOVED***filteredCourses} />)
      ***REMOVED***
    
  </div>
  ); 
};
export default Overview;
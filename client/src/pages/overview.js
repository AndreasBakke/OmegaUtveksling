import React, {useState, useEffect, useReducer} from 'react';
import CoursesList from '../components/CoursesList';
import FilterBar from '../components/FilterBar';


const coursesReducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_COURSES_START':
      return {
        ...state,
        isLoading: true
      };
    case 'FETCH_COURSES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case 'REMOVE_COURSE':
      return {
        ...state,
        data: state.filter(
        course => action.payload.id !== course.id
        )
      };
    default: 
      throw new Error();
  }
};





const Overview = () => {
    const [searchText, setSearchText] = useState(
        localStorage.getItem('searchText') || '');
    
    const [courseType, setCourseType] = useState(
        localStorage.getItem('courseType') || 'all');
    
    const [semesterValue, setSemesterValue] = useState(
        localStorage.getItem('semesterValue') || 'begge')

    const [courses, dispatchCourses] = useReducer(
        coursesReducer,
        {data: [], isLoading: false}
    );
  
  const [isLoading, setIsLoading] =useState(false);

  useEffect(() => {
    dispatchCourses({type: 'FETCH_COURSES_START'});
    fetch("/getCourses")
      .then(response => response.json())
      .then(
        result => {
          var array = [];
          var data = result.data;
          for(var key in data) {
            var course = data[key];
            course.id=key;
            array.push(course);
          }
          dispatchCourses({
            type: 'FETCH_COURSES_SUCCESS',
            payload: array
          });
        }
      )
      .catch((e) => console.log("error fetching courses " + e))
  }, []);

  useEffect(()=> {
      localStorage.setItem('searchText', searchText)
  }, [searchText]); //function runs every time any of the state variables within [] is updated (here only searchtext)

  useEffect(() => {
    localStorage.setItem('courseType', courseType)
  }, [courseType]);

  useEffect(() => {
    localStorage.setItem('semesterValue', semesterValue)
  }, [semesterValue]);

  const filteredCourses = courses.data.filter(course => {
    return (courseType == "all" || course.type.join(" ").includes(courseType)) && (semesterValue == "begge" || course.semester.join(" ").includes(semesterValue)) && (course.country.toLowerCase().includes(searchText.toLowerCase()) || course.city.toLowerCase().includes(searchText.toLowerCase())  || course.university.toLowerCase().includes(searchText.toLowerCase())  || course.name.toLowerCase().includes(searchText.toLowerCase()) || course.equivalent.join(" ").toLowerCase().includes(searchText.toLowerCase()))
  });


    //filtrering kan senere gjøres noe sånn. men med state som har value og asc/dec for hva som skal filtreres
  filteredCourses.sort((a,b) => {
    if(a.country < b.country){
      return -1;
    }
  })

  const handleSearch = event => {
    setSearchText(event.target.value);
  };

  const handleCourseTypeChange = event => {
    setCourseType(event.target.value);
  }

  const handleSemesterChoiceChange =event => {
    setSemesterValue(event.target.value);
  }

  
  return (
    <div id='overviewContent'>
    {/*<h2 onClick={addCourse}>test</h2>*/}
    <h1 className='centerHeader'>Oversikt over emner</h1>
    <br/>
        <FilterBar searchValue={searchText} courseTypeValue={courseType} courseSemesterValue={semesterValue} onSearch={handleSearch} onTypeChange={handleCourseTypeChange} onSemesterChange={handleSemesterChoiceChange}/>
        {courses.isLoading ? (<p>Laster inn fag..</p>) : 
        (<CoursesList courses={filteredCourses}/>)
        }
    
  </div>
  ); 
};
export default Overview;
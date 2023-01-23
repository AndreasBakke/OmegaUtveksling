import React, ***REMOVED*** useReducer, useState , useEffect}  from "react";
import ***REMOVED*** useParams } from "react-router-dom";
import CourseInfo from "../components/courseInfo";
import Reviews from "../components/Reviews";

const courseReducer = (state, action) => ***REMOVED***
    switch(action.type) ***REMOVED***
      case 'FETCH_COURSE_START':
        return ***REMOVED***
          ...state,
          isLoadingCourse: true
      ***REMOVED***;
      case 'FETCH_COURSE_SUCCESS':
        return ***REMOVED***
          ...state,
          isLoadingCourse: false,
          data: action.payload
      ***REMOVED***;
      default: 
        throw new Error();
  ***REMOVED***
***REMOVED***;

const reviewsReducer = (state, action) => ***REMOVED***
  console.log(action)
  switch(action.type) ***REMOVED***
    case 'FETCH_REVIEWS_START':
      return ***REMOVED***
        ...state,
        isLoadingReviews: true
    ***REMOVED***;
    case 'FETCH_REVIEWS_SUCCESS':
      return ***REMOVED***
        ...state,
        isLoadingReviews: false,
        data: action.payload
    ***REMOVED***;
    default: 
      throw new Error();
***REMOVED***
};


function titleCase(str) ***REMOVED***
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) ***REMOVED***
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
***REMOVED***
  // Directly return the joined string
  return splitStr.join(' '); 
}


const CoursePage = () => ***REMOVED***
  const params = useParams()
  const id = params.courseid;

  const [course, dispatchCourse] = useReducer(
      courseReducer,
      ***REMOVED***data: [], isLoadingCourse: false} 
  );

  const [reviews, dispatchReviews] = useReducer(
    reviewsReducer,
    ***REMOVED***data: [], isLoadingReviews: false}
  );

  const [isLoadingCourse, setIsLoadingCourse] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);


  useEffect(() => ***REMOVED***
    dispatchCourse(***REMOVED***type: 'FETCH_COURSE_START'});
    fetch(`/getCourseById?id=$***REMOVED***id}`)
      .then(response => response.json())
      .then(
        result => ***REMOVED***
          dispatchCourse(***REMOVED***
            type: 'FETCH_COURSE_SUCCESS',
            payload: result.course
        ***REMOVED***)
      ***REMOVED***
      )
      .catch((e) => console.log("error fetching courses " +e))

      
***REMOVED***, [])

  useEffect(() => ***REMOVED***
    dispatchReviews(***REMOVED***type: 'FETCH_REVIEWS_START'});
    fetch(`/getReviewsByCourseKey?key=$***REMOVED***id}`)
      .then(response => response.json())
      .then(
        result => ***REMOVED*** //Mulig dette ikke funker
          console.log(result)
          var array = [];
          var data = result.data;
          for(var key in data) ***REMOVED***
            var review = data[key];
            review.id=key;
            array.push(review);
        ***REMOVED***
          dispatchReviews(***REMOVED***
            payload: array,
            type: 'FETCH_REVIEWS_SUCCESS',
        ***REMOVED***)
      ***REMOVED***
      )
      .catch((e) => console.log("error fetching reviews " +e))
***REMOVED***, [])




  return (
    <div>
        ***REMOVED***course.isLoadingCourse ? (<p>Laster inn fag...</p>):
        (<CourseInfo course=***REMOVED***course.data}/>)}
        <Reviews reviews=***REMOVED***reviews.data}/> ***REMOVED***/* OBS do the same as CourseInfo with loader and states */}
    </div>
  );
};
  
export default CoursePage;
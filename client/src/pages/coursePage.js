import React, { useReducer, useState , useEffect}  from "react";
import { useParams } from "react-router-dom";
import CourseInfo from "../components/courseInfo";
import Reviews from "../components/Reviews";
import NewReview from "../components/NewReview";
const courseReducer = (state, action) => {
    switch(action.type) {
      case 'FETCH_COURSE_START':
        return {
          ...state,
          isLoadingCourse: true
        };
      case 'FETCH_COURSE_SUCCESS':
        return {
          ...state,
          isLoadingCourse: false,
          data: action.payload
        };
      default: 
        throw new Error();
    }
  };

const reviewsReducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_REVIEWS_START':
      return {
        ...state,
        isLoadingReviews: true
      };
    case 'FETCH_REVIEWS_SUCCESS':
      return {
        ...state,
        isLoadingReviews: false,
        data: action.payload
      };
    default: 
      throw new Error();
  }
};


function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  // Directly return the joined string
  return splitStr.join(' '); 
}


const CoursePage = () => {
  const params = useParams()
  const id = params.courseid;

  const [course, dispatchCourse] = useReducer(
      courseReducer,
      {data: [], isLoadingCourse: false} 
  );

  const [reviews, dispatchReviews] = useReducer(
    reviewsReducer,
    {data: [], isLoadingReviews: false}
  );

  const [isLoadingCourse, setIsLoadingCourse] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);


  useEffect(() => {
    dispatchCourse({type: 'FETCH_COURSE_START'});
    fetch(`/getCourseById?id=${id}`)
      .then(response => response.json())
      .then(
        result => {
          dispatchCourse({
            type: 'FETCH_COURSE_SUCCESS',
            payload: result.course
          })
        }
      )
      .catch((e) => console.log("error fetching courses " +e))

      
  }, [])

  useEffect(() => {
    dispatchReviews({type: 'FETCH_REVIEWS_START'});
    fetch(`/getReviewsByCourseKey?key=${id}`)
      .then(response => response.json())
      .then(
        result => { //Mulig dette ikke funker
          var array = [];
          var data = result.data;
          for(var key in data) {
            var review = data[key];
            review.id=key;
            array.push(review);
          }
          dispatchReviews({
            payload: array,
            type: 'FETCH_REVIEWS_SUCCESS',
          })
        }
      )
      .catch((e) => console.log("error fetching reviews " +e))
  }, [])

 //TODO: Hvis reviews.equivalent (alle) != course.equivalents : updateEquivalents!

  const [popupOpen, setPopupOpen] = useState(0);

  const handleButtonClick = event => {
    setPopupOpen(0)
  }

  const handleNewReviewClick = event => {
    setPopupOpen(1)
  }
//Todo: Legg til review. effect: ved ny review, oppdater course (Legg til i semester, equivalent og sånt). 
//      Rediger course (Bare la alle redigere?)

  return (
    <div>
        {course.isLoadingCourse ? (<p>Laster inn fag...</p>):
        (<CourseInfo course={course.data}/>)}
        <Reviews reviews={reviews.data} handleNewReview={handleNewReviewClick}/> {/* OBS do the same as CourseInfo with loader and states */}
        <NewReview showPopup={popupOpen} handleCloseButton={handleButtonClick} courseKey={id}/>
    </div>
  );
};
  
export default CoursePage;
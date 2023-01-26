import React from 'react';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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


const CoursesList = ({courses, handleRemoveCourse}) => {
    return (
    <table>
      <thead>
        <tr>
            <th width="10%">
              Land
            </th>
            <th width="10%">
              By
            </th>
            <th width="20%">
              Lærested
            </th>
            <th width="30%">
              Fag
            </th>
            <th width="20%">
              Godkjent som
            </th>
            <th>
              
            </th>
        </tr>
      </thead>
      <tbody>
      {courses.map(course => {
        return (
          <tr key={course.id}>
            <td>{capitalizeFirstLetter(course.country)}</td>
            <td>{capitalizeFirstLetter(course.city)}</td>
            <td>{titleCase(course.university)}</td>
            <td>{titleCase(course.name)}</td>
            <td>{course.equivalent.join(", ").toUpperCase()}</td>
            <td><a href={"course/"+course.id}>Les mer</a></td>
          </tr>
        );
      })}
      </tbody>
      </table>
    );
  }
  export default CoursesList;
  
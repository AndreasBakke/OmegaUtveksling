import React from 'react';

function capitalizeFirstLetter(string) ***REMOVED***
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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


const CoursesList = (***REMOVED***courses, handleRemoveCourse}) => ***REMOVED***
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
      ***REMOVED***courses.map(course => ***REMOVED***
        return (
          
          <tr key=***REMOVED***course.id}>
            <td>***REMOVED***capitalizeFirstLetter(course.country)}</td>
            <td>***REMOVED***capitalizeFirstLetter(course.city)}</td>
            <td>***REMOVED***titleCase(course.university)}</td>
            <td>***REMOVED***titleCase(course.name)}</td>
            <td>***REMOVED***course.equivalent.join(", ").toUpperCase()}</td>
            <td><a href=***REMOVED***course.url}>Les mer</a></td>
            <br/><br/>
          </tr>
        );
    ***REMOVED***)}
      </tbody>
      </table>
    );
***REMOVED***
  export default CoursesList;
  
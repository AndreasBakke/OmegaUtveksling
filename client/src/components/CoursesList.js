import React from 'react';
const CoursesList = (***REMOVED***courses, handleRemoveCourse}) => ***REMOVED***
    return (
    <table>
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
      ***REMOVED***courses.map(course => ***REMOVED***
        return (
          
          <tr key=***REMOVED***course.id}>
            <td>***REMOVED***course.country}</td>
            <td>***REMOVED***course.city}</td>
            <td>***REMOVED***course.university}</td>
            <td>***REMOVED***course.name}</td>
            <td>***REMOVED***course.equivalent.join(", ")}</td>
            <td><a href=***REMOVED***course.url}>Les mer</a></td>
            <br/><br/>
          </tr>
        );
    ***REMOVED***)}
      </table>
    );
***REMOVED***
  export default CoursesList;
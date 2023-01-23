import React from "react";

function capitalizeFirstLetter(string) ***REMOVED***
    return string == undefined ? "" :  string.charAt(0).toUpperCase() + string.slice(1);
***REMOVED***

function titleCase(str) ***REMOVED***
    if(str != undefined) ***REMOVED***
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) ***REMOVED***
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  ***REMOVED***
    // Directly return the joined string
    return splitStr.join(' '); 
  ***REMOVED***
}

const CourseInfo = (***REMOVED***course}) => ***REMOVED***
  if(course.length==0)***REMOVED***
    return ""
***REMOVED***
  return (
    <div id="courseInfo">
      <h1 className="centerHeader">
        ***REMOVED***titleCase(course.name)}
      </h1>
      <div style=***REMOVED******REMOVED***width: "80%", maxWidth: "900px" , margin: "0 auto"}}>
        <div style=***REMOVED******REMOVED***width: "50%", minWidth: "300px", display: "inline-block", verticalAlign: "top"}}>
            <h2 style=***REMOVED******REMOVED***marginBottom: "5px"}}>
                Sted
            </h2>
            <p style=***REMOVED******REMOVED***marginTop: "5px", lineHeight: "150%"}}>
                <strong>Land: </strong>***REMOVED***capitalizeFirstLetter(course.country)}<br></br>
                <strong>By: </strong>***REMOVED***capitalizeFirstLetter(course.city)}<br></br>
                <strong>Studiested: </strong>***REMOVED***titleCase(course.university)}<br></br>
            </p>
        </div>
        
       <div style=***REMOVED******REMOVED***width: "50%", minWidth: "300px", display: "inline-block"}}>
            <h2 style=***REMOVED******REMOVED***marginBottom: "5px"}}>
                Om
            </h2>
            <p style=***REMOVED******REMOVED***marginTop: "5px", lineHeight: "150%"}}>
                <strong>Fagkode: </strong>***REMOVED***course.code}<br></br>
                <strong>Studiepoeng: </strong>***REMOVED***course.points}<br></br>
                <strong>Semester: </strong> ***REMOVED***course.semester.join(", ")}<br></br>
                <strong>Vurderingsform(er): </strong> ***REMOVED***course.modality.join(", ")}<br></br>
                <strong>Undervisningsspråk: </strong> ***REMOVED***course.language}<br></br>
                <strong>Emneside: </strong>***REMOVED***course.url ? (<a href=***REMOVED***("//"+course.url)} target="_blank">***REMOVED***course.url}</a>) : "Ikke tilgjengelig"}

            </p>
       </div>
      </div>
      
    </div>
  );
};
  
export default CourseInfo;
import React from "react";

function capitalizeFirstLetter(string) {
    return string == undefined ? "" :  string.charAt(0).toUpperCase() + string.slice(1);
  }

function titleCase(str) {
    if(str != undefined) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
    }
}

const CourseInfo = ({course}) => {
  if(course.length==0){
    return ""
  }
  return (
    <div id="courseInfo">
      <h1 className="centerHeader">
        {titleCase(course.name)}
      </h1>
      <div style={{width: "80%", maxWidth: "900px" , margin: "0 auto"}}>
        <div style={{width: "50%", minWidth: "300px", display: "inline-block", verticalAlign: "top"}}>
            <h2 style={{marginBottom: "5px"}}>
                Sted
            </h2>
            <p style={{marginTop: "5px", lineHeight: "150%"}}>
                <strong>Land: </strong>{capitalizeFirstLetter(course.country)}<br></br>
                <strong>By: </strong>{capitalizeFirstLetter(course.city)}<br></br>
                <strong>Studiested: </strong>{titleCase(course.university)}<br></br>
            </p>
        </div>
        
       <div style={{width: "50%", minWidth: "300px", display: "inline-block"}}>
            <h2 style={{marginBottom: "5px"}}>
                Om
            </h2>
            <p style={{marginTop: "5px", lineHeight: "150%"}}>
                <strong>Fagkode: </strong>{course.code}<br></br>
                <strong>Studiepoeng: </strong>{course.points}<br></br>
                <strong>Semester: </strong> {course.semester.join(", ")}<br></br>
                <strong>Vurderingsform(er): </strong> {course.modality.join(", ")}<br></br>
                <strong>Undervisningsspråk: </strong> {course.language}<br></br>
                <strong>Emneside: </strong>{course.url ? (<a href={("//"+course.url)} target="_blank">{course.url}</a>) : "Ikke tilgjengelig"}

            </p>
       </div>
      </div>
      
    </div>
  );
};
  
export default CourseInfo;
import React from "react";


const NewCourses = () => ***REMOVED***
  return (
    <div className="newCoursesContent">
      <h1 className="centerHeader">
        Legg til nye emner
      </h1>
      
        <hr/>
        <h2 className="centerHeader">Sted</h2>
        <div id="mainCategories">
        <div>
          <label htmlFor="country">Land: </label>
          <input type='text' id="country"></input>
        </div>
        <div>
          <label htmlFor="city">By: </label>
          <input type='text' id='city'></input>
        </div>
        <div>
          <label htmlFor="uni">Studiested: </label>
          <input type='text' id="uni"></input>
        </div>
      </div>

      <hr/>
      <div id="courses" className="">
        <h2 className="centerHeader">Emner</h2>
        <div className="courseDiv">
          <div className="courseIndexDiv">1</div>
          <div className="courseInfoDiv">
              <div className="courseField">
                <label>Fagnavn:</label>
                <input type="text"></input>
              </div>
              
              <div className="courseField">
                <label>Fagkode:</label>
                <input type="text"></input>
              </div>
              
              <div className="courseField">
                <label>Semester:</label>
                <label> Høst </label><input name="høst" value="1" type="checkbox"></input>
                <label>Vår</label><input name="vår" value="1" type="checkbox"></input>
              </div>

              <div className="courseField">
                <label>Vurderingsform: </label>
                <label>Skriftlig </label><input name="skriftlig" value="1" type="checkbox"></input>
                <label>Muntlig </label><input name="muntlig" value="1" type="checkbox"></input>
                <label>Prosjekt </label><input name="prosjekt" value="1" type="checkbox"></input>
                <label>Hjemmeoppgave</label><input name="essay" value="1" type="checkbox"></input>
              </div>
             
          </div>
          <div className="courseCloseDiv">
            <span>X</span>
          </div>
        </div>
      </div>
      
    
    </div>
  );
};
  
export default NewCourses;
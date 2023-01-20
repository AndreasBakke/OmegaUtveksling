import React from "react";
const d = new Date();
const currMonth = d.getMonth();
const currYear = d.getFullYear().toString();
const currSem = currMonth<4 ? "v" : "h";

const semesters = ["h30","v30","h29","v29","h28","v28","h27","v27","h26","v26","h25","v25","h24","v24","h23","v23","h22","v22","h21","v21","h20","v20","h19","v19","h18","v18"]

const filteredSemesters = semesters.filter(semester => ***REMOVED***
	return currSem == "v" ?  parseInt(semester.slice(-2)) <currYear.slice(-2) :  parseInt(semester.slice(-2))<currYear.slice(-2) || ( parseInt(semester.slice(-2))==currYear.slice(-2) && semester.slice(0,1) =="v");
})


const NewCourses = () => ***REMOVED***
  return (
    <div className="newCoursesContent">
      <h1 className="centerHeader">
        Legg til og vurder emne
      </h1>
      <p style=***REMOVED******REMOVED***width: "80%", margin:"0 auto", textAlign: "center"}}>
        Hvis emnet allerede er lagt til i oversikten trenger du ikke legge det til igjen. Ønsker du å gi en vurdering av emnet eller legge til informasjon kan du gjøre det ved å trykke "les mer" i oversikten.
      </p>
      
        <hr/>
        <h2 className="centerHeader">Sted</h2>
        <div className="mainCategories">
        <div className="mainCategoriesDiv">
          <label className="mainCategoriesLabel" htmlFor="country">Land: </label>*<br></br>
          <input className="mainCategoriesInput" list="countries" type='text' id="country" required></input>
        </div>
        <div className="mainCategoriesDiv">
          <label className="mainCategoriesLabel" htmlFor="city">By: </label>*<br></br>
          <input className="mainCategoriesInput" type='text' id='city' required></input>
        </div>
        <div className="mainCategoriesDiv">
          <label className="mainCategoriesLabel" htmlFor="uni">Studiested: </label>*<br></br>
          <input className="mainCategoriesInput" type='text' id='uni' required></input>
          
        </div>
      </div>

      <hr/>
      <div id="courses" className="">
        <h2 className="centerHeader">Informasjon:</h2>
        <div className="courseDiv" id="courseToAdd1">
          <div className="courseInfoDiv">
            <div className="courseField">
              <label className="courseLabel">Fagnavn: </label>*<br></br>
              <input className="courseTextInput" type="text" required></input>
            </div>
            
            <div className="courseField">
              <label className="courseLabel">Fagkode: </label>*<br></br>
              <input className="courseTextInput" type="text" required></input>
            </div>
            
            <div className="courseField">
              <label className="courseLabel">Semester: </label>*
                <div className="semesterOptions">
                  <div><label> Høst </label><input name="høst" value="1" type="checkbox"></input></div>
                  <div><label>Vår</label><input name="vår" value="1" type="checkbox"></input></div>
                </div>
              </div>

            <div className="courseField">
              <label className="courseLabel">Vurderingsform(er): </label>*
              <div className="vurderingsOptions">
                <div><label>Skriftlig </label><input name="vurderingsformCheck" value="s" type="checkbox"></input></div>
                <div><label>Muntlig </label><input name="vurderingsformCheck" value="m" type="checkbox"></input></div>
                <div><label>Prosjekt </label><input name="vurderingsformCheck" value="p" type="checkbox"></input></div>
                <div><label>Hjemmeeksamen</label><input name="vurderingsformCheck" value="h" type="checkbox"></input></div>
              </div>
            </div>
            
            <div className="courseField">
              <label className="courseLabel">Undervisningsspråk: </label>*<br></br>
              <input type="text" className="courseTextInput"></input>

            </div>
            <div className="courseField">
              <label className="courseLabel">Emnets nettside:</label><br></br>
              <input type="url" className="courseTextInput" placeholder="www.mit.edu/KybIntro/About"></input>
            </div>


            <div className="courseField">
              <label className="courseLabel">Hva slags type fag erstatter emnet? </label><br></br>
              <div className="fagtypeOptions">
                <div><label>Obligatorisk</label><input type="radio" name="fagtype"></input></div>
                <div><label>Valgfag</label><input type="radio" name="fagtype"></input></div>
                <div><label>K-emne</label><input type="radio" name="fagtype"></input></div>
                <div><label>Ingeniørfag annet studieprogram</label><input type="radio" name="fagtype"></input></div>
                <div><label>Annet/Ikke viktig</label><input type="radio" name="fagtype"></input></div>

              </div>
            </div>

            <div className="courseField">
              <label className="courseLabel" >Hvilket emne ved NTNU erstattes? (emnekode)</label><br></br>
              <input type="text" className="courseTextInput" placeholder="TTTK4145, KULT1101, TFE4141"></input>
            </div>
            
          </div>
        </div>
      </div>
      <div>
        <hr/>
        <h2 className="centerHeader">Vurdering</h2>
        <div className="vurderingDiv">
          <div className="courseField">
            <label className="courseLabel">Når hadde du emnet?</label><br></br>
            <select className="semChoice">
              ***REMOVED***filteredSemesters.map(sem => ***REMOVED***
                return(<option>***REMOVED***sem}</option>)
            ***REMOVED***)}

            </select>
          </div>
          <div className="courseField">
              <label className="courseLabel">Hvor vanskelig var emnet?: </label>
                <div className="sliderDiv"><label>Lett</label><input type="range" defaultValue="-1" step="1" min="1" max="5"></input><label>Vanskelig</label></div>
            </div>

            <div className="courseField">
              <label className="courseLabel">Hvor relevant var emnet? </label>
              <div className="sliderDiv"><label>Ikke relevant</label><input type="range" defaultValue="-1" step="1" min="1" max="5"></input><label>Veldig relevant</label></div>
            </div>

            <div className="courseField">
              <label className="courseLabel">Hvor godt likte du emnet?: </label>
              <div className="sliderDiv"><label>Hatet det</label><input type="range" defaultValue="-1" step="1" min="1" max="5"></input><label>Elsket det</label></div>
            </div>
            <div className="courseField">
              <label className="courseLabel">Kommentarer om emnet:</label><br></br>
              <input type="text" className="courseTextInput"></input>
            </div>
        </div>
      </div>
    </div>
  );
};
  
export default NewCourses;
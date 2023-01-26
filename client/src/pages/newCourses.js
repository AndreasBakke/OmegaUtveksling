import React, {useState, useEffect, useReducer} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


//Obs - closer to normal JS, should use sideeffects and states instead of all this. I dont know react!
const d = new Date();
const currMonth = d.getMonth();
const currYear = d.getFullYear().toString();
const currSem = currMonth<4 ? "v" : "h";

//Localstorage om vi har lagt til land, by og studiested tidligere


const semesters = ["h30","v30","h29","v29","h28","v28","h27","v27","h26","v26","h25","v25","h24","v24","h23","v23","h22","v22","h21","v21","h20","v20","h19","v19","h18","v18"]

const filteredSemesters = semesters.filter(semester => {
	return currSem == "v" ?  parseInt(semester.slice(-2)) <currYear.slice(-2) :  parseInt(semester.slice(-2))<currYear.slice(-2) || ( parseInt(semester.slice(-2))==currYear.slice(-2) && semester.slice(0,1) =="v");
})

document.getElementsByClassName("error")


async function getFormData(course, review){
  var valid = 1;
  const country = document.querySelector("input[id='country']").value;
  if (country.trim() =="") {
    course.country=null;
    valid = 0;
    document.querySelector("input[id='country']").classList.add("error");
    ;
  } else {
    course.country=country.toLowerCase()
  }
  
  const city = document.querySelector("input[id='city']").value;
  if (city.trim() =="") {
    course.city=null;
    valid = 0;
    document.querySelector("input[id='city']").classList.add("error");
    ;
  } else {
    course.city=city.toLowerCase()
  }
  
  const university = document.querySelector("input[id='university']").value;
  if (university.trim() =="") {
    course.university=null;
    valid = 0;
    document.querySelector("input[id='university']").classList.add("error");
    ;
  } else {
    course.university=university.toLowerCase()
  }

  const name = document.querySelector("input[id='name']").value;
  if (name.trim() =="") {
    course.name=null;
    valid = 0;
    document.querySelector("input[id='name']").classList.add("error");
    ;
  } else {
    course.name=name.toLowerCase()
  }
  
  const code = document.querySelector("input[id='code']").value;
  if (code.trim() =="") {
    course.code=null;
    valid = 0;
    document.querySelector("input[id='code']").classList.add("error");
    ;
  } else {
    course.code=code
  }

  const points = document.querySelector("input[id='points']").value;
  if (points.trim() =="") {
    course.points=null;
    valid = 0;
    document.querySelector("input[id='points']").classList.add("error");
    ;
  } else {
    course.points=points
  }

  const semH = document.querySelector("input[id='semH']").checked;
  const semV = document.querySelector("input[id='semV']").checked;
  var sems = [];
  if (semH) {
    sems.push("høst");
  }
  if (semV) {
    sems.push("vår")
  }
  course.semester= sems;
  
  var mods = [];
  const s = document.querySelector("input[id='vurderingS']").checked;
  const m = document.querySelector("input[id='vurderingM']").checked;
  const p = document.querySelector("input[id='vurderingP']").checked;
  const h = document.querySelector("input[id='vurderingH']").checked;
  if(s){
    mods.push("skriftlig");
  }
  if(m){
    mods.push("muntlig")
  }
  if(p) {
    mods.push("prosjekt")
  }
  if(h) {
    mods.push("hjemmeeksamen")
  }
  course.modality = mods;

  const language = document.querySelector("input[id='language']").value;
  if (language.trim() =="") {
    course.language=null;
    valid = 0;
    document.querySelector("input[id='language']").classList.add("error");
    ;
  } else {
    course.language=language.toLowerCase()
  }
  
  const url = document.querySelector("input[id='url']").value;
  if (url.trim() =="") {
    course.url=[];
  } else {
    course.url=[url];
  }
  

  const reviewSemester = document.querySelector('select[name="reviewSemester"]').value;
    review.semester = reviewSemester;
  try{
    const type = document.querySelector('input[name="type"]:checked').value;
    review.type = [type]
    course.type = [type]
  }
  catch(e){
    if(e instanceof TypeError) {
      review.type = []
      course.type = [""]
      valid = 0;
    }
  }

  const equivalent = document.querySelector("input[id='equivalent']").value;
  if (equivalent.trim() =="") {
    review.equivalent=[];
    course.equivalent=[""];
  } else {
    review.equivalent=equivalent.trim().replace(", ", ",").split(",");
    course.equivalent=equivalent.trim().replace(", ", ",").split(",");
  }

  try{
    review.difficulty = document.querySelector('input[name="rate_difficulty"]:checked').value;
  }
  catch(e){
    if(e instanceof TypeError) {
      valid = 0;
      review.difficulty = null;
    }
  }

  try{
    review.relevance = document.querySelector('input[name="rate_relevance"]:checked').value;
  }
  catch(e){
    if(e instanceof TypeError) {
      review.relevance = null;
      valid = 0;
    }
  }

  try{
    review.enjoyment = document.querySelector('input[name="rate_enjoyment"]:checked').value;
  }
  catch(e){
    if(e instanceof TypeError) {
      review.enjoyment = null;
      valid = 0;
    }
  }

  const comment = document.querySelector("input[id='comment']").value;
  if (comment.trim() =="") {
    review.comment=null;
  } else {
    review.comment=comment;
  }
  return valid;
}


async function verifyReview(review){
  if(review.semester=='noChoice' && review.type.length==0 && review.equivalent.length==0 && review.difficulty==null && review.relevance == null && review.enjoymen == null && review.comment ==null) {
    return false
  }
  return true;
}

async function addCourse(obj){
  //Only use if course does not exist
  //Fetch ...
  const fetchResponse = await fetch('http://localhost:3001/addCourse',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj)
  })
  const data = await fetchResponse.json()
  console.log(data);
  return data; //Return id and success/not
}

async function addReview(key, review){
  const fetchResponse = await fetch('/addReview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"key": key, "review": review})
  })
  const data = await fetchResponse.json()
  console.log(data);
  return data; //Return success/not
}

var courseAddedInSession = 0;
const handleButtonClick = () => {
  var course = {};
  var review = {};
  getFormData(course, review)
  .then(valid => {
    if(valid && courseAddedInSession == 0){
      addCourse(course) //AddCourse need to look for dupes
      .then(response => {
        console.log(response)
        if(response.success){
          console.log("Sucess!!!")
          courseAddedInSession=1;
          review.timestamp = d.getTime();
          addReview(response.key, review);
        } 
      })
    } else {
      document.getElementById("feilInfo").style.visibility="visible";
    }
  })
  console.log(course)
  console.log(review)
}


const NewCourses = () => {
  const [countryText, setCountryText] = useState(
    localStorage.getItem('countryText') || '');
  
  const [cityText, setCityText] = useState(
    localStorage.getItem('cityText') || '');
    
  const [universityText, setUniversityText] = useState(
    localStorage.getItem('universityText') || '');

  const [semesterChoice, setSemesterChoice] = useState(
    localStorage.getItem('semesterChoice') || 'noChoice');
      
  useEffect(() => {
    localStorage.setItem('countryText', countryText)
  }, [countryText])

  useEffect(() => {
    localStorage.setItem('cityText', cityText)
  }, [cityText])
  
  useEffect(() => {
    localStorage.setItem('universityText', universityText)
  }, [universityText])

  useEffect(() => {
    localStorage.setItem('semesterChoice', semesterChoice)
  }, [semesterChoice])
  
  const handleCountryText = event => {
    setCountryText(event.target.value)
  }

  const handleCityText = event => {
    setCityText(event.target.value)
  }

  const handleUniversityText = event => {
    setUniversityText(event.target.value)
  }

  const handleSemesterChoice = event => {
    setSemesterChoice(event.target.value)
  }
  
  return (
    <div className="newCoursesContent">
      <h1 className="centerHeader">
        Legg til og vurder emne
      </h1>
      <p style={{width: "80%", margin:"0 auto", textAlign: "center"}}>
        Hvis emnet allerede er lagt til i oversikten trenger du ikke legge det til igjen her. Ønsker du å gi en vurdering eller legge til informasjon til et eksisterende emne kan du gjøre det ved å trykke "les mer" i oversikten.
      </p>
      
        <hr/>
        <h2 className="centerHeader">Sted</h2>
        <div className="mainCategories">
        <div className="mainCategoriesDiv">
          <label className="mainCategoriesLabel" htmlFor="country">Land: </label>*<br></br>
          <input className="mainCategoriesInput" value={countryText} onChange={handleCountryText} type='text' id="country" required placeholder="Italia, Frankrike, Tyskland, ..."></input>
        </div>
        <div className="mainCategoriesDiv">
          <label className="mainCategoriesLabel" htmlFor="city">By: </label>*<br></br>
          <input className="mainCategoriesInput" type='text' value={cityText} onChange={handleCityText} id='city' required placeholder="Wien, Berlin, Roma, ..."></input>
        </div>
        <div className="mainCategoriesDiv">
          <label className="mainCategoriesLabel" htmlFor="university">Studiested: </label>*<br></br>
          <input className="mainCategoriesInput" type='text' value={universityText} onChange={handleUniversityText} id='university' required placeholder="MIT, KTH, OsloMet, ..."></input>
          
        </div>
      </div>

      <hr/>
      <div id="courses" className="">
        <h2 className="centerHeader">Informasjon:</h2>
        <div className="courseDiv" id="courseToAdd1">
          <div className="courseInfoDiv">
            <div className="courseField">
              <label className="courseLabel" htmlFor="name">Fagnavn: </label>*<br></br>
              <input className="courseTextInput" type="text" id="name" required placeholder="Introduction to cybernetics, Electronics ..."></input>
            </div>
            
            <div className="courseField">
              <label className="courseLabel" htmlFor="code">Fagkode: </label>*<br></br>
              <input className="courseTextInput" type="text" id="code" required placeholder="DIG101, ..."></input>
            </div>

            <div className="courseField">
              <label className="courseLabel" htmlFor="points">Studiepoeng: </label>*<br></br>
              <input className="courseTextInput" type="number" id="points" required placeholder="5, 6, 7.5, 10, ..."></input>
            </div>
            
            <div className="courseField">
              <label className="courseLabel">Semester: </label>*
                <div className="semesterOptions">
                  <div><label> Høst </label><input name="sem" value="h" id="semH" type="checkbox"></input></div>
                  <div><label>Vår</label><input name="sem" value="v" id="semV" type="checkbox"></input></div>
                </div>
              </div>

            <div className="courseField">
              <label className="courseLabel">Vurderingsform(er): </label>*
              <div className="vurderingsOptions">
                <div><label>Skriftlig </label><input name="vurderingsformCheck" id="vurderingS" value="s" type="checkbox"></input></div>
                <div><label>Muntlig </label><input name="vurderingsformCheck" id="vurderingM" value="m" type="checkbox"></input></div>
                <div><label>Prosjekt </label><input name="vurderingsformCheck" id="vurderingP" value="p" type="checkbox"></input></div>
                <div><label>Hjemmeeksamen</label><input name="vurderingsformCheck" id="vurderingH" value="h" type="checkbox"></input></div>
              </div>
            </div>
            
            <div className="courseField">
              <label className="courseLabel" htmlFor="language">Undervisningsspråk: </label>*<br></br>
              <input type="text" className="courseTextInput" id="language" required placeholder="Engelsk, Spansk, ..."></input>

            </div>
            <div className="courseField">
              <label className="courseLabel" htmlFor="url">Emnets nettside:</label><br></br>
              <input type="url" className="courseTextInput" id="url" placeholder="www.mit.edu/KybIntro/About"></input>
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr/>
        <h2 className="centerHeader">Vurdering</h2>
        <div className="vurderingDiv">
          <div className="courseField">
            <label className="courseLabel">Når hadde du emnet? </label>*<br></br>
            <select className="semChoice" onChange={handleSemesterChoice} defaultValue={semesterChoice} name="reviewSemester" id="semChoice">
              <option disabled  value="noChoice">Velg semester</option>
              {filteredSemesters.map(sem => {
                return(<option key={sem} value={sem}>{sem}</option>)
              })}
            </select>
          </div>

          <div className="courseField">
              <label className="courseLabel">Hva slags type fag ble emnet godkjent som? </label>*<br></br>
              <div className="fagtypeOptions" >
                <div><label htmlFor="typeO">Obligatorisk</label><input type="radio" name="type" id="typeO" value="obligatorisk"></input></div>
                <div><label htmlFor="typeV">Valgfag</label><input type="radio" name="type" id="typeV" value="valgfag"></input></div>
                <div><label htmlFor="typeK">K-emne</label><input type="radio" name="type" id="typeK" value="kemne"></input></div>
                <div><label htmlFor="typeIAS">Ingeniørfag annet studieprogram</label><input type="radio" name="type" id="typeIAS" value="ias"></input></div>
                <div><label htmlFor="typeA">Annet/Ikke viktig</label><input  type="radio" name="type" id="annet" value="a"></input></div>
              </div>
            </div>

            <div className="courseField">
              <label className="courseLabel" htmlFor="equivalent">Hvilket emne ved NTNU ble erstattet? (emnekode)</label><br></br>
              <input type="text" className="courseTextInput" id="equivalent" placeholder="TTTK4145, KULT1101, TFE4141"></input>
              <br></br><div className="inputNote">Spesielt om obligatorisk emne ble erstattet. La stå tomt om det ikke tilsvarer noe spesielt. <br></br>Bruk ", " for å skille flere emner.</div>
            
            </div>

          <div className="courseField">
              <label className="courseLabel">Hvor vanskelig var emnet?: </label>*<br></br>
              <div className="rate">
                <input type="radio" id="star5_difficulty" name="rate_difficulty" value="5" />
                <label htmlFor="star5_difficulty" title="text">5 stars</label>
                <input type="radio" id="star4_difficulty" name="rate_difficulty" value="4" />
                <label htmlFor="star4_difficulty" title="text">4 stars</label>
                <input type="radio" id="star3_difficulty" name="rate_difficulty" value="3" />
                <label htmlFor="star3_difficulty" title="text">3 stars</label>
                <input type="radio" id="star2_difficulty" name="rate_difficulty" value="2" />
                <label htmlFor="star2_difficulty" title="text">2 stars</label>
                <input type="radio" id="star1_difficulty" name="rate_difficulty" value="1" />
                <label htmlFor="star1_difficulty" title="text">1 star</label>
              </div>
            </div>

            <div className="courseField">
              <label className="courseLabel">Hvor relevant var emnet? </label>*<br></br>
              <div className="rate">
                <input type="radio" id="star5_relevance" name="rate_relevance" value="5" />
                <label htmlFor="star5_relevance" title="text">5 stars</label>
                <input type="radio" id="star4_relevance" name="rate_relevance" value="4" />
                <label htmlFor="star4_relevance" title="text">4 stars</label>
                <input type="radio" id="star3_relevance" name="rate_relevance" value="3" />
                <label htmlFor="star3_relevance" title="text">3 stars</label>
                <input type="radio" id="star2_relevance" name="rate_relevance" value="2" />
                <label htmlFor="star2_relevance" title="text">2 stars</label>
                <input type="radio" id="star1_relevance" name="rate_relevance" value="1" />
                <label htmlFor="star1_relevance" title="text">1 star</label>
              </div>
            </div>

            <div className="courseField">
              <label className="courseLabel">Hvor godt likte du emnet? </label>*<br></br>
              <div className="rate">
                <input type="radio" id="star5_enjoyment" name="rate_enjoyment" value="5" />
                <label htmlFor="star5_enjoyment" title="text">5 stars</label>
                <input type="radio" id="star4_enjoyment" name="rate_enjoyment" value="4" />
                <label htmlFor="star4_enjoyment" title="text">4 stars</label>
                <input type="radio" id="star3_enjoyment" name="rate_enjoyment" value="3" />
                <label htmlFor="star3_enjoyment" title="text">3 stars</label>
                <input type="radio" id="star2_enjoyment" name="rate_enjoyment" value="2" />
                <label htmlFor="star2_enjoyment" title="text">2 stars</label>
                <input type="radio" id="star1_enjoyment" name="rate_enjoyment" value="1" />
                <label htmlFor="star1_enjoyment" title="text">1 star</label>
              </div>
            </div>
            <div className="courseField">
              <label className="courseLabel" htmlFor="comment">Kommentarer om emnet:</label><br></br>
              <input type="text" className="courseTextInput" id="comment" placeholder="Flink professor? Spesielle forkunnskaper?"></input>
            </div>
            <div id="feilInfo" style={{textAlign: "center", marginBottom: "10px", color: "darkred", visibility: "hidden"}}>
              Noe gikk galt! Sjekk at du har fylt ut alle felt med *, eller prøv igjen senere!
            </div>
            <div className="buttonDiv">
              <button className="addCourseBtn" onClick={handleButtonClick}>Legg til emne</button>
            </div>
        </div>
      </div>
    </div>
  );
};
  
export default NewCourses;